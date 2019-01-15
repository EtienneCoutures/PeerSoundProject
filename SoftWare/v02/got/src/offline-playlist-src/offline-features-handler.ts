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
      var filename: string = 'tmp' + music.music_id
      // filename = filename.replace(/- */g, '_')
      var isMusInFile: any = pspFile.getMusicMetadataByName(music.music_name).isInFile
      let filepath: string = saveDirPath + filename + '.mp3'

      if (isMusInFile == 'false' || isMusInFile == false) {

        this._downloader.dlLink2Mp3(saveDirPath, filename, music.music_url, music.music_source, music).then(() => { // start dl

          var pos = pspFile.getMusicMetadataByName(music.music_name).pos // pas opti !!!!
          pspFile.addMusicFile(filepath, pos, music.music_name, false).then(() => { // add music to header
            pspFile.save().then(() => { // pack mp3 to zip file
              fs.unlink(filepath, (err: any) => { // del mp3 file

                if (err)
                  throw new Error(err);
              })
            }, (err) => {
              // console.log(err)
              throw new Error(err)
            })
          }, (err) => {
            // console.log(err)
            throw new Error(err);
          })
        }, (err) => {
          // this.win.webContents.send('set-dl-status', 'dl failed')
          // console.log(err)
          throw new Error(err);
        })
      } else {
        // console.log('???')
        // fs.unlink(filepath, () => {}) // del mp3 file
      }
    }, (err) => {
      // console.log('??? ->', err)
      // this.win.webContents.send('set-dl-status', 'dl failed ')
      throw new Error(err);
    });
  }

  private getPspFile(name: string): OfflinePlaylist {
    // var file = null

    if (!this._pspFilesOpened.hasOwnProperty(name)) {
      // console.log('add new psp file to opened list')
      this._pspFilesOpened[name] = new OfflinePlaylist()
    }
    // else
    //   console.log('get psp file ', this._pspFilesOpened[name].name)

    return this._pspFilesOpened[name]
  }

  loadPspFile(pl: any): Promise<any> {
    return new Promise((resolve, reject) => {

      let pspFile = this.getPspFile(pl.playlist_name)
      if (pspFile.isOpened) // file already loaded
        resolve(pspFile.getMusicsMetadata())

      pspFile.open('./', pl.playlist_name, true).then(() => { // create file if doesn't exist
        pl.MusicLink.forEach((m, i) => { // fill header width musics metadata
          pspFile.header.addMusic('', i, m.music_name, false)
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
      var pos = pspFile.getMusicMetadataByName(music.music_name).pos // pas opti !!!!
      pspFile.extractMusicFile('./', pos, 'tmp').then(() => {
        resolve()
      }, (e) => {
        reject(e)
      })
    })
  }

  reloadPlaylist(pl): any[] {
    let pspFile = this.getPspFile(pl.playlist_name)
    let musAdded: any[] = []
    pl.MusicLink.forEach((m, i) => { // fill header width musics metadata
      var added = pspFile.header.addMusic('', i, m.music_name, false)
      if (added) {
        musAdded.push([added, m])
      }
    })
    return (musAdded)
  }

  reset(): void {
    this._pspFilesOpened.length = 0
    this._downloader = new MusicDownloader()
  }

}
