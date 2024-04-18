// Modules to control application life and create native browser window
const { app, BrowserWindow, autoUpdater, dialog, ipcMain } = require("electron")
const path = require("node:path")
const mqtt = require("mqtt")

const { calculAnglesFiltered } = require("./calculsAngle")

const client = mqtt.connect('mqtt://192.168.1.20');
const templateTopic = 'application/6/device//#'

var angles = {
  angleX : 0,
  angleY : 0,
  angleZ : 0
}

if (require("electron-squirrel-startup")) app.quit();
var mainWindow
function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1900,
    height: 1060,
    webPreferences: {
      preload: path.join(__dirname, "preload.js")
    },
    autoHideMenuBar: true,
    icon: path.join(__dirname, "icon/icon.png")
  })

  // and load the index.html of the app.
  mainWindow.loadFile("public/index.html")

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on("activate", function () {
    // On macOS it"s common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
  
  ipcMain.on("return-choosen-end-devices", (event, data) => {

    data.forEach(device => {

      client.subscribe(templateTopic.replace(/\/\//gm, `/f1f2f3430100000${device}/`))
    })
  })

  client.on('message',(topic, message) => {
      const deviceName = JSON.parse(message).deviceName
      
      var data = JSON.parse(message).object
    
      angles = calculAnglesFiltered(data)
    
      mainWindow.webContents.send("angles-data", {
        "deviceName": deviceName,
        "data": angles
      })
  });
})

// Quit when all windows are closed, except on macOS. There, it"s common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

try {
  autoUpdater.setFeedURL({
    url: "https://github.com/Raserber/UGA_suiviPosture_Frontend/releases/latest/download",
    headers: {
      "Cache-Control": "no-cache"
    }
  })

  autoUpdater.checkForUpdates()
  setInterval(() => {

    autoUpdater.checkForUpdates()
  }, 15000)

  autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
    const dialogOpts = {
      type: 'info',
      buttons: ['Restart', 'Later'],
      title: 'Application Update',
      message: process.platform === 'win32' ? releaseNotes : nomrelease,
      détail:
        "Une nouvelle version a été téléchargée. Redémarrez l'application pour appliquer les mises à jour."
    }

    dialog.showMessageBox(dialogOpts).then((returnValue) => {
      if (returnValue.response === 0) autoUpdater.quitAndInstall()
    })
  })

  autoUpdater.on('error', (message) => {
    console.error(message)
  })
}

catch (e) {
  console.error(e)
}

client.on('connect', () => {
    console.log(`Is client connected: ${client.connected}`);    
    if (client.connected === true) {
    }
});
