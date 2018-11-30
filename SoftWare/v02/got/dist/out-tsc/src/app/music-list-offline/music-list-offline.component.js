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
var electron_service_1 = require("../providers/electron.service");
var playlist_1 = require("../playlist/playlist");
var offline_features_service_1 = require("../offline-features.service");
var MusicListOfflineComponent = /** @class */ (function () {
    function MusicListOfflineComponent(electronService, offlineService) {
        this.electronService = electronService;
        this.offlineService = offlineService;
        this.playlist = null;
    }
    MusicListOfflineComponent.prototype.ngOnInit = function () {
        // console.log('cul', 'offline component onInit')
    };
    MusicListOfflineComponent.prototype.ngOnChanges = function () {
        console.log('cul', 'offline component OnChanges');
        this.loadMusicsFromPspFile();
    };
    MusicListOfflineComponent.prototype.loadMusicsFromPspFile = function () {
        this.offlineService.getMusicsRequest(this.playlist.playlist_name);
    };
    MusicListOfflineComponent.prototype.dlMusic = function (music) {
        this.offlineService.dlMusic(music);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", playlist_1.Playlist)
    ], MusicListOfflineComponent.prototype, "playlist", void 0);
    MusicListOfflineComponent = __decorate([
        core_1.Component({
            selector: 'app-music-list-offline',
            templateUrl: './music-list-offline.component.html',
            styleUrls: ['./music-list-offline.component.scss']
        }),
        __metadata("design:paramtypes", [electron_service_1.ElectronService, offline_features_service_1.OfflineFeaturesService])
    ], MusicListOfflineComponent);
    return MusicListOfflineComponent;
}());
exports.MusicListOfflineComponent = MusicListOfflineComponent;
//# sourceMappingURL=music-list-offline.component.js.map