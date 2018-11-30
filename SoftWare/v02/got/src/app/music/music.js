"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Music = /** @class */ (function () {
    function Music(mus, url) {
        if (url === void 0) { url = null; }
        this.music_id = mus._pos;
        this.music_name = mus._name;
        this.isOfflineAvailable = mus._isInFile;
        this.music_url = url;
        this.isDownloading = false;
        this.dlProgress = 0;
    }
    return Music;
}());
exports.Music = Music;
//# sourceMappingURL=music.js.map