var baseURL = "localhost";
var https = require("https");
//var colors = require("colors");

class requestManager {

  constructor() {};

  request (url, options, data, next) {
    console.log('NEW REQUEST:', options.path);
    var self = this;

    var req = https.request(options, function (res) {
      console.log('REQUEST RES:', res);
      var chunks = [];

      res.on('data', function (chunk) {
        console.log('RECEIVING DATA');
        chunks.push(chunk);
      });

      res.on('end', function () {
        console.log('RECEIVED RES END');

        var body = Buffer.concat(chunks);
        var rslt = {rslt : JSON.parse(body.toString()), res : res};
        console.log('SENDING RES RSLT');
        next(rslt, req, null);
      });

      res.on('error', function(e) {
      //  console.log(colors.cyan('response error Retrying request...'));
        self.request(url, options, data, next);
      })
    });

    if (data) {
      req.write(data);
    }

    req.on('socket', function (socket) {
      console.log('CONNECTED TO SOCKET');
    socket.setTimeout(1000);
    socket.on('timeout', function() {
      console.log('TIMEOUT');
        req.abort();
    });
  });

    req.end();
    console.log('req : ', req);

    req.on('error', function (e) {
      console.log('ERREUR: ', e);
      //console.log(colors.red('request error Retrying request...'));
      self.request(url, options, data, next);
      //self.request(url, path, port, headers, method, next);
      // next(null, e);
      self.request(url, options, data, next);
    });

    req.on('uncaughtException', function (e) {
      //console.log(color.red('Uncaught Exception, retrying request...'))
      self.request(url, options, data, next);
      //self.request(url, path, port, headers, method, next);
      self.request(url, options, data, next);
    });


    //req.end();
  };

}

module.exports = new requestManager();
