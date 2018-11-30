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
var music_1 = require("./music");
var playlist_service_1 = require("../playlist/playlist.service");
var MusicComponent = /** @class */ (function () {
    function MusicComponent(plService) {
        this.plService = plService;
        this.isPlaying = false;
        //this.isPlaying = this.plService.isPlaying;
        //this.selectedMusic = this.plService.selectedMusic;
    }
    MusicComponent.prototype.isSelected = function () {
        return this.music === this.plService.selectedMusic;
    };
    MusicComponent.prototype.ngOnInit = function () {
        console.log('i construct a music:', this.music);
    };
    MusicComponent.prototype.clickMusic = function () {
        console.log('click music');
        //    this.selectedMusic = this.music;
        //this.isPlaying = !this.isPlaying;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", music_1.Music)
    ], MusicComponent.prototype, "music", void 0);
    MusicComponent = __decorate([
        core_1.Component({
            selector: 'app-music',
            templateUrl: './music.component.html',
            styleUrls: ['./music.component.scss']
        }),
        __metadata("design:paramtypes", [playlist_service_1.PlaylistService])
    ], MusicComponent);
    return MusicComponent;
}());
exports.MusicComponent = MusicComponent;
//# sourceMappingURL=music.component.js.map