const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  // File operations
  saveNotes: (notesData) => ipcRenderer.invoke('save-notes', notesData),
  loadNotes: () => ipcRenderer.invoke('load-notes'),
  getNotesDir: () => ipcRenderer.invoke('get-notes-dir'),
  exportNotes: (filePath, notesData) => ipcRenderer.invoke('export-notes', filePath, notesData),
  importNotes: (filePath) => ipcRenderer.invoke('import-notes', filePath),

  // Menu events
  onMenuNewNote: (callback) => ipcRenderer.on('menu-new-note', callback),
  onMenuImport: (callback) => ipcRenderer.on('menu-import', callback),
  onMenuExport: (callback) => ipcRenderer.on('menu-export', callback),
  onMenuPreferences: (callback) => ipcRenderer.on('menu-preferences', callback),

  // Remove listeners
  removeAllListeners: (channel) => ipcRenderer.removeAllListeners(channel),

  // App info
  platform: process.platform,
  version: process.env.npm_package_version || '1.0.0'
});