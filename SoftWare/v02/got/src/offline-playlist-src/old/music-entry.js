var XmlBuilder = require('xmlbuilder');

module.exports = function(/*Int*/pos, /*String*/name, /*String*/filename, /*Bool*/isInFile, /*Bool*/deleted) {

    var _pos = pos,
        _name = name,
        _filename = filename,
        _isInFile = isInFile || false

    return {

        get isInFile() {
          return (_isInFile);
        },

        set isInFile(val) {
          _isInFile = val
        },

        get filename() {
            return (_filename);
        },

        set filename(/*String*/val) {
            _filename = val;
        },

        get name() {
            return (_name);
        },

        set name(/*String*/val) {
            _name = val;
        },

        get pos() {
            return (_pos);
        },

        set pos(/*Int*/val) {
            _pos = val;
        },

        toXml : function() {
            return (XmlBuilder.create('music').att('name', _name).att('filename', _filename).att('isInFile', _isInFile));
        },

        toString : function() {
            this.toXml().toString({ pretty:true });
        },
    }
};
