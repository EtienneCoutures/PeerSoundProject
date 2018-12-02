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
var http_1 = require("@angular/common/http");
var login_service_1 = require("../login/login.service");
var appConfig_1 = require("../appConfig");
var Invitation = /** @class */ (function () {
    function Invitation() {
    }
    return Invitation;
}());
exports.Invitation = Invitation;
var PlaylistService = /** @class */ (function () {
    function PlaylistService(httpClient, loginService) {
        this.httpClient = httpClient;
        this.loginService = loginService;
        this.playlists = new Array();
        this.appConfig = new appConfig_1.AppConfig;
        this.baseUrl = this.appConfig.backend.urlBase;
        this.account = this.loginService.account;
        this.headers = new http_1.HttpHeaders({
            'Content-Type': 'application/json',
            'authorization': this.account.authorization
        });
    }
    PlaylistService.prototype.getPlaylistMusics = function (playlistId) {
        return this.httpClient.get(this.baseUrl + "/api/playlist/" + playlistId, { headers: this.headers });
    };
    PlaylistService.prototype.createPlaylist = function (pl) {
        pl.playlist_creator = this.account.usr_id;
        return this.httpClient.post(this.baseUrl + "/api/playlist/", pl, { headers: this.headers });
    };
    PlaylistService.prototype.inviteUser = function (invitation) {
        return this.httpClient.post(this.baseUrl + "/api/invitation", invitation, { headers: this.headers });
    };
    PlaylistService.prototype.getUserIdFromMail = function (mail) {
        /*this.params = new HttpParams().set('where'
                      , `{"usr_email":${mail.toString()}}`);*/
        return this.httpClient.get(this.baseUrl + "/api/user"
            + ("?where=%7B%22usr_email%22:%22" + mail.toString() + "%22%7D"), {
            params: this.params,
            headers: this.headers
        });
    };
    PlaylistService.prototype.getUserFromPlaylist = function (plId) {
        return this.httpClient.get(this.baseUrl + "/api/playlist/users/" + plId, { headers: this.headers });
    };
    PlaylistService.prototype.getMusicLinkFromMusicId = function (id) {
        return this.httpClient.get(this.baseUrl + "/api/musiclink"
            + ("?where=%7B%22music_id%22:%22" + id.toString() + "%22%7D"));
    };
    PlaylistService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [http_1.HttpClient,
            login_service_1.LoginService])
    ], PlaylistService);
    return PlaylistService;
}());
exports.PlaylistService = PlaylistService;
//# sourceMappingURL=playlist.service.js.map