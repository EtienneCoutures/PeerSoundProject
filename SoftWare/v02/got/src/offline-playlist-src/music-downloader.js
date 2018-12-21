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
var yturl = require("js-video-url-parser");
var dataurl = require('dataurl');
var YoutubeMp3Downloader = require("youtube-mp3-downloader");
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
    MusicDownloader.prototype.dlLink2Mp3 = function (dest, filename, url, platform, music) {
        if (platform == 'youtube')
            return this.dlFromYoutube2Mp3(dest, filename, url, music);
        else if (platform == 'soundcloud')
            return this.dlFromSoundCloud2Mp3(dest, filename, url, music);
        else {
            // return this.dlFromYoutube2Mp3(dest, filename, url)
            return new Promise(function (resolve, reject) {
                reject('t\'a cru ct noel');
            });
        }
    };
    MusicDownloader.prototype.dlFromYoutube2Mp3 = function (dest, filename, url, music) {
        var self = this;
        var url = 'http://www.youtube.com/watch?v=' + yturl.parse(url).id;
        return new Promise(function (resolve, reject) {
            var YD = new YoutubeMp3Downloader({
                "ffmpegPath": "./ffmpeg/bin/ffmpeg.exe",
                "outputPath": "./",
                "youtubeVideoQuality": "highest",
                "queueParallelism": 2,
                "progressTimeout": 200 // How long should be the interval of the progress reports
            });
            YD.download(yturl.parse(url).id, filename + '.mp3');
            self.emit('dl-status-update', { update: 'dl-start', url: url, music: music });
            YD.on("finished", function (err, data) {
                self.emit('dl-status-update', { update: 'dl-end', url: url, music: music });
                resolve();
            });
            YD.on("error", function (error) {
                reject(error);
            });
            YD.on("progress", function (data) {
                self.emit('dl-status-update', { update: 'dl-progress', progress: data.progress.percentage, url: url, music: music });
            });
        });
    };
    MusicDownloader.prototype.dlFromSoundCloud2Mp3 = function (dest, filename, url, music) {
        var self = this;
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
                            if (data.errors)
                                reject(data.errors[0].error_message);
                            var item = { id: data.id, stream_url: data.stream_url, artwork_url: data.artwork_url,
                                title: data.title, artist: (data.user ? data.user.username : 'unknown') };
                            if (item.stream_url == undefined) {
                                reject('url pointing to redirecting to artist instead of a specific music');
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
                                        self.emit('dl-status-update', { update: 'dl-start', url: url, music: music });
                                        res.on('data', function (chunk) {
                                            received_bytes += chunk.length;
                                            output.write(chunk);
                                            var progress = received_bytes * 100 / total_bytes;
                                            self.emit('dl-status-update', { update: 'dl-progress', progress: progress, url: url, music: music });
                                        });
                                        res.on('end', function () {
                                            output.end();
                                            ID3.removeTags(output_filename);
                                            var meta_written = ID3.write({ artist: item.artist, title: item.title, album: '' });
                                            if (meta_written) {
                                                self.emit('dl-status-update', { update: 'dl-end', url: url, music: music });
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
    MusicDownloader.prototype.dlFromYoutube2Mp3Ytdl = function (dest, filename, url, music) {
        var self = this;
        var url = 'http://www.youtube.com/watch?v=' + yturl.parse(url).id;
        return new Promise(function (resolve, reject) {
            var r = ytdl(url, { filter: 'audioonly', quality: 'highestaudio' });
            var w = fs.createWriteStream(dest + filename + '.mp3');
            r.on('readable', function () {
                self.emit('dl-status-update', { update: 'dl-start', url: url, music: music });
            });
            r.on('progress', function (chunck, received_bytes, total_bytes) {
                var progress = received_bytes * 100 / total_bytes;
                self.emit('dl-status-update', { update: 'dl-progress', progress: progress, url: url, music: music });
            });
            r.on('end', function () {
                // console.log('read end')
            });
            w.on('finish', function () {
                // console.log('write end')
                self.emit('dl-status-update', { update: 'dl-end', url: url, music: music });
                resolve();
            });
            r.pipe(w);
        });
    };
    return MusicDownloader;
}(EventEmitter));
exports.MusicDownloader = MusicDownloader;
//# sourceMappingURL=music-downloader.js.map