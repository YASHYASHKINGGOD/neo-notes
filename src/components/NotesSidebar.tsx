import React from 'react';
import { useStore } from '../store';
import { Palette, FolderPlus } from 'lucide-react';
import FolderTree from './FolderTree';

const NotesSidebar: React.FC = () => {
  const { 
    selectedNoteId,
    selectedFolderId,
    addNote,
    addFolder,
    updateFolder,
    deleteFolder,
    selectNote,
    selectFolder,
    toggleThemeCustomizer,
  } = useStore();

  const handleCreateNote = () => {
    if (selectedFolderId) {
      addNote(selectedFolderId);
    } else {
      addNote(null);
    }
  };

  const handleCreateFolder = () => {
    addFolder(null, 'new folder');
  };

  return (
    <div className="w-72 h-full flex flex-col" style={{ 
      background: 'var(--bg-secondary)', 
      borderRight: '1px solid var(--border-main)' 
    }}>
      {/* Minimal Header */}
      <div className="px-4 py-3" style={{ 
        borderBottom: '1px solid var(--border-main)', 
        opacity: 0.3 
      }}>
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold" style={{ color: 'var(--text-main)' }}>
            notes
          </h1>
          <div className="flex gap-1">
            <button 
              onClick={toggleThemeCustomizer}
              className="p-1.5 hover:bg-[var(--bg-tertiary)] rounded transition-colors"
              title="customize theme"
            >
              <Palette size={14} style={{ color: 'var(--text-muted)' }} />
            </button>
            <button 
              onClick={handleCreateFolder}
              className="p-1.5 hover:bg-[var(--bg-tertiary)] rounded transition-colors"
              title="create folder"
            >
              <FolderPlus size={14} style={{ color: 'var(--text-muted)' }} />
            </button>
            <button 
              onClick={handleCreateNote}
              className="p-1.5 hover:bg-[var(--accent)] hover:text-white rounded transition-colors text-sm font-bold"
              title="create note"
              style={{ color: 'var(--accent)' }}
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Clean Folder Tree */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-3">
          <FolderTree
            selectedFolderId={selectedFolderId}
            selectedNoteId={selectedNoteId}
            onSelectFolder={selectFolder}
            onSelectNote={selectNote}
            onCreateFolder={addFolder}
            onEditFolder={updateFolder}
            onDeleteFolder={deleteFolder}
          />
        </div>
      </div>
    </div>
  );
};

export default NotesSidebar;