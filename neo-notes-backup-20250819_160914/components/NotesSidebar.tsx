import React, { useState } from 'react';
import { useStore } from '../store';
import { Palette, FolderPlus, List, Network, Hash } from 'lucide-react';
import FolderTree from './FolderTree';

const NotesSidebar: React.FC = () => {
  const [viewMode, setViewMode] = useState<'folders' | 'list' | 'graph'>('folders');
  
  const { 
    selectedNoteId,
    selectedFolderId,
    searchTerm, 
    addNote,
    addFolder,
    updateFolder,
    deleteFolder,
    selectNote,
    selectFolder,
    setSearchTerm,
    getFilteredNotes,
    getNotesInFolder,
    toggleThemeCustomizer,
    getAllTags,
    getNotesWithTag
  } = useStore();

  // Get notes based on view mode and filters
  const getDisplayNotes = () => {
    if (searchTerm) {
      return getFilteredNotes(); // Global search shows all matching notes
    }
    
    if (viewMode === 'folders' && selectedFolderId) {
      return getNotesInFolder(selectedFolderId);
    }
    
    if (viewMode === 'list') {
      return getFilteredNotes(); // Show all notes in list mode
    }
    
    return getFilteredNotes(); // Default to showing all notes
  };

  const displayNotes = getDisplayNotes();

  const formatDate = (date: Date | string) => {
    try {
      // Ensure we have a proper Date object
      const dateObj = date instanceof Date ? date : new Date(date);
      
      // Check if it's a valid date
      if (isNaN(dateObj.getTime())) {
        console.warn('Invalid date provided to formatDate:', date);
        return 'unknown';
      }
      
      const now = new Date();
      const diff = now.getTime() - dateObj.getTime();
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      
      if (days === 0) return 'today';
      if (days === 1) return 'yesterday';
      if (days < 7) return `${days} days ago`;
      return dateObj.toLocaleDateString().toLowerCase();
    } catch (error) {
      console.error('Error in formatDate:', error, 'Date value:', date);
      return 'error';
    }
  };

  const truncateContent = (content: string, maxLength: number = 50) => {
    // Remove HTML tags like <p> and other markup
    const cleanContent = content.replace(/<[^>]*>/g, '').trim();
    if (cleanContent.length <= maxLength) return cleanContent;
    return cleanContent.substring(0, maxLength) + '...';
  };

  const handleCreateNote = () => {
    if (viewMode === 'folders' && selectedFolderId) {
      addNote(selectedFolderId);
    } else {
      addNote(null);
    }
  };

  const handleCreateFolder = () => {
    // Always create at root level when clicking the main + button
    addFolder(null, 'new folder');
  };

  return (
    <div className="neo-sidebar w-80 h-full flex flex-col">
      {/* Header */}
      <div className="p-4" style={{ borderBottom: '2px solid var(--border-main)' }}>
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-xl font-bold" style={{ color: 'var(--text-main)' }}>notes</h1>
          <div className="flex gap-1">
            <button 
              onClick={toggleThemeCustomizer}
              className="neo-button px-2 py-1"
              title="customize theme"
            >
              <Palette size={16} />
            </button>
            {viewMode === 'folders' && (
              <button 
                onClick={handleCreateFolder}
                className="neo-button px-2 py-1"
                title="create folder"
              >
                <FolderPlus size={16} />
              </button>
            )}
            <button 
              onClick={handleCreateNote}
              className="neo-button text-lg px-2 py-1"
              title="create note"
            >
              +
            </button>
          </div>
        </div>

        {/* View Mode Selector */}
        <div className="flex mb-3 bg-[var(--bg-main)] border-2 border-[var(--border-main)] rounded overflow-hidden">
          <button
            onClick={() => setViewMode('folders')}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm transition-colors ${
              viewMode === 'folders'
                ? 'bg-[var(--accent)] text-[var(--bg-main)]'
                : 'hover:bg-[var(--bg-tertiary)]'
            }`}
          >
            <FolderPlus size={14} />
            folders
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm transition-colors ${
              viewMode === 'list'
                ? 'bg-[var(--accent)] text-[var(--bg-main)]'
                : 'hover:bg-[var(--bg-tertiary)]'
            }`}
          >
            <List size={14} />
            list
          </button>
          <button
            onClick={() => setViewMode('graph')}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm transition-colors ${
              viewMode === 'graph'
                ? 'bg-[var(--accent)] text-[var(--bg-main)]'
                : 'hover:bg-[var(--bg-tertiary)]'
            }`}
          >
            <Network size={14} />
            graph
          </button>
        </div>
        
        {/* Search */}
        <input
          type="text"
          placeholder={viewMode === 'folders' ? "search all notes..." : "search notes..."}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="neo-input w-full text-sm"
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Search Results */}
        {searchTerm && (
          <div className="p-2">
            <div className="px-2 py-1 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide mb-2">
              Search Results ({displayNotes.length})
            </div>
            {displayNotes.length === 0 ? (
              <div className="p-4 text-center stats-text">
                no notes found for "{searchTerm}"
              </div>
            ) : (
              displayNotes.map((note) => (
                <div
                  key={note.id}
                  onClick={() => selectNote(note.id)}
                  className={`neo-note-item ${
                    selectedNoteId === note.id ? 'active' : ''
                  }`}
                >
                  <div className="font-semibold text-sm mb-1 truncate">
                    {note.title || 'untitled'}
                  </div>
                  <div className="date-text text-xs mb-2 note-date">
                    {formatDate(note.updatedAt)}
                  </div>
                  <div className="text-xs note-preview" style={{ opacity: 0.7 }}>
                    {truncateContent(note.content)}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Folder View */}
        {!searchTerm && viewMode === 'folders' && (
          <div className="p-2">
            {/* Folder Tree */}
            <FolderTree
              selectedFolderId={selectedFolderId}
              selectedNoteId={selectedNoteId}
              onSelectFolder={selectFolder}
              onSelectNote={selectNote}
              onCreateFolder={addFolder}
              onEditFolder={updateFolder}
              onDeleteFolder={deleteFolder}
            />
            
            {/* Tags Section */}
            {(() => {
              const allTags = getAllTags();
              if (allTags.length === 0) return null;
              
              return (
                <div className="mt-4">
                  <div className="px-2 py-1 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide mb-2">
                    Tags
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {allTags.slice(0, 12).map((tag) => {
                      const noteCount = getNotesWithTag(tag).length;
                      return (
                        <button
                          key={tag}
                          onClick={() => setSearchTerm(`#${tag}`)}
                          className="text-xs px-2 py-1 rounded border hover:bg-[var(--bg-tertiary)] transition-colors flex items-center gap-1"
                          style={{
                            borderColor: 'var(--border-main)',
                            color: 'var(--tag-color)',
                          }}
                          title={`${noteCount} notes with #${tag}`}
                        >
                          <Hash size={10} />
                          {tag}
                          <span className="text-[var(--text-muted)]">{noteCount}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* List View */}
        {!searchTerm && viewMode === 'list' && (
          <div>
            {displayNotes.length === 0 ? (
              <div className="p-4 text-center stats-text">
                no notes yet
              </div>
            ) : (
              displayNotes.map((note) => (
                <div
                  key={note.id}
                  onClick={() => selectNote(note.id)}
                  className={`neo-note-item ${
                    selectedNoteId === note.id ? 'active' : ''
                  }`}
                >
                  <div className="font-semibold text-sm mb-1 truncate">
                    {note.title || 'untitled'}
                  </div>
                  <div className="date-text text-xs mb-2 note-date">
                    {formatDate(note.updatedAt)}
                  </div>
                  <div className="text-xs note-preview" style={{ opacity: 0.7 }}>
                    {truncateContent(note.content)}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Graph View */}
        {!searchTerm && viewMode === 'graph' && (
          <div className="p-4 text-center stats-text">
            <Network size={48} className="mx-auto mb-2 opacity-50" />
            <div>knowledge graph</div>
            <div className="text-xs mt-1">coming soon...</div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-3 stats-text" style={{ borderTop: '2px solid var(--border-main)' }}>
        {viewMode === 'folders' && selectedFolderId && (
          <>
            {displayNotes.length} {displayNotes.length === 1 ? 'note' : 'notes'} in folder
          </>
        )}
        {viewMode === 'list' && (
          <>
            {displayNotes.length} {displayNotes.length === 1 ? 'note' : 'notes'} total
          </>
        )}
        {viewMode === 'graph' && (
          <>graph view mode</>
        )}
      </div>
    </div>
  );
};

export default NotesSidebar;