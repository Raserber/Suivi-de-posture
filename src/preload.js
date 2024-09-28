// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const { contextBridge, ipcRenderer } = require('electron/renderer')

// par convention les "return" sont du front -> back, et les "on" du back -> front
contextBridge.exposeInMainWorld('electronAPI', {
  // renderer -> Main.js
  returnHostAndTopicMQTT: ({host, topic}) => ipcRenderer.send('returnHostAndTopicMQTT', {host, topic}),
  returnMessageMQTT: ({topic, message}) => ipcRenderer.send("returnMessageMQTT", {topic, message}),
  returnResetMQTT: (data) => ipcRenderer.send("returnResetMQTT", data),
  
  // Main.js -> renderer
  onMessageMQTT: (callback) => ipcRenderer.on('onMessageMQTT', (_event, value) => callback(value)),
  onStatutMQTT: (callback) => ipcRenderer.on('onStatutMQTT', (_event, value) => callback(value)),
})