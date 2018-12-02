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
var http_2 = require("@angular/common/http");
var httpOptions = {
    headers: new http_2.HttpHeaders({
        'Content-Type': 'application/json',
    }),
};
var LoginService = /** @class */ (function () {
    function LoginService(httpClient) {
        this.httpClient = httpClient;
        this.baseUrl = "http://localhost:8000/"; //AppConfig.backend.baseUrl;
        this.path = 'auth/login';
    }
    LoginService.prototype.login = function (userCred) {
        return this.httpClient
            .post(this.baseUrl + 'api/auth/login', userCred, { observe: 'response' });
    };
    LoginService.prototype.signup = function (userCred) {
        return this.httpClient
            .post(this.baseUrl + 'signup', userCred, { observe: 'response' });
    };
    var _a;
    LoginService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof http_1.HttpClient !== "undefined" && http_1.HttpClient) === "function" ? _a : Object])
    ], LoginService);
    return LoginService;
}());
exports.LoginService = LoginService;
//# sourceMappingURL=login.service.js.map