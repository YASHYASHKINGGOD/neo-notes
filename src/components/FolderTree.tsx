import React, { useState, Suspense, lazy } from 'react';
import { ChevronRight, ChevronDown, Folder, FolderOpen, Plus, MoreHorizontal, Edit, Trash, Smile } from 'lucide-react';
import { useStore, type Folder as FolderType } from '../store';

// Lazy load emoji picker for better performance
const EmojiPicker = lazy(() => import('./EmojiPicker'));

interface FolderNodeProps {
  folder: FolderType;
  level: number;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onCreateChild: (parentId: string) => void;
  onEdit: (folder: FolderType) => void;
  onEditIcon?: (folder: FolderType) => void;
  onDelete: (id: string) => void;
  onSelectNote: (id: string) => void;
  selectedNoteId: string | null;
}

const FolderNode: React.FC<FolderNodeProps> = ({
  folder,
  level,
  isSelected,
  onSelect,
  onCreateChild,
  onEdit,
  onEditIcon,
  onDelete,
  onSelectNote,
  selectedNoteId,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const { folders, getNotesInFolder } = useStore();
  
  // Get child folders and notes
  const childFolders = folders.filter(f => f.parentId === folder.id);
  const notesInFolder = getNotesInFolder(folder.id);
  const hasChildren = childFolders.length > 0;
  const notesCount = notesInFolder.length;

  const formatDate = (date: Date | string) => {
    try {
      const dateObj = date instanceof Date ? date : new Date(date);
      if (isNaN(dateObj.getTime())) {
        return 'unknown';
      }
      
      const now = new Date();
      const diff = now.getTime() - dateObj.getTime();
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      
      if (days === 0) return 'today';
      if (days === 1) return 'yesterday';
      if (days < 7) return `${days} days ago`;
      return dateObj.toLocaleDateString().toLowerCase();
    } catch {
      return 'error';
    }
  };

  const truncateContent = (content: string, maxLength: number = 50) => {
    // Remove HTML tags like <p> and other markup
    const cleanContent = content.replace(/<[^>]*>/g, '').trim();
    if (cleanContent.length <= maxLength) return cleanContent;
    return cleanContent.substring(0, maxLength) + '...';
  };

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const handleSelect = () => {
    onSelect(folder.id);
  };

  const handleMenuToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  const handleCreateChild = (e: React.MouseEvent) => {
    e.stopPropagation();
    onCreateChild(folder.id);
    setShowMenu(false);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(folder);
    setShowMenu(false);
  };

  const handleEditIcon = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Pass to parent component's handleEditIcon
    if (onEditIcon) onEditIcon(folder);
    setShowMenu(false);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(folder.id);
    setShowMenu(false);
  };

  return (
    <div className="select-none">
      {/* Folder Item */}
      <div
        className={`folder-item flex items-center gap-2 p-1.5 cursor-pointer relative group rounded-sm transition-colors ${
          isSelected 
            ? 'bg-[var(--accent)] text-[var(--bg-main)]' 
            : 'hover:bg-[var(--bg-main)] hover:shadow-sm'
        }`}
        style={{ paddingLeft: `${level * 16 + 6}px`, marginBottom: '1px' }}
        onClick={handleSelect}
      >
        {/* Connecting lines for folders */}
        {level > 0 && (
          <>
            <div
              className="absolute"
              style={{
                left: `${level * 16 - 8}px`,
                top: '0',
                bottom: '50%',
                width: '1px',
                backgroundColor: 'var(--border-main)',
                opacity: 0.3
              }}
            />
            <div
              className="absolute"
              style={{
                left: `${level * 16 - 8}px`,
                top: '50%',
                width: '8px',
                height: '1px',
                backgroundColor: 'var(--border-main)',
                opacity: 0.3
              }}
            />
          </>
        )}
        {/* Expand/Collapse Button */}
        {hasChildren && (
          <button
            onClick={handleToggle}
            className="p-1 hover:bg-[var(--bg-tertiary)] rounded"
            style={{ background: isSelected ? 'rgba(0,0,0,0.2)' : undefined }}
          >
            {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </button>
        )}
        
        {/* Spacer if no children */}
        {!hasChildren && <div className="w-6" />}
        
        {/* Folder Icon */}
        <div className="flex items-center justify-center" style={{ width: '20px', height: '20px' }}>
          {folder.icon ? (
            <span className="text-base leading-none" style={{ fontSize: '16px' }}>{folder.icon}</span>
          ) : (
            <div style={{ color: folder.color || 'var(--accent)' }}>
              {isExpanded && hasChildren ? (
                <FolderOpen size={16} />
              ) : (
                <Folder size={16} />
              )}
            </div>
          )}
        </div>
        
        {/* Folder Name */}
        <span className="flex-1 text-sm font-medium truncate">
          {folder.name}
        </span>
        
        {/* Notes Count */}
        {notesCount > 0 && (
          <span className="text-xs px-2 py-1 rounded" 
                style={{ 
                  background: isSelected ? 'rgba(0,0,0,0.2)' : 'var(--bg-main)',
                  color: isSelected ? 'inherit' : 'var(--text-muted)'
                }}>
            {notesCount}
          </span>
        )}
        
        {/* Menu Button */}
        <button
          onClick={handleMenuToggle}
          className="p-1 opacity-0 group-hover:opacity-100 hover:bg-[var(--bg-tertiary)] rounded"
          style={{ background: isSelected ? 'rgba(0,0,0,0.2)' : undefined }}
        >
          <MoreHorizontal size={14} />
        </button>
        
        {/* Dropdown Menu */}
        {showMenu && (
          <div
            className="absolute right-0 top-8 z-50 neo-container p-1 min-w-[120px]"
            style={{ background: 'var(--bg-secondary)' }}
          >
            <button
              onClick={handleCreateChild}
              className="w-full flex items-center gap-2 p-2 text-left text-xs hover:bg-[var(--bg-tertiary)] rounded"
            >
              <Plus size={12} />
              add subfolder
            </button>
            <button
              onClick={handleEdit}
              className="w-full flex items-center gap-2 p-2 text-left text-xs hover:bg-[var(--bg-tertiary)] rounded"
            >
              <Edit size={12} />
              rename
            </button>
            <button
              onClick={handleEditIcon}
              className="w-full flex items-center gap-2 p-2 text-left text-xs hover:bg-[var(--bg-tertiary)] rounded"
            >
              <Smile size={12} />
              change icon
            </button>
            <button
              onClick={handleDelete}
              className="w-full flex items-center gap-2 p-2 text-left text-xs hover:bg-[var(--accent-secondary)] hover:text-white rounded"
            >
              <Trash size={12} />
              delete
            </button>
          </div>
        )}
      </div>

      {/* Notes and Child Folders */}
      {isExpanded && (
        <div className="folder-children">
          {/* Notes in this folder */}
          {notesInFolder.map((note, index) => (
            <div
              key={note.id}
              onClick={() => onSelectNote(note.id)}
              className={`cursor-pointer flex items-start gap-2 p-1.5 rounded-sm transition-colors ${
                selectedNoteId === note.id 
                  ? 'bg-[var(--accent)] text-[var(--bg-main)]' 
                  : 'hover:bg-[var(--bg-main)] hover:shadow-sm'
              }`}
              style={{ 
                paddingLeft: `${(level + 1) * 16 + 12}px`,
                marginBottom: '1px',
                position: 'relative'
              }}
            >
              {/* Connecting lines for visual hierarchy */}
              <div
                className="absolute"
                style={{
                  left: `${(level + 1) * 16 - 2}px`,
                  top: '0',
                  bottom: index === notesInFolder.length - 1 ? '50%' : '0',
                  width: '1px',
                  backgroundColor: 'var(--border-main)',
                  opacity: 0.3
                }}
              />
              <div
                className="absolute"
                style={{
                  left: `${(level + 1) * 16 - 2}px`,
                  top: '50%',
                  width: '8px',
                  height: '1px',
                  backgroundColor: 'var(--border-main)',
                  opacity: 0.3
                }}
              />
              
              {/* Note icon or bullet point */}
              <div className="flex-shrink-0 flex items-center justify-center" style={{ width: '16px', height: '16px' }}>
                {note.icon ? (
                  <span className="text-sm leading-none">{note.icon}</span>
                ) : (
                  <div 
                    style={{ 
                      width: '6px',
                      height: '6px',
                      backgroundColor: selectedNoteId === note.id ? 'var(--bg-main)' : 'var(--accent)',
                      borderRadius: '50%',
                    }}
                  />
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm mb-1 truncate">
                  {note.title || 'untitled'}
                </div>
                <div className="text-xs mb-1" style={{ 
                  color: selectedNoteId === note.id ? 'inherit' : 'var(--text-muted)',
                  opacity: 0.8 
                }}>
                  {formatDate(note.updatedAt)}
                </div>
                <div className="text-xs truncate" style={{ 
                  opacity: selectedNoteId === note.id ? 0.8 : 0.6 
                }}>
                  {truncateContent(note.content)}
                </div>
              </div>
            </div>
          ))}

          {/* Child Folders */}
          {childFolders
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((childFolder) => (
              <FolderNode
                key={childFolder.id}
                folder={childFolder}
                level={level + 1}
                isSelected={selectedNoteId === null && isSelected}
                onSelect={onSelect}
                onCreateChild={onCreateChild}
                onEdit={onEdit}
                onEditIcon={onEditIcon}
                onDelete={onDelete}
                onSelectNote={onSelectNote}
                selectedNoteId={selectedNoteId}
              />
            ))}
        </div>
      )}
    </div>
  );
};

interface FolderTreeProps {
  selectedFolderId: string | null;
  selectedNoteId: string | null;
  onSelectFolder: (id: string | null) => void;
  onSelectNote: (id: string) => void;
  onCreateFolder: (parentId?: string | null, name?: string) => void;
  onEditFolder: (id: string, updates: Partial<FolderType>) => void;
  onDeleteFolder: (id: string) => void;
}

const FolderTree: React.FC<FolderTreeProps> = ({
  selectedFolderId,
  selectedNoteId,
  onSelectFolder,
  onSelectNote,
  onCreateFolder,
  onEditFolder,
  onDeleteFolder,
}) => {
  const { folders } = useStore();
  const [editingFolder, setEditingFolder] = useState<FolderType | null>(null);
  const [editName, setEditName] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [editingIconFolder, setEditingIconFolder] = useState<FolderType | null>(null);

  // Get root folders (no parent)
  const rootFolders = folders.filter(f => f.parentId === null);

  const handleEditFolder = (folder: FolderType) => {
    setEditingFolder(folder);
    setEditName(folder.name);
  };

  const handleSaveEdit = () => {
    if (editingFolder && editName.trim()) {
      onEditFolder(editingFolder.id, { name: editName.trim() });
      setEditingFolder(null);
      setEditName('');
    }
  };

  const handleCancelEdit = () => {
    setEditingFolder(null);
    setEditName('');
  };

  const handleDeleteFolder = (id: string) => {
    if (window.confirm('Delete this folder? Notes inside will be moved to root.')) {
      onDeleteFolder(id);
    }
  };

  const handleEditIcon = (folder: FolderType) => {
    setEditingIconFolder(folder);
    setShowEmojiPicker(true);
  };

  const handleEmojiSelect = (emoji: string) => {
    if (editingIconFolder) {
      onEditFolder(editingIconFolder.id, { icon: emoji });
    }
    setShowEmojiPicker(false);
    setEditingIconFolder(null);
  };

  const handleEmojiPickerClose = () => {
    setShowEmojiPicker(false);
    setEditingIconFolder(null);
  };

  // Close menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = () => {
      // Close all menus - in a real app you'd use refs
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="folder-tree">
      {/* Edit Dialog */}
      {editingFolder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="neo-container p-4 w-80">
            <h3 className="font-semibold mb-3">rename folder</h3>
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="neo-input w-full mb-3"
              placeholder="folder name"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSaveEdit();
                if (e.key === 'Escape') handleCancelEdit();
              }}
            />
            <div className="flex gap-2">
              <button onClick={handleSaveEdit} className="neo-button flex-1">
                save
              </button>
              <button onClick={handleCancelEdit} className="neo-button">
                cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Folder Tree */}
      <div className="space-y-1">
        {rootFolders
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((folder) => (
            <FolderNode
              key={folder.id}
              folder={folder}
              level={0}
              isSelected={selectedFolderId === folder.id}
              onSelect={onSelectFolder}
              onCreateChild={onCreateFolder}
              onEdit={handleEditFolder}
              onEditIcon={handleEditIcon}
              onDelete={handleDeleteFolder}
              onSelectNote={onSelectNote}
              selectedNoteId={selectedNoteId}
            />
          ))}
      </div>

      {/* Emoji Picker */}
      {showEmojiPicker && editingIconFolder && (
        <Suspense fallback={
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="neo-container p-4">
              <div className="text-center">
                <div className="text-lg mb-2">🎨</div>
                <div className="text-sm">Loading emoji picker...</div>
              </div>
            </div>
          </div>
        }>
          <EmojiPicker
            onSelect={handleEmojiSelect}
            onClose={handleEmojiPickerClose}
            currentIcon={editingIconFolder.icon}
          />
        </Suspense>
      )}
    </div>
  );
};

export default FolderTree;