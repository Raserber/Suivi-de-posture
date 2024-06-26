/**
 * The preload script runs before. It has access to web APIs
 * as well as Electron's renderer process modules and some
 * polyfilled Node.js functions.
 *
 * https://www.electronjs.org/docs/latest/tutorial/sandbox
 */
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})

const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
  // renderer -> Main.js
  returnChoosenEndDevices: (data) => ipcRenderer.send('return-choosen-end-devices', data),
  askFullscreen: () => ipcRenderer.send('ask-fullscreen'),
  
  // Main.js -> renderer
  onAnglesData: (callback) => ipcRenderer.on('angles-data', (_event, value) => callback(value)),
  onConnexionStatus: (callback) => ipcRenderer.on('connexion-status', (_event, value) => callback(value)),
})
