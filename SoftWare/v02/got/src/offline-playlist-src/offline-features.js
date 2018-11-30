"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var offline_playlist_1 = require("./offline-playlist");
var EventEmitter = require("events");
var OfflineFeatures = /** @class */ (function (_super) {
    __extends(OfflineFeatures, _super);
    function OfflineFeatures() {
        var _this = _super.call(this) || this;
        _this._playlist = new offline_playlist_1.OfflinePlaylist();
        _this._header = null;
        _this._header = _this._playlist.header;
        return _this;
    }
    return OfflineFeatures;
}(EventEmitter));
exports.OfflineFeatures = OfflineFeatures;
//# sourceMappingURL=offline-features.js.map