import * as electron from 'electron'
import * as https from 'https'
import * as fs from 'fs'
import * as path from 'path'
import * as url from 'url'
import * as ID3 from 'node-id3'
import * as request from 'request'
import * as EventEmitter from 'events'

export class MusicDownloader extends EventEmitter {

  readonly _scKey: string = 'nYw8DGbKym7Ph6LR1EaSxD8Dmj5rkCwa'
  readonly _ytKey: string = null
  bool: boolean = false

  constructor() {
    super()
  }

  pickSaveDirectory(name: string = null): any {
    return  electron.dialog.showSaveDialog({
        title: 'Select a location to save your MP3',
        defaultPath: name
    });
  }

  dlFromSoundCloud2Mp3(dest: string, filename: string, url: string): Promise<any> {
    var self = this
    console.log('from downloader: ', dest, filename, url)
    return new Promise((resolve, reject) => {
      https.get('https://api.soundcloud.com/resolve?url=' + url + '&client_id=' + self._scKey, (res: any) => {
          res.on('data', (data: any) => {
              console.log('from dowloader: http.get passed')
              data = JSON.parse(data);
              if (data.errors) reject(data.errors[0].error_message);

              var redirect = data.location;

              https.get(redirect, (res: any) => {
                  res.on('data', (data: any) => {

                      data = JSON.parse(data);
                      // console.log('data', data)
                      if (data.errors)
                        reject(data.errors[0].error_message);

                      var item = {id:data.id, stream_url:data.stream_url, artwork_url:data.artwork_url,
                          title:data.title, artist:data.user.username};

                          https.get(item.stream_url + '?client_id=' + self._scKey, function(res) {
                              var output_filename = dest + filename + '.mp3',
                                  redirect = res.headers.location,
                                  received_bytes = 0,
                                  total_bytes = 0;

                              request.head(redirect, function(err, res, body) {
                                  total_bytes = parseInt(res.headers['content-length']);
                                  // err -> del file ?
                                  https.get(redirect, (res) => { // start downloading

                                      var output = fs.createWriteStream(output_filename);
                                      self.emit('dl-status-update', {update: 'dl-start', url:url})

                                      res.on('data', (chunk) => { // receive chunk of the music data
                                          received_bytes += chunk.length;
                                          output.write(chunk);

                                          var progress = received_bytes * 100 / total_bytes

                                          // if (progress > 5 && !this.bool) {
                                          //   this.bool = true
                                          //   reject('blabla')
                                          // }
                                          self.emit('dl-status-update', {update: 'dl-progress', progress: progress, url:url})
                                      });

                                      res.on('end', () => { // download over
                                          output.end();
                                          ID3.removeTags(output_filename);
                                          var meta_written = ID3.write({ artist:item.artist, title:item.title, album:'' });

                                          if (meta_written) {
                                              self.emit('dl-status-update', {update: 'dl-end', url:url})
                                              resolve()
                                          }
                                      });
                                  }).on('error', (err) => {
                                    // err -> del file ?
                                    reject(err)
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
    })
  }
}
