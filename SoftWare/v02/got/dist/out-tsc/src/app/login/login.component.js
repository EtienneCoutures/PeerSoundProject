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
var login_service_1 = require("./login.service");
var router_1 = require("@angular/router");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(loginService, router) {
        this.loginService = loginService;
        this.router = router;
        this.userCred = { login: 'klu@gmail.com', password: 'klu' }; // !!!!!!!!!!!!!!!
    }
    LoginComponent.prototype.ngOnInit = function () {
        // this.userCred = new userCredentials();
    };
    LoginComponent.prototype.ngOnDestroy = function () {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    };
    LoginComponent.prototype.isEmail = function (myVar) {
        var regEmail = new RegExp('^[0-9a-z._-]+@{1}[0-9a-z.-]{2,}[.]{1}[a-z]{2,5}$', 'i');
        return regEmail.test(myVar);
    };
    LoginComponent.prototype.submit = function () {
        var _this = this;
        if (!this.isEmail(this.userCred.login)) {
            this.error = "Adresse mail invalide.";
            return;
        }
        this.sub = this.loginService.login(this.userCred).subscribe(function (res) {
            _this.data = res.body;
            if (_this.data.code != 0) {
                _this.error = _this.data.errors[0] ? _this.data.errors[0].message
                    : _this.data.info.message;
            }
            else {
                _this.loginService.account = _this.data.account;
                _this.loginService.account.authorization = res.headers.get('authorization');
                _this.router.navigate(['home']);
            }
        }, function (error) { return console.log('Login request error: ', error); });
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.scss']
        }),
        __metadata("design:paramtypes", [login_service_1.LoginService,
            router_1.Router])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map