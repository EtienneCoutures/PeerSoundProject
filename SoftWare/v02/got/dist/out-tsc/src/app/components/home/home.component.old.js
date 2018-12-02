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
var login_service_1 = require("../../login/login.service");
var user_service_1 = require("../../user.service");
var playlist_service_1 = require("../../playlist/playlist.service");
var events_component_1 = require("../../events/events.component");
var core_2 = require("@angular/core");
var router_1 = require("@angular/router");
var event_service_1 = require("../../event.service");
var events_component_2 = require("../../events/events.component");
var offline_features_service_1 = require("../../offline-features.service");
//declare var SC: any;
var HomeComponent = /** @class */ (function () {
    function HomeComponent(loginService, userService, plService, rd, router, eService, offlineService) {
        //this.account = this.loginService.account;
        /*this.account = this.loginService.account;
        this.playlists = this.plService.playlists;
        this.musics = this.plService.musics;*/
        this.loginService = loginService;
        this.userService = userService;
        this.plService = plService;
        this.rd = rd;
        this.router = router;
        this.eService = eService;
        this.offlineService = offlineService;
        this.users = new Array();
        this.ipcRenderer = null;
        this.subs = new Array();
        console.log('this.loginService.account: ', this.loginService.account);
        if (this.loginService.account.playlist) {
            console.log('hello bitches');
            var tmp = new Array();
            this.plService.selectedPl = this.loginService.account.playlist;
            tmp.push(this.loginService.account.playlist);
            this.plService.playlists = tmp;
        }
    }
    HomeComponent.prototype.ngOnInit = function () {
        //console.log('account bearer: ', this.account.authorization);
        var _this = this;
        this.userService.getUserPlaylists().subscribe(function (playlists) {
            console.log('PLAYLISTS: ', playlists);
            _this.userService.getSubscription().subscribe(function (subscription) {
                var tmp = new Array();
                console.log('PLAYLISTS: ', playlists);
                if (subscription) {
                    for (var i = 0; i < subscription.length; ++i) {
                        tmp.push(subscription[i].Playlist);
                    }
                }
                console.log('SUBS: ', tmp);
                _this.plService.playlists = playlists.concat(tmp);
                _this.plService.musics = _this.plService.playlists[0].MusicLink;
                _this.plService.selectedMusic = _this.plService.playlists[0].MusicLink[0];
                _this.plService.selectedPl = _this.plService.playlists[0];
                console.log('this.plService.selectedMusic: ', _this.plService.musics);
                //this.musics = this.playlists[0].MusicLink;
                //this.playlists = this.plService.playlists;
                _this.router.navigate([{ outlets: { homeOutlet: ['home/infoPlaylist'] } }]);
                _this.getInvitations();
            }, function (error) { return console.log('error while retrieving subs: ', error); });
        }, function (error) { return console.log('error while retrieving playlist: ', error); });
        this.eService.messages.subscribe(function (m) {
            console.log('event: ', m);
            if (m.type == "invitReceived") {
                var e = new events_component_1.Event();
                e.type = "Invitation";
                e.message = "Vous avez re\u00E7u une invitation \u00E0 rejoindre la playlist \""
                    + (m.data.playlist_name + "\"")
                    + (" par " + m.data.usr_login + ".");
                console.log('n event pushed: ', e);
                e.invitation = new events_component_2.Invitation();
                e.invitation.invitation_id = m.data.invitation_id;
                e.invitation.invited_usr_id = m.data.invited_usr_id;
                e.invitation.playlist_id = m.data.playlist_id;
                //e.invitation = {};
                _this.userService.events.push(e);
            }
            else if (m.type == "newMusic") {
                _this.plService.getMusicLinkFromMusicId(m.data.music_id).subscribe(function (link) {
                    for (var p in _this.plService.playlists) {
                        if (_this.plService.playlists[p].playlist_id == link.playlist_id) {
                            link.Music = m.data;
                            console.log('link: ', link);
                            _this.plService.playlists[p].MusicLink.push(link);
                        }
                    }
                });
            }
        });
        this.eService.sendMsg({ type: "connection", data: this.plService.account });
    };
    HomeComponent.prototype.refresh = function () {
        var _this = this;
        this.userService.getUserPlaylists().subscribe(function (playlists) {
            console.log('PLAYLISTS: ', playlists);
            _this.userService.getSubscription().subscribe(function (subscription) {
                var tmp = new Array();
                console.log('PLAYLISTS: ', playlists);
                if (subscription) {
                    for (var i = 0; i < subscription.length; ++i) {
                        tmp.push(subscription[i].Playlist);
                    }
                }
                console.log('SUBS: ', tmp);
                _this.plService.playlists = playlists.concat(tmp);
                for (var pl in _this.plService.playlists) {
                    if (_this.plService.selectedPl.playlist_id = _this.plService.playlists[pl].playlist_id)
                        _this.plService.selectedPl = _this.plService.playlists[pl];
                    //this.plService.musics = this.plService.playlists[pl].MusicLink;
                }
                //this.musics = this.playlists[0].MusicLink;
                //this.playlists = this.plService.playlists;
                //this.router.navigate([{ outlets: { homeOutlet: ['home/infoPlaylist'] } }]);
                _this.getInvitations();
                _this.offlineService.reset();
            }, function (error) { return console.log('error while retrieving subs: ', error); });
        }, function (error) { return console.log('error while retrieving playlist: ', error); });
    };
    HomeComponent.prototype.ngAfterViewInit = function () {
        this.iframeElement = this.scPlayer.nativeElement;
        this.scWidget = window['SC'].Widget(this.iframeElement);
    };
    HomeComponent.prototype.ngOnDestroy = function () {
        this.subs.map(function (sub) { return sub.unsubscribe(); });
    };
    HomeComponent.prototype.playlistChangedHandler = function (pl) {
        this.plService.selectedPl = pl;
        this.plService.musics = pl.MusicLink;
        //this.musics = pl.MusicLink;
    };
    HomeComponent.prototype.deco = function () {
        this.router.navigate(['']);
    };
    HomeComponent.prototype.playMusicHandler = function (music) {
        if (this.plService.selectedMusic !== music) {
            this.scWidget.load(music.music_url, { auto_play: true });
        }
        else if (this.plService.selectedMusic === music) {
            if (this.plService.isPlaying)
                this.scWidget.play();
            else
                this.scWidget.pause();
        }
    };
    HomeComponent.prototype.getInvitations = function () {
        var _this = this;
        var tmp = new Array();
        this.userService.getInvitations().subscribe(function (invitations) {
            console.log('invitation: ', invitations);
            for (var _i = 0, invitations_1 = invitations; _i < invitations_1.length; _i++) {
                var invit = invitations_1[_i];
                var e = new events_component_1.Event();
                e.message = "Vous avez re\u00E7u une invitation \u00E0 rejoindre la playlist \""
                    + (invit.Playlist.playlist_name + "\"")
                    + (" par " + invit.Inviter.usr_login + ".");
                e.invitation = invit;
                e.type = "Invitation";
                tmp.push(e);
            }
            _this.userService.events = tmp;
            console.log('events: ', _this.userService.events);
        }, function (error) { return console.log('error while retrieving invitations: ', error); });
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], HomeComponent.prototype, "scWidget", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], HomeComponent.prototype, "iframeElement", void 0);
    __decorate([
        core_1.ViewChild('scPlayer'),
        __metadata("design:type", core_2.ElementRef)
    ], HomeComponent.prototype, "scPlayer", void 0);
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'app-home',
            templateUrl: './home.component.html',
            styleUrls: ['./home.component.scss']
        }),
        __metadata("design:paramtypes", [login_service_1.LoginService,
            user_service_1.UserService,
            playlist_service_1.PlaylistService,
            core_2.Renderer2,
            router_1.Router,
            event_service_1.EventService,
            offline_features_service_1.OfflineFeaturesService])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.old.js.map