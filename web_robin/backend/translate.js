var fs = require('fs'),
    languageDir,
    defaultLanguage;

function init(_languageDir, _defaultLanguage) {
    languageDir = _languageDir;
    defaultLanguage = _defaultLanguage;
}

/**
 * Translate a message or a file with parameters
 *
 * @param {String} [category] The file that contains the search text.
 * @param {String} [message] The text to be translated. If not filled or null, the file will be translated in its entirety.
 * @param {Object} [params] The placeholders.
 * @param {String} [language] The destination language.
 * @return {String} The translated text.
 */
function translate(category, message, params, language) {
    if (typeof(params) == "string") {
        language = params;
        params = {};
    }
    if (typeof(message) == "object") {
        params = message;
        message = null;
    }
    if (language == undefined) {
        language = defaultLanguage;
    }

    if (message) {
        var json = fs.existsSync(languageDir + '/' + language + '/' + category + '.json')
            ? languageDir + '/' + language + '/' + category + '.json'
            : (fs.existsSync(languageDir + '/en/' + category + '.json')
            ? languageDir + '/en/' + category + '.json'
            : null);

        if (json) {
            json = require(json);
        } else {
            json = {};
        }
        message = json[message] || message;
    } else {
        message = fs.existsSync(languageDir + '/' + language + '/' + category + '.ejs')
            ? languageDir + '/' + language + '/' + category + '.ejs'
            : (fs.existsSync(languageDir + '/en/' + category + '.ejs')
            ? languageDir + '/en/' + category + '.ejs'
            : null);
        if (message) {
            try {
                message = fs.readFileSync(message, {
                    encoding: 'utf8'
                });
            } catch(e) {
                message = e.toString();
            }
        } else {
            message = "";
        }
    }

    params = params ||{};
    for (var i in params) {
        if (params.hasOwnProperty(i))
            message = message.replace(new RegExp(i, 'g'), params[i]);
    }

    return message;
}

module.exports = function (languageDir, defaultLanguage) {
    init(languageDir, defaultLanguage);
    return translate;
};
