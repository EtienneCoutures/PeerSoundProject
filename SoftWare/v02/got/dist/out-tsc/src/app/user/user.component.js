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
var account_1 = require("../account");
var playlist_service_1 = require("../playlist/playlist.service");
var UserComponent = /** @class */ (function () {
    function UserComponent(plService) {
        this.plService = plService;
        this.show = false;
    }
    UserComponent.prototype.ngOnInit = function () { };
    UserComponent.prototype.userOptions = function () {
    };
    UserComponent.prototype.onToggle = function () {
        this.show = !this.show;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", account_1.Account)
    ], UserComponent.prototype, "user", void 0);
    UserComponent = __decorate([
        core_1.Component({
            selector: 'app-user',
            templateUrl: './user.component.html',
            styleUrls: ['./user.component.scss']
        }),
        __metadata("design:paramtypes", [playlist_service_1.PlaylistService])
    ], UserComponent);
    return UserComponent;
}());
exports.UserComponent = UserComponent;
//# sourceMappingURL=user.component.js.map