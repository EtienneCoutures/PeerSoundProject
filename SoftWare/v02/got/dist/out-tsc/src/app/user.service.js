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
var login_service_1 = require("./login/login.service");
var appConfig_1 = require("./appConfig");
var UserService = /** @class */ (function () {
    function UserService(httpClient, loginService) {
        // console.log('this.loginService.account: ', this.loginService.account.authorization);
        this.httpClient = httpClient;
        this.loginService = loginService;
        this.events = new Array();
        this.appConfig = new appConfig_1.AppConfig;
        this.baseUrl = this.appConfig.backend.urlBase;
        this.headers = new http_1.HttpHeaders({
            'Content-Type': 'application/json',
            'authorization': this.loginService.account.authorization
        });
    }
    UserService.prototype.getUserPlaylists = function (userId) {
        this.params = new http_1.HttpParams().set('where', "{\"playlist_creator\":" + this.loginService.account.usr_id.toString() + "}");
        console.log('HEADERS: ', this.headers);
        console.log('params: ', this.params);
        return this.httpClient.get(this.baseUrl + "/api/playlist/", { params: this.params, headers: this.headers });
    };
    UserService.prototype.getAllUserPlaylist = function (userId) {
        return this.httpClient.get(this.baseUrl + "/api/subscription/", { headers: this.headers });
    };
    UserService.prototype.getInvitations = function (userId) {
        console.log('this.loginService.account: ', this.loginService.account.usr_id);
        this.params = new http_1.HttpParams().set('where', "{\"invited_usr_id\":" + this.loginService.account.usr_id.toString() + "}");
        return this.httpClient.get(this.baseUrl + "/api/invitation", {
            params: this.params,
            headers: this.headers
        });
    };
    UserService.prototype.deleteInvitation = function (invitation_id) {
        return this.httpClient.delete(this.baseUrl + "/api/invitation/" + invitation_id, { headers: this.headers });
    };
    UserService.prototype.acceptInvitation = function (usr_id, pl_id) {
        return this.httpClient.post(this.baseUrl + "/api/subscription", { usr_id: usr_id, playlist_id: pl_id }, { headers: this.headers });
    };
    UserService.prototype.getSubscription = function () {
        this.params = new http_1.HttpParams().set('where', "{\"usr_id\":" + this.loginService.account.usr_id.toString() + "}");
        return this.httpClient.get(this.baseUrl + "/api/subscription", { params: this.params, headers: this.headers });
    };
    UserService.prototype.getUserIdFromMail = function (mail) {
        this.params = new http_1.HttpParams().set('where', "{\"usr_email\":" + this.loginService.account.usr_email.toString() + "}");
        return this.httpClient.get(this.baseUrl + "/api/user", {
            params: this.params,
            headers: this.headers
        });
    };
    UserService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [http_1.HttpClient,
            login_service_1.LoginService])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map