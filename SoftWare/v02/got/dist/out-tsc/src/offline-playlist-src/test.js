"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var offline_playlist_1 = require("./offline-playlist");
var Test = /** @class */ (function () {
    function Test() {
        this._playlist = new offline_playlist_1.OfflinePlaylist();
        this._header = null;
    }
    Test.prototype.test1 = function () {
        var _this = this;
        this._playlist.open('./', 'test1.psp', true).then(function () {
            _this._header = _this._playlist.header;
            console.assert(_this._header.addMusic('none', 5, '1', false, false), '1');
            console.assert(_this._header.addMusic('none', 2, '2', false, false), '2');
            console.assert(_this._header.addMusic('none', 10, '3', false, false), '3');
            console.assert(_this._header.addMusic('none', 7, '4', false, false), '4');
            console.assert(!_this._header.addMusic('none', 7, '4', false, false), '5');
            console.assert(_this._header.getMusicByPos(1) == undefined, '6');
            console.assert(_this._header.getMusicByPos(10) != undefined, '7');
            console.assert(_this._header.getMusicByPos(20) == undefined, '8');
            console.assert(_this._header.getMusicByName('4') != undefined, '9');
            console.assert(_this._header.getMusicByName('unknown') == undefined, '10');
            console.assert(_this._header.delMusicByPos(2), '11');
            console.assert(_this._header.delMusicByName('4'), '12');
            console.assert(_this._header.getMusicByPos(2) == undefined, '13');
            console.assert(_this._header.getMusicByName('4') == undefined, '14');
            console.log(_this._header.toString());
            console.assert(_this._header.setMusicPos(5, 10));
            console.assert(_this._header.setMusicPos(10, 5));
            console.assert(_this._header.setMusicPos(1, 8) == false);
            console.assert(_this._header.switchMusicPos(5, 10));
            console.assert(_this._header.switchMusicPos(10, 5));
            _this._playlist.save().then(function () {
                var tmp = new offline_playlist_1.OfflinePlaylist();
                tmp.open('./', 'test1.psp').then(function () {
                    console.log(tmp.header.toString());
                    tmp.addMusicFile('./src/offline-playlist-src/music1.flac', 0, 'music1').then(function () {
                        tmp.on('psp-packing', function (data) {
                            console.log('packing', data);
                        });
                        tmp.save().then(function () {
                            tmp.extractMusicFile('./', 0, 'test1').then(function () {
                                tmp.deleteFile();
                            });
                        });
                    });
                    _this._playlist = null;
                    _this._header = null;
                });
            });
        });
    };
    return Test;
}());
exports.Test = Test;
//# sourceMappingURL=test.js.map