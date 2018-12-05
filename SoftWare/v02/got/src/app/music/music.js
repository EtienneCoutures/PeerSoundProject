"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Music = /** @class */ (function () {
    function Music(mus, url, src) {
        if (url === void 0) { url = null; }
        this.music_description = 'unknown';
        this.music_comment = 'unknown';
        this.music_group = 'unknown';
        this.music_url = 'unknown';
        this.music_date = 'unknown';
        this.isOfflineAvailable = false;
        this.isLocalFile = false;
        this.music_id = mus._pos;
        this.music_name = mus._name;
        this.isOfflineAvailable = (mus._isInFile == 'true' ? true : false);
        this.music_url = url;
        this.isDownloading = false;
        this.dlProgress = 0;
        this.music_source = src;
        this.isLocalFile = true;
    }
    return Music;
}());
exports.Music = Music;
//# sourceMappingURL=music.js.map