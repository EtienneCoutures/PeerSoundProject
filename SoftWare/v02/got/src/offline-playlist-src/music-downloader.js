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
var electron = require("electron");
var https = require("https");
var fs = require("fs");
var ID3 = require("node-id3");
var request = require("request");
var EventEmitter = require("events");
var ytdl = require('ytdl-core');
var MusicDownloader = /** @class */ (function (_super) {
    __extends(MusicDownloader, _super);
    function MusicDownloader() {
        var _this = _super.call(this) || this;
        _this._scKey = 'nYw8DGbKym7Ph6LR1EaSxD8Dmj5rkCwa';
        _this._ytKey = null;
        _this.bool = false;
        return _this;
    }
    MusicDownloader.prototype.pickSaveDirectory = function (name) {
        if (name === void 0) { name = null; }
        return electron.dialog.showSaveDialog({
            title: 'Select a location to save your MP3',
            defaultPath: name
        });
    };
    MusicDownloader.prototype.dlLink2Mp3 = function (dest, filename, url) {
        return new Promise(function (resolve, reject) {
        });
    };
    MusicDownloader.prototype.dlFromYoutube2Mp3 = function (dest, filename, url) {
        return new Promise(function (resolve, reject) {
            var rstream = ytdl('http://www.youtube.com/watch?v=A02s8omM_hI', { filter: 'audioonly', quality: 'highestaudio' });
            rstream.on('readable', function () {
                var data;
                while (data = this.read()) {
                    console.log('cul', data);
                }
            });
            rstream.on('error', function () {
                reject();
            });
            rstream.on('end', function () {
                var wstream = fs.createWriteStream('');
                rstream.pipe(wstream);
            });
        });
    };
    MusicDownloader.prototype.dlFromSoundCloud2Mp3 = function (dest, filename, url) {
        var self = this;
        // console.log('from downloader: ', dest + filename + '.mp3', url)
        // console.log('url', url)
        return new Promise(function (resolve, reject) {
            https.get('https://api.soundcloud.com/resolve?url=' + url + '&client_id=' + self._scKey, function (res) {
                res.on('data', function (data) {
                    data = JSON.parse(data);
                    if (data.errors)
                        reject(data.errors[0].error_message);
                    var redirect = data.location;
                    https.get(redirect, function (res) {
                        res.on('data', function (data) {
                            data = JSON.parse(data);
                            // console.log('data', data)
                            if (data.errors)
                                reject(data.errors[0].error_message);
                            // console.log("cul", data)
                            var item = { id: data.id, stream_url: data.stream_url, artwork_url: data.artwork_url,
                                title: data.title, artist: (data.user ? data.user.username : 'unknown') };
                            // console.log('->', item)
                            if (item.stream_url == undefined) {
                                reject('url pointing to redirecting to artist instead of a specific music');
                                // item.stream_url = 'https://api.soundcloud.com/tracks/' + item.id + '/stream'
                                // console.log('->', item.stream_url)
                            }
                            https.get(item.stream_url + '?client_id=' + self._scKey, function (res) {
                                console.log(res);
                                console.log(res.headers);
                                var output_filename = dest + filename + '.mp3', redirect = res.headers.location, received_bytes = 0, total_bytes = 0;
                                request.head(redirect, function (err, res, body) {
                                    total_bytes = parseInt(res.headers['content-length']);
                                    // err -> del file ?
                                    https.get(redirect, function (res) {
                                        var output = fs.createWriteStream(output_filename);
                                        self.emit('dl-status-update', { update: 'dl-start', url: url });
                                        res.on('data', function (chunk) {
                                            received_bytes += chunk.length;
                                            output.write(chunk);
                                            var progress = received_bytes * 100 / total_bytes;
                                            // if (progress > 5 && !this.bool) {
                                            //   this.bool = true
                                            //   reject('blabla')
                                            // }
                                            self.emit('dl-status-update', { update: 'dl-progress', progress: progress, url: url });
                                        });
                                        res.on('end', function () {
                                            output.end();
                                            ID3.removeTags(output_filename);
                                            var meta_written = ID3.write({ artist: item.artist, title: item.title, album: '' });
                                            if (meta_written) {
                                                self.emit('dl-status-update', { update: 'dl-end', url: url });
                                                resolve();
                                            }
                                        });
                                    }).on('error', function (err) {
                                        // err -> del file ?
                                        reject(err);
                                    });
                                });
                            }).on('error', function (e) {
                                console.error(e);
                                reject(e);
                            });
                        });
                    }).on('error', function (error) {
                        reject(error);
                    });
                    ;
                });
            }).on('error', function (error) {
                reject(error);
            });
        });
    };
    return MusicDownloader;
}(EventEmitter));
exports.MusicDownloader = MusicDownloader;
//# sourceMappingURL=music-downloader.js.map