import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../store';
import RichTextEditor from './RichTextEditor';
import TagManager from './TagManager';

const NoteEditor: React.FC = () => {
  const { 
    getSelectedNote, 
    updateNote, 
    deleteNote,
    getAllTags,
    updateBacklinks,
    getBacklinkedNotes
  } = useStore();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const titleRef = useRef<HTMLInputElement>(null);

  const selectedNote = getSelectedNote();

  // Update local state when selected note changes
  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title);
      setContent(selectedNote.content);
    } else {
      setTitle('');
      setContent('');
    }
  }, [selectedNote]);

  // Auto-save functionality
  useEffect(() => {
    if (!selectedNote) return;

    const timeoutId = setTimeout(() => {
      if (title !== selectedNote.title || content !== selectedNote.content) {
        updateNote(selectedNote.id, { title, content });
        // Update backlinks when content changes
        if (content !== selectedNote.content) {
          updateBacklinks(selectedNote.id, content);
        }
      }
    }, 500); // 500ms debounce

    return () => clearTimeout(timeoutId);
  }, [title, content, selectedNote, updateNote, updateBacklinks]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };


  const handleDelete = () => {
    if (selectedNote && window.confirm('delete this note?')) {
      deleteNote(selectedNote.id);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).toLowerCase();
  };

  // Extract text from HTML for accurate word/character count
  const getTextFromHTML = (html: string) => {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  };

  const textContent = getTextFromHTML(content);
  const wordCount = textContent.split(/\s+/).filter(word => word.length > 0).length;
  const charCount = textContent.length;

  if (!selectedNote) {
    return (
      <div className="flex-1 flex items-center justify-center" style={{ background: 'var(--bg-main)' }}>
        <div className="text-center stats-text">
          <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--text-main)' }}>no note selected</h2>
          <p>select a note from the sidebar or create a new one</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col" style={{ background: 'var(--bg-main)' }}>
      {/* Header */}
      <div className="p-4 flex items-center justify-between" style={{ borderBottom: '2px solid var(--border-main)' }}>
        <div className="flex-1">
          <input
            ref={titleRef}
            type="text"
            value={title}
            onChange={handleTitleChange}
            placeholder="untitled note"
            className="neo-title-input"
          />
          <div className="date-text text-xs mt-1">
            last modified: {formatDate(selectedNote.updatedAt)}
          </div>
          
          {/* Tags */}
          <div className="mt-2">
            <TagManager
              tags={selectedNote.tags}
              onTagsChange={(newTags) => updateNote(selectedNote.id, { tags: newTags })}
              availableTags={getAllTags()}
              className="text-xs"
            />
          </div>
        </div>
        
        <button
          onClick={handleDelete}
          className="neo-button danger ml-4"
          title="delete note"
        >
          delete
        </button>
      </div>

      {/* Editor */}
      <div className="flex-1 flex flex-col">
        <RichTextEditor
          content={content}
          onChange={setContent}
          placeholder="start writing..."
          className="flex-1"
        />
        
        {/* Stats & Backlinks */}
        <div className="border-t-2" style={{ borderColor: 'var(--border-main)' }}>
          <div className="p-3 flex items-center justify-between stats-text">
            <div>
              {wordCount} {wordCount === 1 ? 'word' : 'words'} • {charCount} {charCount === 1 ? 'character' : 'characters'}
            </div>
            <div>
              created: {formatDate(selectedNote.createdAt)}
            </div>
          </div>
          
          {/* Backlinks */}
          {(() => {
            const backlinkedNotes = getBacklinkedNotes(selectedNote.id);
            if (backlinkedNotes.length === 0) return null;
            
            return (
              <div className="p-3 border-t-2" style={{ borderColor: 'var(--border-main)' }}>
                <div className="text-xs font-semibold mb-2 text-[var(--text-muted)] uppercase tracking-wide">
                  Referenced in {backlinkedNotes.length} {backlinkedNotes.length === 1 ? 'note' : 'notes'}
                </div>
                <div className="flex flex-wrap gap-1">
                  {backlinkedNotes.map((note) => (
                    <button
                      key={note.id}
                      onClick={() => window.location.hash = `#note-${note.id}`} // Simple navigation
                      className="text-xs px-2 py-1 rounded border-2 hover:bg-[var(--bg-tertiary)] transition-colors"
                      style={{
                        borderColor: 'var(--border-main)',
                        color: 'var(--link-color)',
                      }}
                      title={`Referenced in: ${note.title}`}
                    >
                      {note.title || 'untitled'}
                    </button>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
};

export default NoteEditor;