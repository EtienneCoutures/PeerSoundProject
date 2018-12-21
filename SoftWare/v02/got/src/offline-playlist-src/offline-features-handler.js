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
var offline_playlist_1 = require("./offline-playlist");
var music_downloader_1 = require("./music-downloader");
var fs = require("fs");
var EventEmitter = require("events");
var OfflineFeaturesHandler = /** @class */ (function (_super) {
    __extends(OfflineFeaturesHandler, _super);
    // private _isOpeningFile: boolean = false
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
            var filename = 'tmp' + music.music_id;
            // filename = filename.replace(/- */g, '_')
            var isMusInFile = pspFile.getMusicMetadataByName(music.music_name).isInFile;
            var filepath = saveDirPath + filename + '.mp3';
            if (isMusInFile == 'false' || isMusInFile == false) {
                _this._downloader.dlLink2Mp3(saveDirPath, filename, music.music_url, music.music_source, music).then(function () {
                    var pos = pspFile.getMusicMetadataByName(music.music_name).pos; // pas opti !!!!
                    pspFile.addMusicFile(filepath, pos, music.music_name, false).then(function () {
                        pspFile.save().then(function () {
                            fs.unlink(filepath, function (err) {
                                if (err)
                                    throw new Error(err);
                            });
                        }, function (err) {
                            // console.log(err)
                            throw new Error(err);
                        });
                    }, function (err) {
                        // console.log(err)
                        throw new Error(err);
                    });
                }, function (err) {
                    // this.win.webContents.send('set-dl-status', 'dl failed')
                    // console.log(err)
                    throw new Error(err);
                });
            }
            else {
                // console.log('???')
                // fs.unlink(filepath, () => {}) // del mp3 file
            }
        }, function (err) {
            // console.log('??? ->', err)
            // this.win.webContents.send('set-dl-status', 'dl failed ')
            throw new Error(err);
        });
    };
    OfflineFeaturesHandler.prototype.getPspFile = function (name) {
        // var file = null
        if (!this._pspFilesOpened.hasOwnProperty(name)) {
            // console.log('add new psp file to opened list')
            this._pspFilesOpened[name] = new offline_playlist_1.OfflinePlaylist();
        }
        // else
        //   console.log('get psp file ', this._pspFilesOpened[name].name)
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
                    pspFile.header.addMusic('', i, m.music_name, false);
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
            var pos = pspFile.getMusicMetadataByName(music.music_name).pos; // pas opti !!!!
            pspFile.extractMusicFile('./', pos, 'tmp').then(function () {
                resolve();
            }, function (e) {
                reject(e);
            });
        });
    };
    OfflineFeaturesHandler.prototype.reset = function () {
        this._pspFilesOpened.length = 0;
        this._downloader = new music_downloader_1.MusicDownloader();
    };
    return OfflineFeaturesHandler;
}(EventEmitter));
exports.OfflineFeaturesHandler = OfflineFeaturesHandler;
//# sourceMappingURL=offline-features-handler.js.map