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
var user_service_1 = require("../user.service");
var playlist_service_1 = require("../playlist/playlist.service");
var Event = /** @class */ (function () {
    function Event() {
    }
    return Event;
}());
exports.Event = Event;
var Invitation = /** @class */ (function () {
    function Invitation() {
    }
    return Invitation;
}());
exports.Invitation = Invitation;
var EventsComponent = /** @class */ (function () {
    function EventsComponent(userService, plService) {
        this.userService = userService;
        this.plService = plService;
        this.events = new Array();
    }
    EventsComponent.prototype.ngOnInit = function () {
        this.events = this.userService.events;
        console.log('events list : ', this.events);
        //this.getInvitations();
    };
    EventsComponent.prototype.accept = function (event) {
        var _this = this;
        console.log('accept event: ', event);
        this.userService.deleteInvitation(event.invitation.invitation_id)
            .subscribe(function (res) {
            if (res.code == 0) {
                _this.userService.acceptInvitation(event.invitation.invited_usr_id, event.invitation.playlist_id)
                    .subscribe(function (res) {
                    if (res.code == 0) {
                        if (event.type == "Invitation") {
                            _this.plService.getPlaylistMusics(event.invitation.playlist_id)
                                .subscribe(function (pl) {
                                console.log('new playlist:', pl);
                                _this.plService.playlists.push(pl.Playlist);
                                _this.plService.selectedPl = pl.Playlist;
                            });
                        }
                        var idx = _this.events.indexOf(event);
                        _this.events.splice(idx, 1);
                    }
                    else {
                    }
                }, function (error) { return console.log('error while accpeting invitation: ', error); });
            }
        });
    };
    EventsComponent.prototype.refuse = function (event) {
        var _this = this;
        console.log('refuse: ', event);
        this.userService.deleteInvitation(event.invitation.invitation_id)
            .subscribe(function (res) {
            console.log('deleteInvitation: ', res);
            if (res.code == 0) {
                var idx = _this.events.indexOf(event);
                _this.events.splice(idx, 1);
            }
        }, function (error) { return console.log('error while deleting invitaiton: ', error); });
    };
    EventsComponent = __decorate([
        core_1.Component({
            selector: 'app-events',
            templateUrl: './events.component.html',
            styleUrls: ['./events.component.scss']
        }),
        __metadata("design:paramtypes", [user_service_1.UserService,
            playlist_service_1.PlaylistService])
    ], EventsComponent);
    return EventsComponent;
}());
exports.EventsComponent = EventsComponent;
//# sourceMappingURL=events.component.js.map