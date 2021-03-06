import * as electron from 'electron'
import * as https from 'https'
import * as fs from 'fs'
import * as path from 'path'
import * as url from 'url'
import * as ID3 from 'node-id3'
import * as request from 'request'
import * as EventEmitter from 'events'
const ytdl = require('ytdl-core')
const yturl = require("js-video-url-parser")
import { Music } from '../app/music/music'
const dataurl = require('dataurl')
var YoutubeMp3Downloader = require("youtube-mp3-downloader")


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

  dlLink2Mp3(dest: string, filename: string, url: string, platform: string, music: Music): Promise<any> {
    if (platform == 'youtube')
      return this.dlFromYoutube2Mp3(dest, filename, url, music)
    else if (platform == 'soundcloud')
      return this.dlFromSoundCloud2Mp3(dest, filename, url, music)
    else {
      // return this.dlFromYoutube2Mp3(dest, filename, url)
      return new Promise((resolve, reject) => {
        reject('t\'a cru ct noel')
      })
    }
  }


  dlFromYoutube2Mp3(dest: string, filename: string, url: string, music: Music): Promise<any> { // ffmpeg dependent
    var self = this
    var url = 'http://www.youtube.com/watch?v=' + yturl.parse(url).id

    return new Promise((resolve, reject) => {
      var YD = new YoutubeMp3Downloader({
        "ffmpegPath": "./ffmpeg/bin/ffmpeg.exe", // Where is the FFmpeg binary located?
        "outputPath": "./", // Where should the downloaded and encoded files be stored?
        "youtubeVideoQuality": "highest",
        "queueParallelism": 2, // How many parallel downloads/encodes should be started?
        "progressTimeout": 200 // How long should be the interval of the progress reports
      });

      YD.download(yturl.parse(url).id, filename + '.mp3');
      self.emit('dl-status-update', {update: 'dl-start', url:url, music:music})

      YD.on("finished", function(err, data) {
        self.emit('dl-status-update', {update: 'dl-end', url:url, music:music})
        resolve()
      });

      YD.on("error", function(error) {
        reject(error)
      });

      YD.on("progress", function(data) {
        self.emit('dl-status-update', {update: 'dl-progress', progress: data.progress.percentage, url:url, music:music})
      });
    })
  }

  dlFromSoundCloud2Mp3(dest: string, filename: string, url: string, music: Music): Promise<any> {
    var self = this

    return new Promise((resolve, reject) => {
      https.get('https://api.soundcloud.com/resolve?url=' + url + '&client_id=' + self._scKey, (res: any) => {
          res.on('data', (data: any) => {
              data = JSON.parse(data);
              if (data.errors) reject(data.errors[0].error_message);

              var redirect = data.location;

              https.get(redirect, (res: any) => {
                  res.on('data', (data: any) => {

                      data = JSON.parse(data);
                      if (data.errors)
                        reject(data.errors[0].error_message);
                      var item = {id:data.id, stream_url:data.stream_url, artwork_url:data.artwork_url,
                          title:data.title, artist:(data.user ? data.user.username : 'unknown')};
                      if (item.stream_url == undefined) {
                        reject('url pointing to redirecting to artist instead of a specific music')
                      }

                          https.get(item.stream_url + '?client_id=' + self._scKey, function(res) {
                            console.log(res)
                            console.log(res.headers)
                              var output_filename = dest + filename + '.mp3',
                                  redirect = res.headers.location,
                                  received_bytes = 0,
                                  total_bytes = 0;

                              request.head(redirect, function(err, res, body) {
                                  total_bytes = parseInt(res.headers['content-length']);
                                  // err -> del file ?
                                  https.get(redirect, (res) => { // start downloading

                                      var output = fs.createWriteStream(output_filename);
                                      self.emit('dl-status-update', {update: 'dl-start', url:url, music:music})

                                      res.on('data', (chunk) => { // receive chunk of the music data
                                          received_bytes += chunk.length;
                                          output.write(chunk);

                                          var progress = received_bytes * 100 / total_bytes
                                          self.emit('dl-status-update', {update: 'dl-progress', progress: progress, url:url, music:music})
                                      });

                                      res.on('end', () => { // download over
                                          output.end();
                                          ID3.removeTags(output_filename);
                                          var meta_written = ID3.write({ artist:item.artist, title:item.title, album:'' });

                                          if (meta_written) {
                                              self.emit('dl-status-update', {update: 'dl-end', url:url, music:music})
                                              resolve()
                                          }
                                      });
                                  }).on('error', (err) => {
                                    // err -> del file ?
                                    reject(err)
                                  });
                              });
                          }).on('error', (e) => {
                            console.error(e);
                            reject(e)
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

  dlFromYoutube2Mp3Ytdl(dest: string, filename: string, url: string, music: Music): Promise<any> { // slow
    var self = this
    var url = 'http://www.youtube.com/watch?v=' + yturl.parse(url).id

    return new Promise((resolve, reject) => {

      const r = ytdl(url, { filter : 'audioonly', quality : 'highestaudio'})
      const w = fs.createWriteStream(dest + filename + '.mp3');

      r.on('readable', function() {
        self.emit('dl-status-update', {update: 'dl-start', url:url, music:music})
      })

      r.on('progress', function(chunck, received_bytes, total_bytes) {
        var progress = received_bytes * 100 / total_bytes
        self.emit('dl-status-update', {update: 'dl-progress', progress: progress, url:url, music:music})
      })

      r.on('end', () => {
        // console.log('read end')
      })

      w.on('finish', () => {
        // console.log('write end')
        self.emit('dl-status-update', {update: 'dl-end', url:url, music:music})
        resolve()
      })

      r.pipe(w)
    })
  }

}
