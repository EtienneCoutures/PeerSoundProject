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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var playlist_1 = require("../playlist/playlist");
var material_1 = require("@angular/material");
var playlist_service_1 = require("../playlist/playlist.service");
var event_service_1 = require("../event.service");
var OptionsPlComponent = /** @class */ (function () {
    function OptionsPlComponent(dialog, plService, eService, bar) {
        this.dialog = dialog;
        this.plService = plService;
        this.eService = eService;
        this.bar = bar;
        this.conModeSwitched = new core_1.EventEmitter();
        this.isOffline = false;
    }
    OptionsPlComponent.prototype.openInviteDialog = function () {
    };
    OptionsPlComponent.prototype.ngOnInit = function () {
        console.log('opt pl : ', this.playlist);
    };
    OptionsPlComponent.prototype.invitePeople = function () {
        var _this = this;
        var dialogRef = this.dialog.open(DialogInvitePeople, {
            data: { pl: this.playlist, service: this.plService },
        });
        dialogRef.afterClosed().subscribe(function (results) {
            _this.inviteEmail = results;
            if (results) {
                _this.eService.sendMsg({ type: 'invitSent', data: results });
                _this.bar.open('Invitation envoyée !', 'Ok', { duration: 3000,
                    verticalPosition: 'top' });
            }
        });
    };
    OptionsPlComponent.prototype.switchConnectivityMode = function () {
        this.isOffline = !this.isOffline;
        this.conModeSwitched.emit(this.isOffline);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", playlist_1.Playlist)
    ], OptionsPlComponent.prototype, "playlist", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], OptionsPlComponent.prototype, "conModeSwitched", void 0);
    OptionsPlComponent = __decorate([
        core_1.Component({
            selector: 'app-options-pl',
            templateUrl: './options-pl.component.html',
            styleUrls: ['./options-pl.component.scss']
        }),
        __metadata("design:paramtypes", [material_1.MatDialog,
            playlist_service_1.PlaylistService,
            event_service_1.EventService,
            material_1.MatSnackBar])
    ], OptionsPlComponent);
    return OptionsPlComponent;
}());
exports.OptionsPlComponent = OptionsPlComponent;
var DialogInvitePeople = /** @class */ (function () {
    function DialogInvitePeople(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.invitation = new playlist_service_1.Invitation();
    }
    DialogInvitePeople.prototype.onNoClick = function () {
        this.dialogRef.close(null);
    };
    DialogInvitePeople.prototype.isEmail = function (myVar) {
        var regEmail = new RegExp('^[0-9a-z._-]+@{1}[0-9a-z.-]{2,}[.]{1}[a-z]{2,5}$', 'i');
        return regEmail.test(myVar);
    };
    DialogInvitePeople.prototype.invite = function () {
        var _this = this;
        console.log('invite: ', this.data);
        if (!this.isEmail(this.inviteEmail)) {
            this.error = "Veuillez entrer une adresse mail valide.";
            return;
        }
        this.invitation.inviter_usr_id = this.data.service.account.usr_id;
        this.invitation.playlist_id = this.data.pl.playlist_id;
        this.invitation.invited_role = "member";
        console.log('inviteEmail: ', this.inviteEmail);
        this.data.service.getUserIdFromMail(this.inviteEmail).subscribe(function (res) {
            if (!res || !res[0]) {
                _this.error = "Pas d'utilisateur trouvé.";
                return;
            }
            console.log('res user id from mail: ', res);
            _this.invitation.invited_usr_id = res[0].usr_id;
            //this.invitation.invited_usr_id = invited_id;
            _this.data.service.inviteUser(_this.invitation).subscribe(function (res) {
                if (res.code === 0) {
                    _this.invitation.playlist_name = _this.data.pl.playlist_name;
                    _this.invitation.usr_login = _this.data.service.account.usr_login;
                    _this.invitation.invitation_id = res.Invitation.invitation_id;
                    _this.error = "";
                    _this.dialogRef.close(_this.invitation);
                }
                else if (res.code === 1) {
                    _this.error = "Invitation déjà envoyée.";
                }
            }, function (error) { return console.log('error trying invitation: ', error); });
        }, function (error) { return console.log('error getting user id from mail: ', error); });
    };
    DialogInvitePeople = __decorate([
        core_1.Component({
            selector: 'app-invite-people-dialog',
            templateUrl: 'invite-people-dialog.html',
        }),
        __param(1, core_1.Inject(material_1.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [material_1.MatDialogRef, Object])
    ], DialogInvitePeople);
    return DialogInvitePeople;
}());
exports.DialogInvitePeople = DialogInvitePeople;
//# sourceMappingURL=options-pl.component.js.map