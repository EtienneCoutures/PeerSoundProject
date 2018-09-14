let colors = require("colors");

module.exports = function(options) {

  return new Promise((resolve, reject) => {

    const protocol = /https/.test(options.protocol) ? require('https')
                                                    : require('http');

    const request = protocol.request(options, (res) => {

      if (res.statusCode < 200 || res.statusCode > 299) {
         reject(new Error(`Request failed, status code: ${res.statusCode}`));
       }

       const body = [];

      res.on('data', (chunk) => body.push(chunk));
      res.on('end', () => resolve(body.join('')));

      res.on('error', (err) => reject(err));
    })

    request.on('socket', (socket) => {
      let timeout = 1000;
      socket.setTimeout(timeout);
      socket.on('timeout', () => {
        request.abort();
        reject(`Socket timeout after ${timeout} ms.`);
      })
    })

    request.on('error', (err) => reject(err));
    request.on('uncaughtException', (err) => reject(err));

    request.end();
  })

};
