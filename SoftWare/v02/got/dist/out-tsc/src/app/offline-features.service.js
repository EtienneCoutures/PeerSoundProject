"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var electron_service_1 = require("./providers/electron.service");
var playlist_service_1 = require("./playlist/playlist.service");
var music_1 = require("./music/music");
var OfflineFeaturesService = /** @class */ (function () {
    function OfflineFeaturesService(electronService, plService) {
        var _this = this;
        this.electronService = electronService;
        this.plService = plService;
        this.isOfflineModeOn = false;
        // isPlaylistOpened: boolean = false
        // isPlaylistOpening: boolean = false
        // isPlaylistLoaded: boolean = false
        // isPlaylistLoading: boolean = false
        this.musics = [];
        this.ipcRenderer = electronService.ipcRenderer;
        this.ipcRenderer.on('offline-load-playlist-ok', function (event, data) {
            // console.log('cul offline-load-playlist-ok')
        });
        this.ipcRenderer.on('offline-get-musics-request-ok', function (event, data) {
            _this.musics.length = 0;
            if (data.plName != plService.selectedPl.playlist_name) {
                // this.cancelMusicsLoading(data.plName)
                // console.log('cul c\'est quoi ce bordel', data.plName)
            }
            else {
                // if (plService.musics) {
                //   plService.musics.forEach((mus) => {
                //
                //   })
            }
            // console.log('cul offline-get-musics-request-ok', data.plName)
            // console.log('cul ', data.musics)
            // var res = plService.musics.find((elem): boolean => {
            // console.log(plService.selectedPl.MusicLink[0].Music.music_url)
            //   return (true)
            // })
            console.log('cul data', data.musics);
            data.musics.forEach(function (music) {
                // if (plService.selectedPl) {
                var url = plService.selectedPl.MusicLink.find(function (elem) {
                    return elem.Music.music_name === music._name;
                }).Music.music_url;
                if (url) {
                    _this.musics.push(new music_1.Music(music, url));
                }
            });
        });
        this.ipcRenderer.on('dl-status-update', function (event, data) {
            console.log('cul dl-status-update', data);
            if (data.update == 'dl-start') {
                var mus = _this.musics.find(function (elem) {
                    return elem.music_url == data.url;
                });
                if (mus)
                    mus.isDownloading = true;
            }
            if (data.update == 'dl-progress') {
                var mus = _this.musics.find(function (elem) {
                    return elem.music_url == data.url;
                });
                if (mus && Math.round(data.progress) != mus.dlProgress)
                    mus.dlProgress = Math.round(data.progress);
            }
            if (data.update == 'dl-end') {
                var mus = _this.musics.find(function (elem) {
                    return elem.music_url == data.url;
                });
                if (mus) {
                    mus.isOfflineAvailable = true;
                    mus.isDownloading = false;
                }
            }
        });
        this.ipcRenderer.on('offline-get-musics-request-ko', function (event, data) {
            // console.log('cul offline-get-musics-request-ko')
            _this.musics.length = 0;
        });
    }
    OfflineFeaturesService.prototype.loadPspFile = function (pl) {
        // console.log('cul load new playlist')
        this.musics.length = 0;
        this.ipcRenderer.send('offline-load-playlist', { pl: pl });
    };
    OfflineFeaturesService.prototype.getMusicsRequest = function (plName) {
        this.ipcRenderer.send('offline-get-musics-request', { plName: plName });
    };
    OfflineFeaturesService.prototype.cancelMusicsLoading = function (plName) {
        this.ipcRenderer.send('offline-cancel-musics-loading', { plName: plName });
    };
    OfflineFeaturesService.prototype.dlMusic = function (music) {
        console.log('cul dl music', music);
        this.ipcRenderer.send('offline-dl-music', { plName: this.plService.selectedPl.playlist_name, music: music });
    };
    OfflineFeaturesService.prototype.reset = function () {
        this.ipcRenderer.send('offline-reset');
        this.musics.length = 0;
    };
    OfflineFeaturesService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [electron_service_1.ElectronService, playlist_service_1.PlaylistService])
    ], OfflineFeaturesService);
    return OfflineFeaturesService;
}());
exports.OfflineFeaturesService = OfflineFeaturesService;
//# sourceMappingURL=offline-features.service.js.map