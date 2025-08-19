import { create } from "zustand";
import type { Theme } from './components/ThemeCustomizer';
import { defaultThemes } from './components/ThemeCustomizer';

export interface Folder {
  id: string;
  name: string;
  parentId: string | null;
  color?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Note { 
  id: string; 
  title: string;
  content: string;
  folderId: string | null;
  tags: string[];
  links: string[]; // IDs of linked notes
  backlinks: string[]; // IDs of notes linking to this one
  attachments: string[]; // File paths/URLs
  createdAt: Date;
  updatedAt: Date;
}

export interface GraphNode {
  id: string;
  title: string;
  type: 'note' | 'folder';
  x?: number;
  y?: number;
  connections: string[];
}

export interface GraphConnection {
  id: string;
  sourceId: string;
  targetId: string;
  type: 'link' | 'folder' | 'tag';
}

type Store = {
  notes: Note[];
  folders: Folder[];
  selectedNoteId: string | null;
  selectedFolderId: string | null;
  searchTerm: string;
  currentTheme: Theme;
  isThemeCustomizerOpen: boolean;
  viewMode: 'list' | 'graph';
  
  // Note operations
  addNote: (folderId?: string | null) => void;
  updateNote: (id: string, updates: Partial<Note>) => void;
  deleteNote: (id: string) => void;
  selectNote: (id: string | null) => void;
  getSelectedNote: () => Note | null;
  getFilteredNotes: () => Note[];
  
  // Folder operations  
  addFolder: (parentId?: string | null, name?: string) => void;
  updateFolder: (id: string, updates: Partial<Folder>) => void;
  deleteFolder: (id: string) => void;
  selectFolder: (id: string | null) => void;
  getFolderTree: () => Folder[];
  getNotesInFolder: (folderId: string | null) => Note[];
  moveFolder: (folderId: string, newParentId: string | null) => void;
  moveNoteToFolder: (noteId: string, folderId: string | null) => void;
  
  // Search and filtering
  setSearchTerm: (term: string) => void;
  setViewMode: (mode: 'list' | 'graph') => void;
  
  // Tag operations
  getAllTags: () => string[];
  getNotesWithTag: (tag: string) => Note[];
  addTagToNote: (noteId: string, tag: string) => void;
  removeTagFromNote: (noteId: string, tag: string) => void;
  
  // Backlink operations
  updateBacklinks: (noteId: string, content: string) => void;
  getBacklinkedNotes: (noteId: string) => Note[];
  
  // Theme management
  setTheme: (theme: Theme) => void;
  toggleThemeCustomizer: () => void;
  applyThemeToCSS: (theme: Theme) => void;
  
  // Graph operations
  getGraphNodes: () => GraphNode[];
  getGraphConnections: () => GraphConnection[];
  linkNotes: (noteId1: string, noteId2: string) => void;
  unlinkNotes: (noteId1: string, noteId2: string) => void;

  // File system operations for Electron
  isElectron: () => boolean;
  saveToFile: () => Promise<void>;
  loadFromFile: () => Promise<void>;
  exportNotes: (filePath?: string) => Promise<any>;
  importNotes: (filePath: string) => Promise<void>;
  
  // localStorage operations for web version
  initFromLocalStorage: () => void;
  saveToLocalStorage: () => void;
};

export const useStore = create<Store>((set, get) => ({
  notes: [
    {
      id: "1",
      title: "welcome to notes",
      content: "this is your first note. click on any note to edit it or create a new one with the + button.",
      folderId: "folder-1",
      tags: ["welcome", "getting-started"],
      links: ["2"],
      backlinks: [],
      attachments: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "2", 
      title: "neo-brutalist design",
      content: "this notes app uses neo-brutalist design principles:\n\n• bold borders\n• high contrast\n• offset shadows\n• functional aesthetics\n\ntry creating more notes!\n\nThis note is linked to the [[welcome to notes]] note.",
      folderId: "folder-1",
      tags: ["design", "brutalism"],
      links: [],
      backlinks: ["1"],
      attachments: [],
      createdAt: new Date(Date.now() - 86400000),
      updatedAt: new Date(Date.now() - 86400000),
    },
    {
      id: "3",
      title: "knowledge management",
      content: "building a second brain with:\n\n• [[neo-brutalist design]] principles\n• interconnected notes\n• visual knowledge graphs\n• multimedia support",
      folderId: null,
      tags: ["pkm", "second-brain"],
      links: ["2"],
      backlinks: [],
      attachments: [],
      createdAt: new Date(Date.now() - 172800000),
      updatedAt: new Date(Date.now() - 172800000),
    },
  ],
  
  folders: [
    {
      id: "folder-1",
      name: "getting started",
      parentId: null,
      color: "#6b7280",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "folder-2", 
      name: "projects",
      parentId: null,
      color: "#8b5cf6",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
   
  selectedNoteId: "1",
  selectedFolderId: "folder-1",
  searchTerm: "",
  currentTheme: defaultThemes[0],
  isThemeCustomizerOpen: false,
  viewMode: 'list',
  
  addNote: (folderId = null) => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: "untitled note",
      content: "",
      folderId: folderId !== undefined ? folderId : get().selectedFolderId,
      tags: [],
      links: [],
      backlinks: [],
      attachments: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    set((state) => ({
      notes: [newNote, ...state.notes],
      selectedNoteId: newNote.id,
    }));
    get().saveToFile();
    get().saveToLocalStorage();
  },

  updateNote: (id, updates) => {
    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === id 
          ? { ...note, ...updates, updatedAt: new Date() }
          : note
      ),
    }));
    get().saveToFile();
    get().saveToLocalStorage();
  },

  deleteNote: (id) => {
    set((state) => ({
      notes: state.notes.filter((note) => note.id !== id),
      selectedNoteId: state.selectedNoteId === id ? null : state.selectedNoteId,
    }));
    get().saveToLocalStorage();
  },

  selectNote: (id) => {
    set({ selectedNoteId: id });
    get().saveToLocalStorage();
  },

  setSearchTerm: (term) => set({ searchTerm: term }),

  getSelectedNote: () => {
    const state = get();
    return state.notes.find((note) => note.id === state.selectedNoteId) || null;
  },

  getFilteredNotes: () => {
    const state = get();
    if (!state.searchTerm) return state.notes;
    
    return state.notes.filter((note) =>
      note.title.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(state.searchTerm.toLowerCase())
    );
  },

  // Folder operations
  addFolder: (parentId = null, name = "new folder") => {
    const newFolder: Folder = {
      id: `folder-${Date.now()}`,
      name,
      parentId,
      color: "#6b7280",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    set((state) => ({
      folders: [...state.folders, newFolder],
      selectedFolderId: newFolder.id,
    }));
    get().saveToLocalStorage();
  },

  updateFolder: (id, updates) => {
    set((state) => ({
      folders: state.folders.map((folder) =>
        folder.id === id 
          ? { ...folder, ...updates, updatedAt: new Date() }
          : folder
      ),
    }));
  },

  deleteFolder: (id) => {
    set((state) => ({
      folders: state.folders.filter((folder) => folder.id !== id),
      selectedFolderId: state.selectedFolderId === id ? null : state.selectedFolderId,
    }));
  },

  selectFolder: (id) => {
    set({ selectedFolderId: id });
    get().saveToLocalStorage();
  },

  getFolderTree: () => {
    const state = get();
    return state.folders;
  },

  getNotesInFolder: (folderId) => {
    const state = get();
    return state.notes.filter((note) => note.folderId === folderId);
  },

  moveFolder: (folderId, newParentId) => {
    // Prevent moving a folder into itself or its descendants
    const state = get();
    const isDescendant = (parentId: string | null, targetId: string): boolean => {
      if (!parentId) return false;
      if (parentId === targetId) return true;
      const parent = state.folders.find(f => f.id === parentId);
      return parent ? isDescendant(parent.parentId, targetId) : false;
    };

    if (newParentId && isDescendant(newParentId, folderId)) {
      console.warn('Cannot move folder into itself or its descendants');
      return;
    }

    set((state) => ({
      folders: state.folders.map((folder) =>
        folder.id === folderId 
          ? { ...folder, parentId: newParentId, updatedAt: new Date() }
          : folder
      ),
    }));
    get().saveToFile();
    get().saveToLocalStorage();
  },

  moveNoteToFolder: (noteId, folderId) => {
    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === noteId 
          ? { ...note, folderId, updatedAt: new Date() }
          : note
      ),
    }));
    get().saveToFile();
    get().saveToLocalStorage();
  },

  setViewMode: (mode) => set({ viewMode: mode }),

  // Tag operations
  getAllTags: () => {
    const state = get();
    const allTags = new Set<string>();
    state.notes.forEach(note => {
      note.tags.forEach(tag => allTags.add(tag));
    });
    return Array.from(allTags).sort();
  },

  getNotesWithTag: (tag) => {
    const state = get();
    return state.notes.filter(note => note.tags.includes(tag));
  },

  addTagToNote: (noteId, tag) => {
    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === noteId 
          ? { ...note, tags: [...new Set([...note.tags, tag])], updatedAt: new Date() }
          : note
      ),
    }));
    get().saveToFile();
    get().saveToLocalStorage();
  },

  removeTagFromNote: (noteId, tag) => {
    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === noteId 
          ? { ...note, tags: note.tags.filter(t => t !== tag), updatedAt: new Date() }
          : note
      ),
    }));
    get().saveToFile();
    get().saveToLocalStorage();
  },

  // Backlink operations
  updateBacklinks: (noteId, content) => {
    const state = get();
    
    // Extract note titles mentioned in [[title]] format
    const linkPattern = /\[\[([^\]]+)\]\]/g;
    const mentionedTitles: string[] = [];
    let match;
    
    while ((match = linkPattern.exec(content)) !== null) {
      mentionedTitles.push(match[1].toLowerCase());
    }
    
    // Find notes with matching titles
    const linkedNoteIds = state.notes
      .filter(note => note.id !== noteId && mentionedTitles.includes(note.title.toLowerCase()))
      .map(note => note.id);
    
    // Update the current note's links
    set((state) => ({
      notes: state.notes.map((note) => {
        if (note.id === noteId) {
          return { ...note, links: [...new Set(linkedNoteIds)], updatedAt: new Date() };
        }
        
        // Update backlinks for other notes
        const shouldHaveBacklink = linkedNoteIds.includes(note.id);
        const currentlyHasBacklink = note.backlinks.includes(noteId);
        
        if (shouldHaveBacklink && !currentlyHasBacklink) {
          return { ...note, backlinks: [...note.backlinks, noteId] };
        } else if (!shouldHaveBacklink && currentlyHasBacklink) {
          return { ...note, backlinks: note.backlinks.filter(id => id !== noteId) };
        }
        
        return note;
      }),
    }));
    
    get().saveToFile();
    get().saveToLocalStorage();
  },

  getBacklinkedNotes: (noteId) => {
    const state = get();
    const note = state.notes.find(n => n.id === noteId);
    if (!note) return [];
    
    return state.notes.filter(n => note.backlinks.includes(n.id));
  },

  setTheme: (theme) => {
    set({ currentTheme: theme });
    get().applyThemeToCSS(theme);
    
    // Save to localStorage for web version
    if (typeof window !== 'undefined') {
      localStorage.setItem('rob-yyn-notes-theme', JSON.stringify(theme));
    }
    
    // Save to file for Electron version
    get().saveToFile();
  },

  toggleThemeCustomizer: () => {
    set((state) => ({ isThemeCustomizerOpen: !state.isThemeCustomizerOpen }));
  },

  applyThemeToCSS: (theme) => {
    const root = document.documentElement;
    root.style.setProperty('--bg-main', theme.bgMain);
    root.style.setProperty('--bg-secondary', theme.bgSecondary);
    root.style.setProperty('--bg-tertiary', theme.bgTertiary);
    root.style.setProperty('--text-main', theme.textMain);
    root.style.setProperty('--text-secondary', theme.textSecondary);
    root.style.setProperty('--text-muted', theme.textMuted);
    root.style.setProperty('--border-main', theme.borderMain);
    root.style.setProperty('--accent', theme.accent);
    root.style.setProperty('--accent-secondary', theme.accentSecondary);
    root.style.setProperty('--icon-color', theme.iconColor || theme.textMain);
    root.style.setProperty('--button-text-color', theme.buttonTextColor || theme.textMain);
    root.style.setProperty('--highlight-color', theme.highlightColor || theme.accent);
    root.style.setProperty('--link-color', theme.linkColor || theme.accent);
    root.style.setProperty('--tag-color', theme.tagColor || theme.accentSecondary);
    root.style.setProperty('--font-family', theme.fontFamily || 'Inter, system-ui, sans-serif');
    
    // Apply font family to body
    document.body.style.fontFamily = theme.fontFamily || 'Inter, system-ui, sans-serif';
  },

  // Graph operations
  getGraphNodes: () => {
    const state = get();
    const nodes: GraphNode[] = [];
    
    // Add note nodes
    state.notes.forEach((note) => {
      nodes.push({
        id: note.id,
        title: note.title,
        type: 'note',
        connections: [...note.links, ...note.backlinks],
      });
    });
    
    // Add folder nodes
    state.folders.forEach((folder) => {
      nodes.push({
        id: folder.id,
        title: folder.name,
        type: 'folder',
        connections: state.notes.filter(n => n.folderId === folder.id).map(n => n.id),
      });
    });
    
    return nodes;
  },

  getGraphConnections: () => {
    const state = get();
    const connections: GraphConnection[] = [];
    
    // Add note-to-note links
    state.notes.forEach((note) => {
      note.links.forEach((linkedNoteId) => {
        connections.push({
          id: `${note.id}-${linkedNoteId}`,
          sourceId: note.id,
          targetId: linkedNoteId,
          type: 'link',
        });
      });
    });
    
    // Add folder connections
    state.notes.forEach((note) => {
      if (note.folderId) {
        connections.push({
          id: `${note.folderId}-${note.id}`,
          sourceId: note.folderId,
          targetId: note.id,
          type: 'folder',
        });
      }
    });
    
    return connections;
  },

  linkNotes: (noteId1, noteId2) => {
    set((state) => ({
      notes: state.notes.map((note) => {
        if (note.id === noteId1) {
          return { ...note, links: [...note.links, noteId2] };
        }
        if (note.id === noteId2) {
          return { ...note, backlinks: [...note.backlinks, noteId1] };
        }
        return note;
      }),
    }));
  },

  unlinkNotes: (noteId1, noteId2) => {
    set((state) => ({
      notes: state.notes.map((note) => {
        if (note.id === noteId1) {
          return { ...note, links: note.links.filter(id => id !== noteId2) };
        }
        if (note.id === noteId2) {
          return { ...note, backlinks: note.backlinks.filter(id => id !== noteId1) };
        }
        return note;
      }),
    }));
    get().saveToFile();
  },

  // File system operations for Electron
  isElectron: () => {
    return typeof window !== 'undefined' && !!window.electronAPI;
  },

  saveToFile: async () => {
    if (!get().isElectron()) return;
    
    try {
      const state = get();
      const dataToSave = {
        notes: state.notes,
        folders: state.folders,
        currentTheme: state.currentTheme,
        version: '1.0.0',
        lastSaved: new Date().toISOString()
      };
      
      await window.electronAPI.saveNotes(dataToSave);
    } catch (error) {
      console.error('Failed to save to file:', error);
    }
  },

  loadFromFile: async () => {
    if (!get().isElectron()) return;
    
    try {
      const result = await window.electronAPI.loadNotes();
      if (result.success && result.data) {
        const data = result.data;
        set({
          notes: data.notes || [],
          folders: data.folders || [],
          currentTheme: data.currentTheme || defaultThemes[0]
        });
        get().applyThemeToCSS(data.currentTheme || defaultThemes[0]);
      }
    } catch (error) {
      console.error('Failed to load from file:', error);
    }
  },

  exportNotes: async (filePath?: string) => {
    if (!get().isElectron()) return;
    
    try {
      const state = get();
      const dataToExport = {
        notes: state.notes,
        folders: state.folders,
        currentTheme: state.currentTheme,
        exportedAt: new Date().toISOString(),
        version: '1.0.0'
      };
      
      if (filePath) {
        await window.electronAPI.exportNotes(filePath, dataToExport);
      }
      return dataToExport;
    } catch (error) {
      console.error('Failed to export notes:', error);
    }
  },

  importNotes: async (filePath: string) => {
    if (!get().isElectron()) return;
    
    try {
      const result = await window.electronAPI.importNotes(filePath);
      if (result.success && result.data) {
        const data = result.data;
        set({
          notes: [...get().notes, ...(data.notes || [])],
          folders: [...get().folders, ...(data.folders || [])]
        });
        get().saveToFile();
      }
    } catch (error) {
      console.error('Failed to import notes:', error);
    }
  },

  // Initialize from localStorage
  initFromLocalStorage: () => {
    if (typeof window === 'undefined') return;
    
    try {
      console.log('🔄 Loading from localStorage...');
      
      // Load theme from localStorage
      const savedTheme = localStorage.getItem('rob-yyn-notes-theme');
      if (savedTheme) {
        try {
          const theme = JSON.parse(savedTheme);
          console.log('📱 Loaded theme:', theme.name);
          set({ currentTheme: theme });
          // Apply theme immediately after setting
          setTimeout(() => get().applyThemeToCSS(theme), 0);
        } catch {
          console.warn('Failed to parse saved theme');
        }
      } else {
        // Apply default theme if no saved theme
        setTimeout(() => get().applyThemeToCSS(get().currentTheme), 0);
      }

      // Load notes and folders from localStorage for web version
      const savedData = localStorage.getItem('rob-yyn-notes-data');
      if (savedData) {
        try {
          const data = JSON.parse(savedData);
          console.log('📂 Found saved data:', { 
            notes: data.notes?.length || 0, 
            folders: data.folders?.length || 0 
          });
          
          // Only update if we have valid saved data with content
          if (data && typeof data === 'object') {
            // const currentState = get();
            const updates: any = {};
            
            // Only override if saved data has content
            if (data.notes && Array.isArray(data.notes) && data.notes.length > 0) {
              // Convert date strings back to Date objects
              const notesWithDates = data.notes.map((note: any) => ({
                ...note,
                createdAt: new Date(note.createdAt),
                updatedAt: new Date(note.updatedAt)
              }));
              updates.notes = notesWithDates;
              console.log('✅ Restored', data.notes.length, 'notes with proper dates');
            }
            
            if (data.folders && Array.isArray(data.folders) && data.folders.length > 0) {
              // Convert date strings back to Date objects
              const foldersWithDates = data.folders.map((folder: any) => ({
                ...folder,
                createdAt: new Date(folder.createdAt),
                updatedAt: new Date(folder.updatedAt)
              }));
              updates.folders = foldersWithDates;
              console.log('✅ Restored', data.folders.length, 'folders with proper dates');
            }
            
            // Always restore selections if they exist
            if (data.selectedNoteId !== undefined) {
              updates.selectedNoteId = data.selectedNoteId;
            }
            
            if (data.selectedFolderId !== undefined) {
              updates.selectedFolderId = data.selectedFolderId;
            }
            
            if (Object.keys(updates).length > 0) {
              set(updates);
              console.log('✅ LocalStorage data restored');
            } else {
              console.log('ℹ️ No saved data to restore, keeping defaults');
            }
          }
        } catch {
          console.warn('Failed to parse saved data, keeping defaults');
        }
      } else {
        console.log('ℹ️ No saved data found, using defaults');
      }
    } catch (error) {
      console.error('Failed to load from localStorage:', error);
    }
  },

  // Save to localStorage for web version
  saveToLocalStorage: () => {
    if (typeof window === 'undefined') return;
    
    try {
      const state = get();
      const dataToSave = {
        notes: state.notes,
        folders: state.folders,
        selectedNoteId: state.selectedNoteId,
        selectedFolderId: state.selectedFolderId,
        version: '1.1.0',
        lastSaved: new Date().toISOString()
      };
      localStorage.setItem('rob-yyn-notes-data', JSON.stringify(dataToSave));
      console.log('💾 Saved to localStorage:', { 
        notes: state.notes.length, 
        folders: state.folders.length 
      });
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
    }
  },
}));