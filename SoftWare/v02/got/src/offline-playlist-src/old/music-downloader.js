var electron = require('electron'),
    https = require('https'),
    fs = require('fs'),
    dialog = electron.dialog,
    path = require('path'),
    url = require('url'),
    ID3 = require('node-id3'),
    request = require('request');

module.exports = function(/*Electron MainWindow - Optional*/win) {

    var _sc_key = 'nYw8DGbKym7Ph6LR1EaSxD8Dmj5rkCwa',
        _win = win || undefined;

    function dlProgress(/*Int*/total, /*Int*/received) {
        var percentage = received * 100 / total;
        if (_win)
            _win.webContents.send('set-dl-status', 'dl ' + Math.floor(percentage) + '%');
        return (percentage);
    }

    return {

        pickSaveDirectory : function(/*String - Optional*/name) {
        	var folder = dialog.showSaveDialog({
        		  title: 'Select a location to save your MP3',
        		  defaultPath: name
        	});
        	return folder;
        },

        dlFromYoutube2Mp3 : function(/*string*/saveLocation) {

        },

        dlFromSoundCloud2Mp3 : function(/*String*/url, /*String - Optional*/saveLocation) {

            var self = this;
            return new Promise(function(resolve, reject) {

                https.get('https://api.soundcloud.com/resolve?url=' + url + '&client_id=' + _sc_key, function (res) {
                    res.on('data', (data) => {

                        data = JSON.parse(data);
                        if (data.errors) reject(datas.errors[0].error_message);

                        var redirect = data.location;

                        https.get(redirect, (res) => {
                            res.on('data', (data) => {

                                data = JSON.parse(data);
                                console.log('data', data)
                                if (data.errors) reject(datas.errors[0].error_message);

                                var item = {id:data.id, stream_url:data.stream_url, artwork_url:data.artwork_url,
                                    title:data.title, artist:data.user.username};

                                    https.get(item.stream_url + '?client_id=' + _sc_key, function(res) {
                                        var output_filename = saveLocation,
                                            redirect = res.headers.location,
                                            received_bytes = 0,
                                            total_bytes = 0;

                                        request.head(redirect, function(err, res, body) {
                                            total_bytes = parseInt(res.headers['content-length']);

                                            https.get(redirect, (res) => { // start downloading

                                                var output = fs.createWriteStream(output_filename);
                                                if (_win)
                                                    _win.webContents.send('dl-started', item);

                                                res.on('data', (chunk) => { // receive chunk of the music data
                                                    received_bytes += chunk.length;
                                                    output.write(chunk);
                                                    dlProgress(total_bytes, received_bytes);
                                                    // console.log('' + dlProgress(total_bytes, received_bytes) + '%');
                                                });

                                                res.on('end', () => { // download over
                                                    output.end();
                                                    ID3.removeTags(output_filename);
                                                    var meta_written = ID3.write({ artist:item.artist, title:item.title, album:'' });

                                                    if (meta_written) {
                                                        // console.log('dl done');
                                                        if (_win)
                                                            _win.webContents.send('dl-finished', item);
                                                        resolve()
                                                    }
                                                });
                                            });
                                        });
                                    });
                                });
                            }).on('error', (error) => {
                                reject(error);
                            });;
                        });
                    }).on('error', (error) => {
                        reject(error);
                    });
            });
        },

        getPlaylistSize : function(urls) {
            var self = this,
                totSize = 0

            return new Promise(function(resolve, reject) {
                urls.forEach(function(url, i, a) {
                    self.getMusicSize(url).then(function(musSize) {
                        totSize += musSize
                    }).on('error', (error) => {
                        reject(error)
                    });
                });
                resolve(totSize)
            })
        },

        getMusicSize : function(url) {
            return new Promise(function(resolve, reject) {

                https.get('https://api.soundcloud.com/resolve?url=' + url + '&client_id=' + _sc_key, function (res) {
                    res.on('data', (data) => {

                        data = JSON.parse(data);
                        if (data.errors) reject(datas.errors[0].error_message);

                        var redirect = data.location;

                        https.get(redirect, (res) => {
                            res.on('data', (data) => {

                                data = JSON.parse(data);
                                if (data.errors) reject(datas.errors[0].error_message);
                                    https.get(item.stream_url + '?client_id=' + _sc_key, function(res) {
                                        request.head(redirect, function(err, res, body) {
                                            resolve(parseInt(res.headers['content-length']))
                                        });
                                    });
                                });
                            }).on('error', (error) => {
                                reject(error);
                            });;
                        });
                    }).on('error', (error) => {
                        reject(error);
                    });
            });
        },

    };
};
