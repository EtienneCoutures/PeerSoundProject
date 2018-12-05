"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
//         .eu.
var offline_playlist_1 = require("./offline-playlist");
var music_downloader_1 = require("./music-downloader");
var fs = require("fs");
var EventEmitter = require("events");
var OfflineFeaturesHandler = /** @class */ (function (_super) {
    __extends(OfflineFeaturesHandler, _super);
    // private _isOpeningFile: boolean = false
    // private _
    function OfflineFeaturesHandler(_win) {
        var _this = _super.call(this) || this;
        _this._win = _win;
        // private _curPspFile: OfflinePlaylist = null
        // private _curPspHeader: OfflinePlaylistHeader = null
        _this._downloader = new music_downloader_1.MusicDownloader();
        _this._pspFilesOpened = {};
        _this._downloader.on('dl-status-update', function (data) {
            _this.emit('dl-status-update', data);
        });
        return _this;
    }
    OfflineFeaturesHandler.prototype.dlMusicToPspFile = function (plName, music) {
        var _this = this;
        var saveDirPath = './';
        var pspFile = this.getPspFile(plName);
        pspFile.open(saveDirPath, plName, false).then(function () {
            // this.win.webContents.send('set-dl-status', 'dl-init...');
            var filename = music.music_name.replace(/ */g, '_');
            var isMusInFile = pspFile.getMusicMetadataByName(music.music_name).isInFile;
            var filepath = saveDirPath + music.music_name.replace(/ */g, '_') + '.mp3';
            console.log('ici');
            if (isMusInFile == 'false' || isMusInFile == false) {
                // this._win.webContents.send('dl-status-update', {update: 'connecting to source provider...'})
                _this._downloader.dlLink2Mp3(saveDirPath, filename, music.music_url, music.music_source, music).then(function () {
                    // this._win.webContents.send('dl-status-update', {update:'packing'});
                    pspFile.addMusicFile(filepath, music.music_id, music.music_name, false).then(function () {
                        pspFile.save().then(function () {
                            fs.unlink(filepath, function (err) {
                                if (err)
                                    throw new Error(err);
                                // this.win.webContents.send('set-dl-status', 'offline-available');
                            });
                        }, function (err) {
                            console.log(err);
                            throw new Error(err);
                        });
                    }, function (err) {
                        // this.win.webContents.send('set-dl-status', 'dl failed')
                        console.log(err);
                        throw new Error(err);
                    });
                }, function (err) {
                    // this.win.webContents.send('set-dl-status', 'dl failed')
                    console.log(err);
                    throw new Error(err);
                });
            }
            else {
                console.log('???');
                // fs.unlink(filepath, () => {}) // del mp3 file
            }
        }, function (err) {
            console.log('??? ->', err);
            // this.win.webContents.send('set-dl-status', 'dl failed ')
            throw new Error(err);
        });
    };
    // private changeCurPspFile(name: string): void {
    //   var file = null
    //
    //   if (this._curPspFile && name == this._curPspFile.name)
    //     return
    //
    //   if (!this._pspFilesOpened.hasOwnProperty(name))
    //     file = this._pspFilesOpened[name] = new OfflinePlaylist()
    //   else
    //     file = this._pspFilesOpened[name]
    //
    //   this._curPspFile = file
    //   this._curPspHeader = file.header
    // }
    OfflineFeaturesHandler.prototype.getPspFile = function (name) {
        var file = null;
        if (!this._pspFilesOpened.hasOwnProperty(name)) {
            console.log('add new psp file to opened list');
            this._pspFilesOpened[name] = new offline_playlist_1.OfflinePlaylist();
        }
        else
            console.log('get psp file ', this._pspFilesOpened[name].name);
        //   file = this._pspFilesOpened[name]
        return this._pspFilesOpened[name];
    };
    OfflineFeaturesHandler.prototype.loadPspFile = function (pl) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var pspFile = _this.getPspFile(pl.playlist_name);
            if (pspFile.isOpened) // file already loaded
                resolve(pspFile.getMusicsMetadata());
            pspFile.open('./', pl.playlist_name, true).then(function () {
                pl.MusicLink.forEach(function (m, i) {
                    pspFile.header.addMusic('', i, m.Music.music_name, false);
                });
                pspFile.save().then(function () {
                    resolve(pspFile.getMusicsMetadata());
                }, function (err) { reject(err); });
            }, function (err) { reject(err); });
        });
    };
    OfflineFeaturesHandler.prototype.extractMusicFile = function (plName, music) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var pspFile = _this.getPspFile(plName);
            pspFile.extractMusicFile('./', music.music_id, 'tmp').then(function () {
                resolve();
            }, function (e) {
                reject(e);
            });
        });
    };
    // sendMusics(plName: string): void {
    //
    //   // new Promise((resolve, reject) => {
    //     let pspFile = this.getPspFile(plName)
    //     // console.log(pspFile.name)
    //     let timeElapsed = 0
    //     let interval: any
    //     let name = plName
    //     var self = this
    //
    //     // console.log('isOpened | isOpening ', pspFile.isOpened, pspFile.isOpening)
    //
    //     if (pspFile.isOpening || pspFile.isOpened) {
    //       // if (pspFile.isOpening)
    //       // console.log('waiting file to be opened')
    //       interval = setInterval(() => {
    //
    //         let musics = pspFile.getMusicsMetadata()
    //         // self.once('stop', (data) => {
    //         //   if (data.plName == name)
    //         //     clearInterval(interval)
    //         // })
    //         timeElapsed += 50
    //         // console.log(timeElapsed, pspFile.isOpening, pspFile.name, name, musics.length, pspFile.getMusicsMetadata.length)
    //         if (pspFile.isOpened) {
    //           // self._win.webContents.send('offline-get-musics-request-ok', {musics: musics, plName: name})
    //           clearInterval(interval)
    //           // console.log('wtf')
    //         }
    //       }, 50)
    //     }
    //     else {
    //       // console.log('echec critique', plName)
    //       // self._win.webContents.send('offline-get-musics-request-ko')
    //       // reject()
    //     }
    //   // }).then(() => {
    //
    //   // })
    // }
    //
    // cancelSendMusicsRequest(plName: string): void {
    //   // this.emit('stop', {plName: plName})
    // }
    OfflineFeaturesHandler.prototype.reset = function () {
        for (var plName in this._pspFilesOpened) {
            if (this._pspFilesOpened[plName]._interval)
                // clearInterval(this._pspFilesOpened[plName]._interval)
                delete this._pspFilesOpened[plName];
            this._downloader = new music_downloader_1.MusicDownloader();
        }
    };
    return OfflineFeaturesHandler;
}(EventEmitter));
exports.OfflineFeaturesHandler = OfflineFeaturesHandler;
// pspFile._interval = setInterval(() => {
//   var music = musics[index]
//
//   if (music)
//     this._win.webContents.send('offline-music-metadata', {plName: pspFile.name, music: music})
//   index += 1
//   // console.log('i ->', index)
//   if (index >= musics.length) {
//     this._win.webContents.send('playlist-offline-mode-on-ok')
//     clearInterval(pspFile._interval)
//   }
// }, 1)
//# sourceMappingURL=offline-features-handler.js.map