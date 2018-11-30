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
var MusicListComponent = /** @class */ (function () {
    function MusicListComponent(plService) {
        this.plService = plService;
        this.playMusic = new core_1.EventEmitter();
    }
    MusicListComponent.prototype.ngOnInit = function () {
    };
    MusicListComponent.prototype.ngOnChanges = function () {
        console.log("musics music list: ", this.musics);
        console.log("musics music list: ", this.plService.selectedPl);
    };
    MusicListComponent.prototype.trackElement = function (index, element) {
        return element ? element.guid : null;
    };
    MusicListComponent.prototype.playMusicEvent = function (music, idx) {
        if (this.plService.selectedMusic !== music) {
            this.plService.isPlaying = true;
            this.playMusic.emit(music);
            this.plService.selectedMusic = music;
        }
        else {
            this.plService.isPlaying = !this.plService.isPlaying;
            this.playMusic.emit(music);
        }
        console.log('play music: ', music);
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], MusicListComponent.prototype, "playMusic", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], MusicListComponent.prototype, "musics", void 0);
    MusicListComponent = __decorate([
        core_1.Component({
            selector: 'app-music-list',
            templateUrl: './music-list.component.html',
            styleUrls: ['./music-list.component.scss']
        }),
        __metadata("design:paramtypes", [playlist_service_1.PlaylistService])
    ], MusicListComponent);
    return MusicListComponent;
}());
exports.MusicListComponent = MusicListComponent;
//# sourceMappingURL=music-list.component.js.map