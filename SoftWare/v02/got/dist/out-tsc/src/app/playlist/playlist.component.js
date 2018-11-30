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
var playlist_1 = require("./playlist");
var playlist_service_1 = require("./playlist.service");
var router_1 = require("@angular/router");
var PlaylistComponent = /** @class */ (function () {
    function PlaylistComponent(playlistService, router) {
        this.playlistService = playlistService;
        this.router = router;
        this.isSelected = false;
    }
    PlaylistComponent.prototype.ngOnInit = function () {
        this.navigationExtras = { queryParams: this.playlist };
        console.log('im creating a playlist: ', this.playlist);
        this.playlistService.getPlaylistMusics(this.playlist.playlist_id)
            .subscribe(function (musics) {
            console.log('musics: ', musics);
        }, function (error) { return console.log('error while retrieving musics: ', error); });
    };
    PlaylistComponent.prototype.ngOnDestroy = function () { };
    PlaylistComponent.prototype.selectPlaylist = function () {
        //this.router.navigate([{ outlets: { homeOutlet: ['infoPlaylist'] } }]);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", playlist_1.Playlist)
    ], PlaylistComponent.prototype, "playlist", void 0);
    PlaylistComponent = __decorate([
        core_1.Component({
            selector: 'app-playlist',
            templateUrl: './playlist.component.html',
            styleUrls: ['./playlist.component.scss']
        }),
        __metadata("design:paramtypes", [playlist_service_1.PlaylistService,
            router_1.Router])
    ], PlaylistComponent);
    return PlaylistComponent;
}());
exports.PlaylistComponent = PlaylistComponent;
//# sourceMappingURL=playlist.component.js.map