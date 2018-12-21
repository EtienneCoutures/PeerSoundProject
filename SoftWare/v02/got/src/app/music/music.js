"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Music = /** @class */ (function () {
    function Music(id, name, desc, com, pict, insert, update, src, group, url, date, usr_id, duration) {
        if (id === void 0) { id = 0; }
        if (name === void 0) { name = ''; }
        if (desc === void 0) { desc = ''; }
        if (com === void 0) { com = ''; }
        if (pict === void 0) { pict = ''; }
        if (insert === void 0) { insert = ''; }
        if (update === void 0) { update = ''; }
        if (src === void 0) { src = ''; }
        if (group === void 0) { group = ''; }
        if (url === void 0) { url = ''; }
        if (date === void 0) { date = ''; }
        if (usr_id === void 0) { usr_id = ''; }
        if (duration === void 0) { duration = ''; }
        this.music_description = 'unknown';
        this.music_comment = 'unknown';
        this.music_group = 'unknown';
        this.music_url = 'unknown';
        this.music_date = 'unknown';
        this.isOfflineAvailable = false;
        this.isDownloading = false;
        this.dlProgress = 0;
        this.isLocalFile = false;
        this.music_id = id;
        this.music_name = name;
        this.music_description = desc;
        this.music_comment = com;
        this.music_picture_default = pict;
        this.music_insert = insert;
        this.music_update = update;
        this.music_source = src;
        this.music_group = group;
        this.music_url = url;
        this.music_date = date;
        this.usr_id = usr_id;
        this.duration = duration;
    }
    Music.getMusFromMusicEntry = function (mus, url, src) {
        if (url === void 0) { url = null; }
        var res = new Music();
        res.music_name = mus._name;
        res.music_url = url;
        res.music_source = src;
        res.isOfflineAvailable = (mus._isInFile == 'true' ? true : false);
        res.isLocalFile = true;
        return (res);
    };
    Music.getMusFromMusicLink = function (musLink) {
        var res = new Music();
        res = musLink.Music;
        return (res);
    };
    return Music;
}());
exports.Music = Music;
//# sourceMappingURL=music.js.map