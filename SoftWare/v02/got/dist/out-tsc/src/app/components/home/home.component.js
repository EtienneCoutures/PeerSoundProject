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
        this.loginService = loginService;
        this.userService = userService;
        this.plService = plService;
        this.rd = rd;
        this.router = router;
        this.eService = eService;
        this.offlineService = offlineService;
        this.users = new Array();
        this.ipcRenderer = null;
        this.loaded = false;
        this.init = [
            this.getUserPlaylists,
            this.getSubscription,
            this.getInvitations
        ];
        this.subs = new Array();
        console.log('this.loginService.account: ', this.loginService.account);
        if (this.loginService.account.playlist) {
            var tmp = new Array();
            this.plService.selectedPl = this.loginService.account.playlist;
            tmp.push(this.loginService.account.playlist);
            this.plService.playlists = tmp;
        }
    }
    HomeComponent.prototype.initialize = function (cmpt) {
        var _this = this;
        var i = 0;
        return new Promise(function (resolve, reject) {
            for (var _i = 0, _a = _this.init; _i < _a.length; _i++) {
                var func = _a[_i];
                func(cmpt).then(function () {
                    ++i;
                    if (i === cmpt.init.length) {
                        resolve();
                    }
                }).catch(function (error) {
                    reject(error);
                });
            }
        });
    };
    HomeComponent.prototype.ngOnInit = function () {
        //console.log('account bearer: ', this.account.authorization);
        var _this = this;
        this.handleMessages();
        this.initialize(this).then(function (result) {
            console.log('this.plService.playlists: ', _this.plService.playlists);
            _this.plService.musics = _this.plService.playlists[0].MusicLink;
            _this.plService.selectedMusic = _this.plService.playlists[0].MusicLink[0];
            _this.plService.selectedPl = _this.plService.playlists[0];
            _this.loaded = true;
        }).catch(function (error) {
            console.log('error loading home: ', error);
        });
    };
    HomeComponent.prototype.getUserPlaylists = function (cmpt) {
        return new Promise(function (resolve, reject) {
            cmpt.userService.getUserPlaylists().subscribe(function (playlists) {
                cmpt.plService.playlists = cmpt.plService.playlists.concat(playlists);
                resolve();
            }, function (error) {
                reject(error);
            });
        });
    };
    HomeComponent.prototype.getSubscription = function (cmpt) {
        return new Promise(function (resolve, reject) {
            cmpt.userService.getSubscription().subscribe(function (subscriptions) {
                var tmp = [];
                subscriptions.map(function (item) {
                    tmp.push(item.Playlist);
                });
                cmpt.plService.playlists = cmpt.plService.playlists.concat(tmp);
                resolve();
            }, function (error) {
                reject(error);
            });
        });
    };
    HomeComponent.prototype.getInvitations = function (cmpt) {
        return new Promise(function (resolve, reject) {
            var tmp = new Array();
            cmpt.userService.getInvitations().subscribe(function (invitations) {
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
                cmpt.userService.events = tmp;
                console.log('events: ', cmpt.userService.events);
                resolve();
            }, function (error) { return reject(error); });
        });
    };
    HomeComponent.prototype.handleMessages = function () {
        var _this = this;
        this.eService.messages.subscribe(function (m) {
            console.log('event: ', m);
            if (m.type === "invitReceived") {
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
            else if (m.type === "newMusic") {
                _this.plService.getMusicLinkFromMusicId(m.data.music_id).subscribe(function (link) {
                    for (var p in _this.plService.playlists) {
                        if (_this.plService.playlists[p].playlist_id === link.playlist_id) {
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
        //this.loaded = false;
        this.plService.playlists = new Array();
        this.initialize(this).then(function (result) {
            for (var pl in _this.plService.playlists) {
                if (_this.plService.selectedPl.playlist_id === _this.plService.playlists[pl].playlist_id)
                    _this.plService.selectedPl = _this.plService.playlists[pl];
                //this.plService.musics = this.plService.playlists[pl].MusicLink;
            }
            _this.offlineService.reset();
        });
        /*this.userService.getUserPlaylists().subscribe(playlists => {
          console.log('PLAYLISTS: ', playlists);
          this.userService.getSubscription().subscribe(subscription => {
            let tmp = new Array();
    
            console.log('PLAYLISTS: ', playlists);
            if (subscription) {
              for (let i = 0; i < subscription.length; ++i) {
                tmp.push(subscription[i].Playlist);
              }
            }
            console.log('SUBS: ', tmp);
    
            this.plService.playlists = playlists.concat(tmp);
            for (let pl in this.plService.playlists) {
              if (this.plService.selectedPl.playlist_id = this.plService.playlists[pl].playlist_id)
                this.plService.selectedPl = this.plService.playlists[pl];
              //this.plService.musics = this.plService.playlists[pl].MusicLink;
            }
    
            //this.musics = this.playlists[0].MusicLink;
            //this.playlists = this.plService.playlists;
            //this.router.navigate([{ outlets: { homeOutlet: ['home/infoPlaylist'] } }]);
    
            this.getInvitations();
            this.offlineService.reset()
          }, error => console.log('error while retrieving subs: ', error));
        }, error => console.log('error while retrieving playlist: ', error));*/
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
//# sourceMappingURL=home.component.js.map