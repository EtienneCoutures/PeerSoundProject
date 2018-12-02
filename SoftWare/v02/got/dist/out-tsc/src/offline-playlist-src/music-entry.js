"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var XmlBuilder = require("xmlbuilder");
var MusicEntry = /** @class */ (function () {
    function MusicEntry(pos, name, filename, isInFile) {
        this._pos = pos;
        this._name = name;
        this._filename = filename;
        this._isInFile = isInFile;
        console.log('new music', pos, name, filename, isInFile);
    }
    Object.defineProperty(MusicEntry.prototype, "pos", {
        get: function () {
            return this._pos;
        },
        set: function (val) {
            this._pos = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MusicEntry.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (val) {
            this._name = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MusicEntry.prototype, "filename", {
        get: function () {
            return this._filename;
        },
        set: function (val) {
            this._filename = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MusicEntry.prototype, "isInFile", {
        get: function () {
            return this._isInFile;
        },
        set: function (val) {
            this._isInFile = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MusicEntry.prototype, "isDeleted", {
        get: function () {
            return this._isDeleted;
        },
        set: function (val) {
            this._isDeleted = val;
        },
        enumerable: true,
        configurable: true
    });
    MusicEntry.prototype.toXml = function (pos) {
        if (pos === void 0) { pos = undefined; }
        pos = pos || this._pos;
        return XmlBuilder.create('music').att('name', this._name).att('pos', pos).att('filename', this._filename).
            att('isInFile', this._isInFile);
    };
    MusicEntry.prototype.toString = function (pos) {
        return this.toXml().toString({ pretty: true });
    };
    return MusicEntry;
}());
exports.MusicEntry = MusicEntry;
//# sourceMappingURL=music-entry.js.map