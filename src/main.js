const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');

const mqtt = require("mqtt")

var clientMQTT = null;


// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
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
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  ipcMain.on("returnMessageMQTT", (event, data) => {

    clientMQTT.publish(data.topic, data.data)
  })
  
  ipcMain.on("returnResetMQTT", (event, reason) => {

    console.log(reason)
    
    if (clientMQTT) {

      clientMQTT.end()
    }
  })

  ipcMain.on("returnHostAndTopicMQTT", (event, {host, topic}) => {
    
    if (clientMQTT) {
      clientMQTT.end()
    }

    clientMQTT = mqtt.connect(host)

    clientMQTT.subscribe(topic)
    
    function returnMQTTEvent(event) {
      clientMQTT.on(event, () => {
        mainWindow.webContents.send("onStatutMQTT", event)
        console.log(event)
      }) 
    }
    
    returnMQTTEvent("connect")
    returnMQTTEvent("reconnect")
    returnMQTTEvent("close")
    returnMQTTEvent("disconnect")
    returnMQTTEvent("offline")
    returnMQTTEvent("error")
    returnMQTTEvent("end")
    
    clientMQTT.on("message", (topic, data) => {
  
      mainWindow.webContents.send("onMessageMQTT", {
        topic: topic,
        data: JSON.parse(data)
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
