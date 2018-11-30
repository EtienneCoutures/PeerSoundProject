"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var XmlBuilder = require("xmlbuilder");
var xml2js = require("xml2js");
var music_entry_1 = require("./music-entry");
var OfflinePlaylistHeader = /** @class */ (function () {
    function OfflinePlaylistHeader() {
        this._playlistName = '';
        this._musics = [];
        this._changes = false;
    }
    OfflinePlaylistHeader.prototype.load = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var parser = new xml2js.Parser();
            var self = _this;
            parser.parseString(data, function (err, res) {
                if (err || !res.root || !res.root.$ || !res.root.musics)
                    reject('Header corrupted');
                self._playlistName = res.root.$.name;
                if (res.root.musics[0]) {
                    res.root.musics[0].music.forEach(function (music, index, array) {
                        music = music.$;
                        self.addMusic(music.filename, music.pos, music.name, false, music.isInFile);
                    });
                }
                resolve();
            });
        });
    };
    OfflinePlaylistHeader.prototype.clear = function () {
        this._musics.length = 0;
        this._playlistName = '';
    };
    OfflinePlaylistHeader.prototype.addMusic = function (filename, pos, name, insert, isInFile) {
        if (insert === void 0) { insert = true; }
        if (isInFile === void 0) { isInFile = false; }
        if (this.getMusicByName(name) && !insert) {
            console.log('from addmus : ret err');
            return false;
        }
        console.log('????');
        var music = new music_entry_1.MusicEntry(pos, name, filename, isInFile);
        if (insert)
            this._musics.splice(pos, 0, music);
        else
            this._musics[pos] = music;
        this._changes = true;
        return true;
    };
    OfflinePlaylistHeader.prototype.delMusicByPos = function (pos) {
        if (!this._musics[pos])
            return false;
        this._musics[pos] = undefined;
        this._changes = true;
        return true;
    };
    OfflinePlaylistHeader.prototype.delMusicByName = function (name) {
        var index;
        var music = this._musics.find(function (elem, i, array) {
            index = i;
            if (elem)
                return elem.name == name;
        });
        if (!music)
            return false;
        this.delMusicByPos(index);
        return true;
    };
    OfflinePlaylistHeader.prototype.setMusicPos = function (curPos, newPos) {
        if (!this._musics[curPos])
            return false;
        if (curPos == newPos)
            return true;
        if (curPos < newPos)
            newPos -= 1;
        var music = this._musics.splice(curPos, 1)[0];
        this._musics.splice(newPos, 0, music);
        this._changes = true;
        return true;
    };
    OfflinePlaylistHeader.prototype.switchMusicPos = function (pos1, pos2) {
        if (!this.setMusicPos(pos1, pos2))
            return false;
        return this.setMusicPos(pos1 > pos2 ? pos2 + 1 : pos2, pos1);
    };
    OfflinePlaylistHeader.prototype.getMusicByPos = function (pos) {
        return this._musics[pos];
    };
    OfflinePlaylistHeader.prototype.getMusicByName = function (name) {
        return this._musics.find(function (music) {
            if (music)
                return music.name == name;
        });
    };
    OfflinePlaylistHeader.prototype.getMusics = function (from, to) {
        if (from === void 0) { from = 0; }
        if (to === void 0) { to = null; }
        from = from;
        to = to || this._musics.length;
        return this._musics.slice(from, to);
    };
    Object.defineProperty(OfflinePlaylistHeader.prototype, "name", {
        get: function () {
            return this._playlistName;
        },
        set: function (val) {
            this._playlistName = val;
            this._changes = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OfflinePlaylistHeader.prototype, "changes", {
        get: function () {
            return this._changes;
        },
        enumerable: true,
        configurable: true
    });
    OfflinePlaylistHeader.prototype.toXml = function () {
        var xml = XmlBuilder.create('root').att('name', this._playlistName).ele('musics');
        var i = 0;
        this._musics.forEach(function (music) {
            if (music) {
                xml.importDocument(music.toXml(i));
                i += 1;
            }
        });
        return xml.root();
    };
    OfflinePlaylistHeader.prototype.toString = function () {
        return this.toXml().doc().end().toString({ pretty: true });
    };
    return OfflinePlaylistHeader;
}());
exports.OfflinePlaylistHeader = OfflinePlaylistHeader;
//# sourceMappingURL=offline-playlist-header.js.map