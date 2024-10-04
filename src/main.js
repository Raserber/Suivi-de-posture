import { app, BrowserWindow, autoUpdater, dialog, ipcMain } from 'electron';
import path from 'node:path';
import started from 'electron-squirrel-startup'

import mqtt from "mqtt";

var clientMQTT = null;
const eventsMQTT = ["connect", "reconnect", "close", "disconnect", "offline", "error", "end"]

const parseJSON = (inputString, fallback) => {
  if (inputString) {
    try {
      return JSON.parse(inputString);
    } catch (e) {
      return fallback;
    }
  }
};

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1900,
    height: 1000,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
    autoHideMenuBar: true,
    icon: path.join(__dirname, "public/icon.png")
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  ipcMain.on("returnAskFullscreen", (event, isFullscreen) => {

    mainWindow.setFullScreen(isFullscreen)
  })

  ipcMain.on("returnMessageMQTT", (event, {topic, message}) => {

    clientMQTT.publish(topic, message)
  })
  
  ipcMain.on("returnResetMQTT", (event, reason) => {

    console.log(reason)
    
    if (clientMQTT) {

      clientMQTT.end()
    }
  })

  ipcMain.on("returnTopicsMQTTSelected", (event, {host, selectedTopics}) => {
    
    if (clientMQTT) {
      clientMQTT.end()
      clientMQTT = null
    }
    
    clientMQTT = mqtt.connect(host, {manualConnect: true})
        
    function returnMQTTEvent(event) {
      clientMQTT.on(event, () => {

        mainWindow.webContents.send("onStatutMQTT", event)
        console.log(event)
      }) 
    }

    eventsMQTT.forEach(event => returnMQTTEvent(event))

    clientMQTT.connect()
    
    selectedTopics.forEach(topic => {

      clientMQTT.subscribe(topic)
    })
    
    clientMQTT.on("message", (topic, data) => {
      
      mainWindow.webContents.send("onMessageMQTT", {
        topic: topic,
        data: parseJSON(data)
      })
    })
  })
  
  ipcMain.on("returnHostAndTopicMQTT", (event, {host, topic}) => {
    
    if (clientMQTT) {
      clientMQTT.end()
      clientMQTT = null
    }

    clientMQTT = mqtt.connect(host, {manualConnect: true})

    function returnMQTTEvent(event) {
      clientMQTT.on(event, () => {
        mainWindow.webContents.send("onStatutMQTT", event)
        console.log(event)
      }) 
    }
    
    eventsMQTT.forEach(event => returnMQTTEvent(event))
    
    clientMQTT.connect()

    clientMQTT.subscribe(topic)
    
    clientMQTT.on("message", (topic, data) => {

      mainWindow.webContents.send("onMessageMQTT", {
        topic: topic,
        data: parseJSON(data)
      })
    })
  })
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.