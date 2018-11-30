var XmlBuilder = require('xmlbuilder'), // create xml
    xml2js = require('xml2js'), // parse xml
    Const = require('./constants'),
    MusicEntry = require('./music-entry');

module.exports = function() {

    var _version = Const.CURVER,
        _playlistName = '',
        _musics = [];

    function shiftMusicsPos(/*Int*/from) {
        _musics.forEach((m, i, a) => {
            if (m.pos >= from)
                m.pos++;
        })
    }

    return {

        get playlistName() {
            return (_playlistName);
        },

        set playlistName(val) {
            _playlistName = val;
        },

        get version() {
            return (_version);
        },

        load : function(data) {
            var parser = new xml2js.Parser(),
                self = this;

            parser.parseString(data, function(err, res) {

                if (err || !res.root || !res.root.$ || !res.root.$.version || !res.root.musics) {
                    return (false)
                }

                self._version = res.root.$.version;
                self._playlistName = res.root.$.version;

                if (res.root.musics[0]) {
                    res.root.musics[0].music.forEach(function(music, index, array) {
                        music = music.$
                        self.addMusic(music.filename, music.pos, music.name, music.offline);
                    });
                }
                return (true);
            });
        },

        addMusic : function(/*String*/filename, /*Int - Optional*/pos, /*String - Optional*/name, isInFile) {
            var music = this.getMusicByName(name)
            if (music && music.isInFile) // music already in file
              return (false)

            // console.log('add music ' + filename)
            _musics.push(new MusicEntry(-1, name, filename, isInFile))
            this.setMusicPos(-1, pos)
            return (true)
        },

        delMusicByPos : function(/*Int*/pos) {
            if (typeof pos == 'number' && pos >= 0) {
                _musics.filter(function(m) {
                    return (m.pos !== pos)
                })
            }
        },

        setMusicPos : function(/*Int*/curPos, /*Int*/newPos) {
            music = this.getMusic(curPos)
            if (music) {
                if (this.getMusic(newPos) != undefined) {
                    shiftMusicsPos(newPos)
                }
                music.pos = newPos
            }
        },

        getMusic : function(/*Int*/pos) {
            for (var i=0; i!=_musics.length; i++) {
                if (_musics[i].pos == pos)
                    return (_musics[i])
            }
            return (undefined)
        },

        getMusicByName : function(/*String*/name) {
            for (var i=0; i!=_musics.length; i++) {
                if (_musics[i].name == name)
                    return (_musics[i])
            }
            return (undefined)
        },

        getMusicsMetadata : function(/*Int - Optionnal*/from = 0, /*Int - Optional*/to, /*Bool*/sorted = true) {
            to = to || _musics.length - 1;
            _musics.sort((a, b) => a.pos - b.pos)
            return (_musics.slice(from, to + 1));
        },

        toXml : function() {
            var xml = XmlBuilder.create('root').att('version', _version).att('name', _playlistName)
                .ele('musics');
            if (_musics && _musics.length > 0) {
                _musics.forEach(function(music, index, array) {
                    xml.importDocument(music.toXml());
                })
            }
            return (xml.root());
        },

        toString : function() {
            return (this.toXml().doc().end().toString({ pretty:true }));
        },

    }
};
