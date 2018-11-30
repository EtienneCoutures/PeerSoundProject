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
var playlist_service_1 = require("../playlist/playlist.service");
var playlist_1 = require("../playlist/playlist");
var offline_features_service_1 = require("../offline-features.service");
var MusicListPanelComponent = /** @class */ (function () {
    function MusicListPanelComponent(plService, offlineService) {
        this.plService = plService;
        this.offlineService = offlineService;
        this.playMusic = new core_1.EventEmitter();
        this.isOffline = false;
        this.ipcRenderer = null;
    }
    MusicListPanelComponent.prototype.ngOnInit = function () {
        // console.log('cul music panel oninit')
    };
    MusicListPanelComponent.prototype.ngOnChanges = function (changes) {
        // console.log('cul changes', changes)
        // if new playlist opened -> load & update its associated psp file
        var prevPlaylist = null;
        var currPlaylist = null;
        if (changes.playlist) {
            prevPlaylist = changes.playlist.previousValue;
            currPlaylist = changes.playlist.currentValue;
        }
        if (currPlaylist && (prevPlaylist == null || prevPlaylist.playlist_name !== currPlaylist.playlist_name)) {
            this.offlineService.loadPspFile(currPlaylist);
            // if offline mode activated on playlist change, load its offline musics
            // if (this.isOffline) {
            //   this.offlineService.loadMusics(this.playlist.playlist_name)
            // }
        }
    };
    MusicListPanelComponent.prototype.dlFullPlaylist = function () {
    };
    MusicListPanelComponent.prototype.playMusicEvent = function (music) {
        this.playMusic.emit(music);
    };
    MusicListPanelComponent.prototype.switchConModeEvent = function (isOffline) {
        this.isOffline = isOffline;
        // if (this.isOffline) {
        //   this.offlineService.loadMusics(this.playlist.playlist_name)
        // }
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], MusicListPanelComponent.prototype, "playMusic", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", playlist_1.Playlist)
    ], MusicListPanelComponent.prototype, "playlist", void 0);
    MusicListPanelComponent = __decorate([
        core_1.Component({
            selector: 'app-music-list-panel',
            templateUrl: './music-list-panel.component.html',
            styleUrls: ['./music-list-panel.component.scss']
        }),
        __metadata("design:paramtypes", [playlist_service_1.PlaylistService,
            offline_features_service_1.OfflineFeaturesService])
    ], MusicListPanelComponent);
    return MusicListPanelComponent;
}());
exports.MusicListPanelComponent = MusicListPanelComponent;
//# sourceMappingURL=music-list-panel.component.js.map