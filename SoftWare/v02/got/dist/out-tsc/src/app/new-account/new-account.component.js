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
var login_service_1 = require("../login/login.service");
var userCredentials_1 = require("../login/userCredentials");
var router_1 = require("@angular/router");
var NewAccountComponent = /** @class */ (function () {
    function NewAccountComponent(loginService, router) {
        this.loginService = loginService;
        this.router = router;
    }
    NewAccountComponent.prototype.ngOnInit = function () {
        this.userCred = new userCredentials_1.userCredentials();
    };
    NewAccountComponent.prototype.ngOnDestroy = function () { };
    NewAccountComponent.prototype.isEmail = function (myVar) {
        var regEmail = new RegExp('^[0-9a-z._-]+@{1}[0-9a-z.-]{2,}[.]{1}[a-z]{2,5}$', 'i');
        return regEmail.test(myVar);
    };
    NewAccountComponent.prototype.createAccount = function () {
        var _this = this;
        if (!this.isEmail(this.userCred.login)) {
            this.error = "Veuillez vérifier l'adresse mail.";
            return;
        }
        if (this.verifyPassword === this.userCred.password) {
            this.sub = this.loginService.signup(this.userCred)
                .subscribe(function (res) {
                console.log('res: ', res);
                if (res.body.code === 0) {
                    _this.loginService.account = res.body.account;
                    _this.router.navigate(['home']);
                }
                else {
                    _this.error = "Cette adresse mail est déjà utilisée.";
                }
            }, function (error) { return console.log('error: ', error); });
        }
        else {
            this.error = "Les mots de passe ne correspondent pas.";
        }
    };
    NewAccountComponent.prototype.retour = function () {
        this.router.navigate(['']);
    };
    NewAccountComponent = __decorate([
        core_1.Component({
            selector: 'app-new-account',
            templateUrl: './new-account.component.html',
            styleUrls: ['./new-account.component.scss']
        }),
        __metadata("design:paramtypes", [login_service_1.LoginService,
            router_1.Router])
    ], NewAccountComponent);
    return NewAccountComponent;
}());
exports.NewAccountComponent = NewAccountComponent;
//# sourceMappingURL=new-account.component.js.map