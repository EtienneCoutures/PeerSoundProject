const electron = require('electron')
const {ipcMain} = require('electron');
const riot = require('riot');
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const ytdl = require('ytdl-core');
const app = electron.app
const BrowserWindow = electron.BrowserWindow
  // Keep a global reference of the window object, if you don't, the window will
  // be closed automatically when the JavaScript object is garbage collected.
  let win


  ipcMain.on('user', (event, account) => {
    account.name = account.usr_email.slice(0, account.usr_email.indexOf('.')
    || account.usr_email.indexOf('@'));
    global.user = account;
  })

  ipcMain.on('playlist', (event, param) => {
    global.playlists = []
    global.playlists = JSON.parse(JSON.stringify(param));
  })


  function createWindow () {
    // Create the browser window.
    win = new BrowserWindow({simpleFullscreen: true})
    global.requestManager = require('./requestManager.js');
    // and load the index.html of the app.
    win.loadFile('login.html')

    // Open the DevTools.
    win.webContents.openDevTools()

    // Emitted when the window is closed.
    win.on('closed', () => {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      win = null
    })
  }

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', createWindow)

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow()
    }
  })
