var XmlBuilder = require('xmlbuilder');
var XmlParser = require('xml-parser');
var fs = require('fs');
var Header = require('./offline-playlist-header');
var Const = require('./constants')
var Zip = require('jszip')
var path = require('path')
var EventEmitter = require('events')
var util = require('util')

module.exports = function() {

    var _zip = new Zip(),
        _header = new Header(),
        _filepath = undefined,
        _musicFolderName = Const.MUSDIR,
        _isOpen = false

    function genMusFilename(/*Int*/len) {
        var res = '',
            possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i=0; i<len; i++)
            res += possible.charAt(Math.floor(Math.random() * possible.length));
        return res;
    }

    function checkOldFileExtOk(/*String*/ext) {
        Const.VALEXT.forEach(function(validExt, index, array) {
            if (ext == '.' + validExt)
                return (true);
        });
        return (false);
    }

    return {

        create : function(/*String*/filepath, /*String*/playlistName) {
            _filepath = filepath;
            _header.playlistName = playlistName;
        },

        open : function(/*String*/filepath, /*Bool - Optional*/autocreate = false) {
            var self = this,
                ext = path.extname(filepath).toLowerCase()

            // console.log('11')

            return new Promise((resolve, reject) => {

                if (ext == '') // if no file extention given -> add default one
                    filepath = filepath + Const.FILEXT;

                // console.log('22')
                if (filepath == _filepath) // if file already open -> resolve
                    resolve();

                if (ext != '.' + Const.FILEXT.toLowerCase() && !checkOldFileExtOk(ext)) // check file extention
                    reject('Can\'t open file : File extention must be .' + Const.FILEXT + ' !');
                // console.log('33')

                if (!fs.existsSync(filepath)) { // does file exist
                    if (autocreate) { // if param given -> auto-create new file & resolve
                        // console.log('44')
                        self.create(filepath, path.basename(filepath, ext))
                        resolve();
                    }
                    else { // file not found
                        reject('No such file, open \'' + filepath + '\'')
                    }
                }
                // console.log(filepath)
                fs.readFile(filepath, (err, data) => { // read header
                    if (err)
                        reject(err);
                    Zip.loadAsync(data).then((zip) => {
                        _zip = zip

                        if (!_zip.file('header.xml'))
                            reject('File corrupted : Header missing !')

                        _zip.file('header.xml').async('string').then(function (data) {
                            _filepath = filepath;
                            if (_header.load(data)) // load header data
                                reject('File corrupted : Header corrupted !')
                            _isOpen = true;
                            resolve()
                        },
                        (err) => { // file().async() fail
                            reject(err)
                        });
                    },
                    (err) => { // loadAsync()
                        reject(err)
                    });
                });
            });
        },

        isOpen : function() {
          return (_isOpen);
        },

        save : function(win) {

            return new Promise((resolve, reject) => {
                if (_filepath) {
                    _zip.file('header.xml', _header.toString()); // add header

                    _zip.generateNodeStream({streamFiles : true}, function progress(metadata) {
                        // var msg = "progression : " + metadata.percent.toFixed(2) + " %";
                        if (win)
                            win.webContents.send('set-dl-status', 'packing ' + Math.floor(metadata.percent) + '%');
                    }).pipe(fs.createWriteStream(_filepath)).on('finish', () => {
                        resolve();
                    }).on('error', (err) => {
                        reject(err)
                    });
                }
                else {
                    reject('No .' + Const.FILEXT + ' file loaded yet : Use create(filepath, playlistName) or open(filepath [, autocreate]) first !')
                }
            });
        },

        get name() {
            return (_header.playlistName);
        },

        set name(/*String*/val) {
            _header.playlistName = val;
        },

        get version() {
            return (_header.version);
        },

        addMusic : function(/*String*/filepath, /*Int - Optional*/pos, /*String - Optional*/name) {
            var filename = genMusFilename(10) + path.extname(filepath);

            return new Promise((resolve, reject) => {

                var contentPromise = new Zip.external.Promise(function (resolve, reject) {
                    fs.readFile(filepath, function(err, data) {
                        if (err)
                            reject(err)
                        if (!_header.addMusic(filename, pos, name, true))
                            console.log('Can\'t add music "' + name + '" : Already in the playlist !')
                        var mus = _header.getMusic(pos)
                        if (mus)
                          mus.isInFile = true;
                        resolve(data);
                    });
                });

                contentPromise.then(function(data) {
                    _zip.folder(_musicFolderName).file(filename, data);
                    resolve();
                },
                (err) => {
                    reject(err);
                });
            });
        },

        addMusicMetadata : function(pos, name) {
            _header.addMusic('', pos, name, false)
        },

        extractMusic : function(/*String*/pos, /*String - Optional*/filepath) {

            var metadata = this.getMusicMetadata(pos);

            return new Promise((resolve, reject) => {
                _zip.folder(_musicFolderName).file(metadata.filename).async('nodebuffer').then(function (data) {
                    fs.writeFile(filepath + metadata.filename, data, (err) => {
                        if (err)
                            reject(err);
                        resolve(metadata.filename);
                    });
                }, (err) => {
                    reject(err);
                });
            });
        },

        delMusicByPos : function(/*Int*/pos) {
            _zip.remove(_musicFolderName + '/' + this.getMusicMetadata(pos).filename);
            _header.delMusicByPos(pos);
        },

        setMusicPos : function(/*Int*/curPos, /*Int*/newPos) {
            _header.setMusicPos(curPos, newPos);
        },

        getMusicsMetadata : function(/*Int - Optionnal*/from = 0, /*Int - Optional*/to) {
            return (_header.getMusicsMetadata());
        },

        getMusicMetadata : function(/*Int*/pos) {
            return (_header.getMusic(pos));
        },

        toXml : function() {
            return (_header.toXml());
        },

        toString : function() {
            return (_header.toString());
        },

    }
};
