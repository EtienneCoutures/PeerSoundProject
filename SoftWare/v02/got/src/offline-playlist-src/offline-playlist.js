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
var offline_playlist_header_1 = require("./offline-playlist-header");
var Const = require("./constants");
var Zip = require("jszip");
var fs = require("fs");
var path = require("path");
var EventEmitter = require("events");
var OfflinePlaylist = /** @class */ (function (_super) {
    __extends(OfflinePlaylist, _super);
    function OfflinePlaylist() {
        var _this = _super.call(this) || this;
        _this._zip = new Zip();
        _this._header = new offline_playlist_header_1.OfflinePlaylistHeader();
        _this._filepath = '';
        _this._musicFolderName = 'musics/';
        _this._isOpening = false;
        _this._isOpened = false;
        _this._interval = null;
        return _this;
    }
    OfflinePlaylist.prototype.genMusFilename = function (len) {
        var res = '', possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < len; i++)
            res += possible.charAt(Math.floor(Math.random() * possible.length));
        return res;
    };
    OfflinePlaylist.prototype.isFileExtOk = function (ext) {
        return Const.VALEXT.find(function (validExt) {
            return ext == ('.' + validExt);
        });
    };
    OfflinePlaylist.prototype.create = function (filepath, playlistName) {
        this._filepath = filepath;
        this._header.name = playlistName;
    };
    OfflinePlaylist.prototype.open = function (dest, filename, autocreate) {
        var _this = this;
        if (autocreate === void 0) { autocreate = false; }
        this._isOpening = true;
        return new Promise(function (resolve, reject) {
            _this.processOpening(dest, filename, autocreate).then(function () {
                _this._isOpened = true;
                _this._isOpening = false;
                resolve();
            }, function (err) {
                _this._isOpened = _this._isOpening = false;
                reject(err);
            });
        });
    };
    OfflinePlaylist.prototype.processOpening = function (dest, filename, autocreate) {
        var _this = this;
        if (autocreate === void 0) { autocreate = false; }
        return new Promise(function (resolve, reject) {
            var self = _this;
            var filepath = '';
            var ext = path.extname(filename).toLowerCase();
            var basename = path.basename(filename, ext);
            if (basename == '')
                reject('Name given is empty');
            if (ext == '') // if no file extention given -> add default one
                ext = '.' + Const.FILEXT;
            filepath = dest + basename + ext;
            if (filepath === self._filepath) { // if file already open -> resolve
                resolve('file already opened');
            }
            if (!self.isFileExtOk(ext)) // check file extention
                reject('Can\'t open file : File extention must be .' + Const.FILEXT + ' !');
            if (!fs.existsSync(filepath)) { // if file doesn't exist
                if (autocreate) { // if param given -> auto-create new file & resolve
                    self.create(filepath, basename);
                    resolve();
                }
                else { // file not found
                    reject('No such file, open \'' + filepath + '\'');
                }
            }
            fs.readFile(filepath, function (err, data) {
                if (err)
                    reject(err);
                Zip.loadAsync(data).then(function (zip) {
                    self._zip = zip;
                    if (!self._zip.file('header.xml'))
                        reject('File corrupted : Header missing !');
                    self._zip.file('header.xml').async('string').then(function (data) {
                        self._filepath = filepath;
                        self._header.clear();
                        // setTimeout(() => {
                        self._header.load(data).then(function () {
                            resolve();
                        }, function (err) {
                            reject('File corrupted : ' + err);
                        });
                        // }, 3000)
                    }, function (err) {
                        reject(err);
                    });
                }, function (err) {
                    reject(err);
                });
            });
        });
    };
    OfflinePlaylist.prototype.save = function () {
        var self = this;
        return new Promise(function (resolve, reject) {
            // if (!self._header.changes) // rien a été modifié
            //   resolve()
            if (self._filepath) {
                self._zip.file('header.xml', self._header.toString()); // add header
                self._zip.generateNodeStream({ streamFiles: true }, function progress(metadata) {
                    self.emit('psp-packing', metadata.percent);
                }).pipe(fs.createWriteStream(self._filepath)).on('finish', function () {
                    resolve();
                }).on('error', function (err) {
                    // ici backup de la file en cas d'echec
                    reject(err);
                });
            }
            else {
                reject('No .' + Const.FILEXT + ' file loaded yet : Use create(filepath, playlistName) or open(filepath [, autocreate]) first !');
            }
        });
    };
    OfflinePlaylist.prototype.deleteFile = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!_this._filepath)
                reject('deleteFile failed : No opened file');
            fs.unlink(_this._filepath, function (err) {
                if (err)
                    reject(err);
                resolve();
            });
        });
    };
    OfflinePlaylist.prototype.addMusicFile = function (filepath, pos, name, insert) {
        if (insert === void 0) { insert = true; }
        var filename = this.genMusFilename(10) + path.extname(filepath), self = this;
        return new Promise(function (resolve, reject) {
            var contentPromise = new Zip.external.Promise(function (resolve, reject) {
                fs.readFile(filepath, function (err, data) {
                    if (err)
                        reject(err);
                    if (self._header.addMusic(filename, pos, name, insert, true) == false) {
                        if (self._header.getMusicByPos(pos)._isInFile == 'false') {
                            self._header.getMusicByPos(pos).isInFile = true;
                            self._header.getMusicByPos(pos).filename = filename;
                        }
                        else {
                            reject('Can\'t add music "' + name + '" : Already in the playlist !');
                        }
                    }
                    resolve(data);
                });
            });
            contentPromise.then(function (data) {
                self._zip.folder(self._musicFolderName).file(filename, data);
                resolve();
            }, function (err) {
                reject(err);
            });
        });
    };
    OfflinePlaylist.prototype.extractMusicFile = function (filepath, pos, outputName) {
        var _this = this;
        if (outputName === void 0) { outputName = null; }
        var metadata = this._header.getMusicByPos(pos), self = this;
        return new Promise(function (resolve, reject) {
            if (outputName && path.extname(outputName) === '') // if no extention on given output name -> add default one
                outputName = outputName + path.extname(metadata.filename);
            outputName = outputName || metadata.filename;
            self._zip.folder(_this._musicFolderName).file(metadata.filename).async('nodebuffer').then(function (data) {
                fs.writeFile(filepath + outputName, data, function (err) {
                    if (err)
                        reject(err);
                    resolve(metadata.filename);
                });
            }, function (err) {
                reject(err);
            });
        });
    };
    OfflinePlaylist.prototype.delMusicByPos = function (pos) {
        var music = this._header.getMusicByPos(pos);
        if (music)
            this._zip.remove(this._musicFolderName + music.filename);
        this._header.delMusicByPos(pos);
    };
    OfflinePlaylist.prototype.delMusicByName = function (name) {
        var music = this._header.getMusicByName(name);
        if (music)
            this._zip.remove(this._musicFolderName + music.filename);
        this._header.delMusicByName(name);
    };
    OfflinePlaylist.prototype.setMusicPos = function (curPos, newPos) {
        this._header.setMusicPos(curPos, newPos);
    };
    OfflinePlaylist.prototype.getMusicMetadataByPos = function (pos) {
        return this._header.getMusicByPos(pos);
    };
    OfflinePlaylist.prototype.getMusicMetadataByName = function (name) {
        return this._header.getMusicByName(name);
    };
    OfflinePlaylist.prototype.getMusicsMetadata = function (from, to) {
        if (from === void 0) { from = 0; }
        if (to === void 0) { to = null; }
        return this._header.getMusics(from, to);
    };
    Object.defineProperty(OfflinePlaylist.prototype, "name", {
        get: function () {
            return this._header.name;
        },
        set: function (val) {
            this._header.name = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OfflinePlaylist.prototype, "header", {
        get: function () {
            return this._header;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OfflinePlaylist.prototype, "isOpening", {
        get: function () {
            return this._isOpening;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OfflinePlaylist.prototype, "isOpened", {
        get: function () {
            return this._isOpened;
        },
        enumerable: true,
        configurable: true
    });
    return OfflinePlaylist;
}(EventEmitter));
exports.OfflinePlaylist = OfflinePlaylist;
//# sourceMappingURL=offline-playlist.js.map