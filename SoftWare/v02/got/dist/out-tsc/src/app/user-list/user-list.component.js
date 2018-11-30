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
var playlist_1 = require("../playlist/playlist");
var UserListComponent = /** @class */ (function () {
    function UserListComponent(plService) {
        this.plService = plService;
        this.users = new Array();
    }
    UserListComponent.prototype.ngOnInit = function () {
    };
    UserListComponent.prototype.ngOnChanges = function () {
        var _this = this;
        console.log('users have changed!');
        if (this.playlist) {
            this.users = [];
            this.plService.getUserFromPlaylist(this.playlist.playlist_id).subscribe(function (res) {
                _this.users.push(res.Playlist.rows[0].Creator);
                _this.users = _this.users.concat(res.Playlist.rows[0].Subscriber);
                console.log('users: ', _this.users);
            }, function (error) { return console.log('Error while retrieving users: ', error); });
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", playlist_1.Playlist)
    ], UserListComponent.prototype, "playlist", void 0);
    UserListComponent = __decorate([
        core_1.Component({
            selector: 'app-user-list',
            templateUrl: './user-list.component.html',
            styleUrls: ['./user-list.component.scss']
        }),
        __metadata("design:paramtypes", [playlist_service_1.PlaylistService])
    ], UserListComponent);
    return UserListComponent;
}());
exports.UserListComponent = UserListComponent;
//# sourceMappingURL=user-list.component.js.map