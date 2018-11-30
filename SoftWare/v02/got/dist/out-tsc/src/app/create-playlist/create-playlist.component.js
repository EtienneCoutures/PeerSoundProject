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
var material_1 = require("@angular/material");
var playlist_1 = require("../playlist/playlist");
var playlist_service_1 = require("../playlist/playlist.service");
var core_2 = require("@angular/core");
var CreatePlaylistComponent = /** @class */ (function () {
    function CreatePlaylistComponent(dialog, plService) {
        this.dialog = dialog;
        this.plService = plService;
        this.newPlaylist = new core_2.EventEmitter();
    }
    CreatePlaylistComponent.prototype.ngOnInit = function () {
    };
    CreatePlaylistComponent.prototype.openDialog = function () {
        var _this = this;
        this.playlist = new playlist_1.Playlist();
        var dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
            data: this.playlist
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this.plService.createPlaylist(result).subscribe(function (rslt) {
                    if (rslt.code == 0) {
                        /*this.plService.selectedPl = rslt.Playlist;
                        this.plService.musics = rslt.Playlist.MusicLink;*/
                        _this.newPlaylist.emit(rslt.Playlist);
                    }
                }, function (error) { return console.log('error: ', error); });
            }
        });
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_2.EventEmitter)
    ], CreatePlaylistComponent.prototype, "newPlaylist", void 0);
    CreatePlaylistComponent = __decorate([
        core_1.Component({
            selector: 'app-create-playlist',
            templateUrl: './create-playlist.component.html',
            styleUrls: ['./create-playlist.component.scss']
        }),
        __metadata("design:paramtypes", [material_1.MatDialog,
            playlist_service_1.PlaylistService])
    ], CreatePlaylistComponent);
    return CreatePlaylistComponent;
}());
exports.CreatePlaylistComponent = CreatePlaylistComponent;
var DialogOverviewExampleDialog = /** @class */ (function () {
    function DialogOverviewExampleDialog(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
    DialogOverviewExampleDialog.prototype.onNoClick = function () {
        this.dialogRef.close(null);
    };
    DialogOverviewExampleDialog.prototype.create = function () {
        this.dialogRef.close(this.data);
    };
    DialogOverviewExampleDialog = __decorate([
        core_1.Component({
            selector: 'app-create-playlist-dialog',
            templateUrl: 'create-playlist-dialog.html',
        }),
        __param(1, core_1.Inject(material_1.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [material_1.MatDialogRef,
            playlist_1.Playlist])
    ], DialogOverviewExampleDialog);
    return DialogOverviewExampleDialog;
}());
exports.DialogOverviewExampleDialog = DialogOverviewExampleDialog;
//# sourceMappingURL=create-playlist.component.js.map