//         .eu.
import { OfflinePlaylist } from './offline-playlist'
import { OfflinePlaylistHeader } from './offline-playlist-header'
import { MusicDownloader } from './music-downloader'
import { MusicEntry } from './music-entry'
import { app, BrowserWindow, ipcMain} from 'electron'
import { Playlist } from '../app/playlist/playlist'
import { Music } from '../app/music/music'
import * as fs from 'fs'
import * as EventEmitter from 'events'

export class OfflineFeaturesHandler extends EventEmitter {

  // private _curPspFile: OfflinePlaylist = null
  // private _curPspHeader: OfflinePlaylistHeader = null
  private _downloader: MusicDownloader = new MusicDownloader()
  private _pspFilesOpened: any = {}
  // private _isOpeningFile: boolean = false
  // private _

  constructor(private _win: any) {
    super()
    this._downloader.on('dl-status-update', (data) => {
      this.emit('dl-status-update', data)
    })
  }

  dlMusicToPspFile(plName: string, music: Music): void {
    let saveDirPath: string = './'
    var pspFile: OfflinePlaylist = this.getPspFile(plName)

    pspFile.open(saveDirPath, plName, false).then(() => {
      // this.win.webContents.send('set-dl-status', 'dl-init...');
      var filename: string = 'tmp' + music.music_id
      // filename = filename.replace(/- */g, '_')
      var isMusInFile: any = pspFile.getMusicMetadataByName(music.music_name).isInFile
      let filepath: string = saveDirPath + filename + '.mp3'
      // console.log('ici', )

      if (isMusInFile == 'false' || isMusInFile == false) {
        // this._win.webContents.send('dl-status-update', {update: 'connecting to source provider...'})

        this._downloader.dlLink2Mp3(saveDirPath, filename, music.music_url, music.music_source, music).then(() => { // start dl
          // this._win.webContents.send('dl-status-update', {update:'packing'});

          pspFile.addMusicFile(filepath, music.music_id, music.music_name, false).then(() => { // add music to header
            pspFile.save().then(() => { // pack mp3 to zip file
              fs.unlink(filepath, (err: any) => { // del mp3 file

                if (err)
                  throw new Error(err);
                // this.win.webContents.send('set-dl-status', 'offline-available');
              })
            }, (err) => {
              console.log(err)

              throw new Error(err)
            })
          }, (err) => {
            // this.win.webContents.send('set-dl-status', 'dl failed')
            console.log(err)
            throw new Error(err);
          })
        }, (err) => {
          // this.win.webContents.send('set-dl-status', 'dl failed')
          console.log(err)
          throw new Error(err);
        })
      } else {
        console.log('???')
        // fs.unlink(filepath, () => {}) // del mp3 file
      }
    }, (err) => {
      console.log('??? ->', err)
      // this.win.webContents.send('set-dl-status', 'dl failed ')
      throw new Error(err);
    });
  }

  // private changeCurPspFile(name: string): void {
  //   var file = null
  //
  //   if (this._curPspFile && name == this._curPspFile.name)
  //     return
  //
  //   if (!this._pspFilesOpened.hasOwnProperty(name))
  //     file = this._pspFilesOpened[name] = new OfflinePlaylist()
  //   else
  //     file = this._pspFilesOpened[name]
  //
  //   this._curPspFile = file
  //   this._curPspHeader = file.header
  // }

  private getPspFile(name: string): OfflinePlaylist {
    var file = null

    if (!this._pspFilesOpened.hasOwnProperty(name)) {
      console.log('add new psp file to opened list')
      this._pspFilesOpened[name] = new OfflinePlaylist()
    }
    else
      console.log('get psp file ', this._pspFilesOpened[name].name)

    //   file = this._pspFilesOpened[name]

    return this._pspFilesOpened[name]
  }


  loadPspFile(pl: any): Promise<any> {
    return new Promise((resolve, reject) => {

      let pspFile = this.getPspFile(pl.playlist_name)
      if (pspFile.isOpened) // file already loaded
        resolve(pspFile.getMusicsMetadata())

      pspFile.open('./', pl.playlist_name, true).then(() => { // create file if doesn't exist
        pl.MusicLink.forEach((m, i) => { // fill header width musics metadata
          pspFile.header.addMusic('', i, m.Music.music_name, false)
        })
        pspFile.save().then(() => { // save file as archive
          resolve(pspFile.getMusicsMetadata())
        }, (err) => { reject(err) })
      }, (err) => { reject(err) })
    });
  }

  extractMusicFile(plName: string, music: Music): Promise<any> {

    return new Promise((resolve, reject) => {
      var pspFile: OfflinePlaylist = this.getPspFile(plName)
      pspFile.extractMusicFile('./', music.music_id, 'tmp').then(() => {
        resolve()
      }, (e) => {
        reject(e)
      })
    })
  }

  // sendMusics(plName: string): void {
  //
  //   // new Promise((resolve, reject) => {
  //     let pspFile = this.getPspFile(plName)
  //     // console.log(pspFile.name)
  //     let timeElapsed = 0
  //     let interval: any
  //     let name = plName
  //     var self = this
  //
  //     // console.log('isOpened | isOpening ', pspFile.isOpened, pspFile.isOpening)
  //
  //     if (pspFile.isOpening || pspFile.isOpened) {
  //       // if (pspFile.isOpening)
  //       // console.log('waiting file to be opened')
  //       interval = setInterval(() => {
  //
  //         let musics = pspFile.getMusicsMetadata()
  //         // self.once('stop', (data) => {
  //         //   if (data.plName == name)
  //         //     clearInterval(interval)
  //         // })
  //         timeElapsed += 50
  //         // console.log(timeElapsed, pspFile.isOpening, pspFile.name, name, musics.length, pspFile.getMusicsMetadata.length)
  //         if (pspFile.isOpened) {
  //           // self._win.webContents.send('offline-get-musics-request-ok', {musics: musics, plName: name})
  //           clearInterval(interval)
  //           // console.log('wtf')
  //         }
  //       }, 50)
  //     }
  //     else {
  //       // console.log('echec critique', plName)
  //       // self._win.webContents.send('offline-get-musics-request-ko')
  //       // reject()
  //     }
  //   // }).then(() => {
  //
  //   // })
  // }
  //
  // cancelSendMusicsRequest(plName: string): void {
  //   // this.emit('stop', {plName: plName})
  // }

  reset(): void {
    for (let plName in this._pspFilesOpened) {
      if (this._pspFilesOpened[plName]._interval)
        // clearInterval(this._pspFilesOpened[plName]._interval)
        delete this._pspFilesOpened[plName]
        this._downloader = new MusicDownloader()
    }
  }

}









// pspFile._interval = setInterval(() => {
//   var music = musics[index]
//
//   if (music)
//     this._win.webContents.send('offline-music-metadata', {plName: pspFile.name, music: music})
//   index += 1
//   // console.log('i ->', index)
//   if (index >= musics.length) {
//     this._win.webContents.send('playlist-offline-mode-on-ok')
//     clearInterval(pspFile._interval)
//   }
// }, 1)
