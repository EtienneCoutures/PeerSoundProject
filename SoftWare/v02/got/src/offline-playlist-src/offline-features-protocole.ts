import { app, BrowserWindow, ipcMain } from 'electron'
import * as EventEmitter from 'events'
import { OfflineFeaturesHandler } from './offline-features-handler'

let offlineFeaturesHandler = null

app.on('browser-window-created', (event, window) => {
  // offlineFeaturesHandler = new OfflineFeaturesHandler(window)
})

ipcMain.on('offline-load-playlist', (event, data) => { // data = la playlist
  var pl = data.pl
  offlineFeaturesHandler.loadPspFile(pl)
})

ipcMain.on('offline-get-musics-request', (event, data) => { // data = la playlist
  offlineFeaturesHandler.sendMusics(data.plName)
})

ipcMain.on('offline-cancel-musics-loading', (event, data) => { // data = la playlist
  offlineFeaturesHandler.cancelSendMusicsRequest(data.plName)
})

ipcMain.on('offline-reset', (event, data) => { // data = la playlist
  // app.relaunch({args: process.argv.slice(1).concat(['--relaunch'])})
  // app.exit(0)
  // offlineFeaturesHandler.reset()
})

ipcMain.on('offline-dl-music', (event, data) => {
  offlineFeaturesHandler.dlMusicToPspFile(data.plName, data.music)
})
