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
      this._win.webContents.send('dl-status-update', data)
    })
  }

  dlMusicToPspFile(plName, music: Music): void {
    let saveDirPath: string = './'
    var pspFile: OfflinePlaylist = this.getPspFile(plName)
    console.log('go dl mus')
    pspFile.open(saveDirPath, plName, false).then(() => {
      // this.win.webContents.send('set-dl-status', 'dl-init...');
      let filepath: string = saveDirPath + music.music_name + '.mp3'
      var isMusInFile: any = pspFile.getMusicMetadataByName(music.music_name).isInFile
      console.log('1from dl : ', isMusInFile)
      console.log('2from dl : ', (isMusInFile === false))
      console.log('3from dl : ', (isMusInFile == false))
      console.log('4from dl : ', (isMusInFile == true))
      console.log('5from dl : ', (isMusInFile === true))
      console.log('6from dl : ', (isMusInFile == 'false'))
      console.log('7from dl : ', (isMusInFile === 'false'))
      console.log('8from dl : ', (isMusInFile == 'true'))
      console.log('9from dl : ', (isMusInFile === 'true'))

      if (isMusInFile == 'false' || isMusInFile == false) {
        this._win.webContents.send('dl-status-update', {update: 'connecting to source provider...'})

        console.log('download')
        this._downloader.dlFromSoundCloud2Mp3(saveDirPath, music.music_name, music.music_url).then(() => { // start dl
          this._win.webContents.send('dl-status-update', {update:'packing'});
          pspFile.addMusicFile(filepath, music.music_id, music.music_name, false).then(() => { // add music to header
            pspFile.save().then(() => { // pack mp3 to zip file
              fs.unlink(filepath, (err: any) => { // del mp3 file
                if (err)
                  throw new Error(err);
                // this.win.webContents.send('set-dl-status', 'offline-available');
              })
            })
          })
        }, (err) => {
          // this.win.webContents.send('set-dl-status', 'dl failed')
          console.log(err)
          throw new Error(err);
        })
      } else {
        fs.unlink(filepath, () => {}) // del mp3 file
      }
    }, (err) => {
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


  loadPspFile(pl: any): void {
    let pspFile = this.getPspFile(pl.playlist_name)
    // self.changeCurPspFile(pl.playlist_name)

    if (pspFile.isOpened) {
      this._win.webContents.send('offline-load-playlist-ok')
      return ;
    }

    pspFile.open('./', pl.playlist_name, true).then((da) => {
      pl.MusicLink.forEach((m, i) => {
        pspFile.header.addMusic('', m.music_id - 1, m.Music.music_name, false)
      })
      pspFile.save().then(() => {
        this._win.webContents.send('offline-load-playlist-ok')
      }, (err) => {
        console.log(err)
        this._win.webContents.send('offline-load-playlist-ko', err)
      })
    }, (err) => {
      console.log(err)
      this._win.webContents.send('offline-load-playlist-ko', err)
    })
  }

  sendMusics(plName: string): void {

    // new Promise((resolve, reject) => {
      let pspFile = this.getPspFile(plName)
      // console.log(pspFile.name)
      let timeElapsed = 0
      let interval: any
      let name = plName
      var self = this

      // console.log('isOpened | isOpening ', pspFile.isOpened, pspFile.isOpening)

      if (pspFile.isOpening || pspFile.isOpened) {
        // if (pspFile.isOpening)
        // console.log('waiting file to be opened')
        interval = setInterval(() => {

          let musics = pspFile.getMusicsMetadata()
          // self.once('stop', (data) => {
          //   if (data.plName == name)
          //     clearInterval(interval)
          // })
          timeElapsed += 50
          // console.log(timeElapsed, pspFile.isOpening, pspFile.name, name, musics.length, pspFile.getMusicsMetadata.length)
          if (pspFile.isOpened) {
            self._win.webContents.send('offline-get-musics-request-ok', {musics: musics, plName: name})
            clearInterval(interval)
            // console.log('wtf')
          }
        }, 50)
      }
      else {
        // console.log('echec critique', plName)
        self._win.webContents.send('offline-get-musics-request-ko')
        // reject()
      }
    // }).then(() => {

    // })
  }

  cancelSendMusicsRequest(plName: string): void {
    // this.emit('stop', {plName: plName})
  }

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
