"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var offlineFeaturesHandler = null;
electron_1.app.on('browser-window-created', function (event, window) {
    // offlineFeaturesHandler = new OfflineFeaturesHandler(window)
});
electron_1.ipcMain.on('offline-load-playlist', function (event, data) {
    var pl = data.pl;
    offlineFeaturesHandler.loadPspFile(pl);
});
electron_1.ipcMain.on('offline-get-musics-request', function (event, data) {
    offlineFeaturesHandler.sendMusics(data.plName);
});
electron_1.ipcMain.on('offline-cancel-musics-loading', function (event, data) {
    offlineFeaturesHandler.cancelSendMusicsRequest(data.plName);
});
electron_1.ipcMain.on('offline-reset', function (event, data) {
    // app.relaunch({args: process.argv.slice(1).concat(['--relaunch'])})
    // app.exit(0)
    // offlineFeaturesHandler.reset()
});
electron_1.ipcMain.on('offline-dl-music', function (event, data) {
    offlineFeaturesHandler.dlMusicToPspFile(data.plName, data.music);
});
//# sourceMappingURL=offline-features-protocole.js.map