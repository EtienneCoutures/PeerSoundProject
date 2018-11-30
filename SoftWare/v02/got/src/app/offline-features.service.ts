import { Injectable } from '@angular/core';
import { ElectronService } from './providers/electron.service';
import { PlaylistService } from './playlist/playlist.service';
import { Observable, of } from 'rxjs';
import { Music } from './music/music';
import { Playlist } from './playlist/playlist';

@Injectable({
  providedIn: 'root'
})
export class OfflineFeaturesService {

  ipcRenderer: any
  isOfflineModeOn: boolean = false
  // isPlaylistOpened: boolean = false
  // isPlaylistOpening: boolean = false
  // isPlaylistLoaded: boolean = false
  // isPlaylistLoading: boolean = false
  musics: Music[] = []


  constructor(public electronService: ElectronService, public plService: PlaylistService) {
    this.ipcRenderer = electronService.ipcRenderer

    this.ipcRenderer.on('offline-load-playlist-ok', (event, data) => {
      // console.log('cul offline-load-playlist-ok')
    })

    this.ipcRenderer.on('offline-get-musics-request-ok', (event, data: any) => {
      this.musics.length = 0
      if (data.plName != plService.selectedPl.playlist_name) {
        // this.cancelMusicsLoading(data.plName)
        // console.log('cul c\'est quoi ce bordel', data.plName)
      }
      else {
        // if (plService.musics) {
        //   plService.musics.forEach((mus) => {
        //
        //   })
      }
      // console.log('cul offline-get-musics-request-ok', data.plName)
      // console.log('cul ', data.musics)
      // var res = plService.musics.find((elem): boolean => {
        // console.log(plService.selectedPl.MusicLink[0].Music.music_url)
      //   return (true)
      // })
      console.log('cul data', data.musics)
      data.musics.forEach((music) => {
        // if (plService.selectedPl) {
        var url = plService.selectedPl.MusicLink.find((elem) => {
          return elem.Music.music_name === music._name
        }).Music.music_url

        if (url) {
          this.musics.push(new Music(music, url))
        }
      })
    })

    this.ipcRenderer.on('dl-status-update', (event, data) => {
      console.log('cul dl-status-update', data)

      if (data.update == 'dl-start') {
        var mus = this.musics.find((elem) => {
          return elem.music_url == data.url
        })
        if (mus)
          mus.isDownloading = true
      }

      if (data.update == 'dl-progress') {
        var mus = this.musics.find((elem) => {
          return elem.music_url == data.url
        })
        if (mus && Math.round(data.progress) != mus.dlProgress)
          mus.dlProgress = Math.round(data.progress)
      }

      if (data.update == 'dl-end') {
        var mus = this.musics.find((elem) => {
          return elem.music_url == data.url
        })
        if (mus) {
          mus.isOfflineAvailable = true
          mus.isDownloading = false
        }
      }
    })

    this.ipcRenderer.on('offline-get-musics-request-ko', (event, data) => {
      // console.log('cul offline-get-musics-request-ko')
      this.musics.length = 0
    })
  }

  loadPspFile(pl: Playlist): void {
    // console.log('cul load new playlist')
    this.musics.length = 0
    this.ipcRenderer.send('offline-load-playlist', {pl: pl})
  }

  getMusicsRequest(plName: string): void {
    this.ipcRenderer.send('offline-get-musics-request', {plName: plName})

  }

  cancelMusicsLoading(plName: string): void {
    this.ipcRenderer.send('offline-cancel-musics-loading', {plName: plName})
  }

  dlMusic(music: Music) {
    console.log('cul dl music', music)
    this.ipcRenderer.send('offline-dl-music', {plName: this.plService.selectedPl.playlist_name, music: music })
  }

  reset(): void {
    this.ipcRenderer.send('offline-reset')
    this.musics.length = 0
  }
}
