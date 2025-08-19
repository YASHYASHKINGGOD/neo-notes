export interface ElectronAPI {
  // File operations
  saveNotes: (notesData: any) => Promise<{ success: boolean; error?: string }>;
  loadNotes: () => Promise<{ success: boolean; data?: any; error?: string }>;
  getNotesDir: () => Promise<string>;
  exportNotes: (filePath: string, notesData: any) => Promise<{ success: boolean; error?: string }>;
  importNotes: (filePath: string) => Promise<{ success: boolean; data?: any; error?: string }>;

  // Menu events
  onMenuNewNote: (callback: () => void) => void;
  onMenuImport: (callback: (event: any, filePath: string) => void) => void;
  onMenuExport: (callback: (event: any, filePath: string) => void) => void;
  onMenuPreferences: (callback: () => void) => void;

  // Remove listeners
  removeAllListeners: (channel: string) => void;

  // App info
  platform: string;
  version: string;
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}