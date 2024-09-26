// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const { contextBridge, ipcRenderer } = require('electron/renderer')

// par convention les "return" sont du front -> back, et les "on" du back -> front
contextBridge.exposeInMainWorld('electronAPI', {
  // renderer -> Main.js
  returnAdresseMQTT: (data) => ipcRenderer.send('adresseMQTT', data),
  
  // Main.js -> renderer
  // onAnglesData: (callback) => ipcRenderer.on('angles-data', (_event, value) => callback(value)),
})