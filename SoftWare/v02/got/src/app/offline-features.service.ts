import { Injectable } from '@angular/core';
import { PlaylistService } from './playlist/playlist.service';
import { Music } from './music/music';
import { Playlist } from './playlist/playlist';
import { OfflineFeaturesHandler } from '../offline-playlist-src/offline-features-handler'
import { MusicEntry } from '../offline-playlist-src/music-entry'
// const yturl = require("js-video-url-parser")

@Injectable({
  providedIn: 'root'
})
export class OfflineFeaturesService {

  private offline: any = new OfflineFeaturesHandler(undefined)
  public isOfflineModeOn: boolean = false
  public musics: Music[] = []
  public isDownloading: boolean = false

  constructor(public plService: PlaylistService) {
    this.offline.on('dl-status-update', (data) => {
      if (data.update == 'dl-start') {
        var mus = this.musics.find((elem) => {
          return elem.music_name == data.music.music_name
        })
        if (mus) {
          mus.isDownloading = true
          this.isDownloading = true
        }
      }

      if (data.update == 'dl-progress') {
        var mus = this.musics.find((elem) => {
            // console.log(elem.music_url, data.url)
            return elem.music_name == data.music.music_name
        })
        // console.log('mus found', mus, data.url)
        if (mus && Math.round(data.progress) != mus.dlProgress) {
          mus.dlProgress = Math.round(data.progress)
          // console.log('update dl progress')
        }
      }

      if (data.update == 'dl-end') {
        var mus = this.musics.find((elem) => {
          return elem.music_name == data.music.music_name
        })
        if (mus) {
          mus.isOfflineAvailable = true
          mus.isDownloading = false
          this.isDownloading = false
          // mus.music_source = 'local'
        }
      }
    })
  }

  loadPlaylistMetadata(pl: Playlist) {
    this.musics.length = 0 // empty music list array
    this.offline.loadPspFile(pl).then((inputs: MusicEntry[]) => { // get psp file metadata

      // console.log('music entry', inputs)
      // console.log('music', this.plService.selectedPl.MusicLink)
      inputs.forEach((music) => {
        // console.log('ici', i)
        var elem = this.plService.selectedPl.MusicLink.find((elem) => { // try to get music url from online music array
          // console.log('la', elem)
          return elem.music_name === music._name
        })
        // console.log('elem found', elem)
        // console.log('elem found', music)
        if (elem != undefined)
          this.musics.push(Music.getMusFromMusicEntry(music, elem.music_url, elem.music_source)) // convert MusicEntry type to Music type and add it to list
      })
      // console.log('off musics', this.musics)
    }, (err) => {
      console.error('error while loading playlist "' + pl.playlist_name + '" in offline mode : ' + err)
    })
  }

  dlMusic(music: Music) {
    // console.log('dl music')
    this.offline.dlMusicToPspFile(this.plService.selectedPl.playlist_name, music)
  }

  setOfflineModeOn(value: boolean) {
    this.isOfflineModeOn = value
  }

  switchOfflineMode() {
    this.isOfflineModeOn = !this.isOfflineModeOn
  }

  extractMusicFile(music: Music): Promise<any> {
    return this.offline.extractMusicFile(this.plService.selectedPl.playlist_name, music)
  }

  reset() {

  }
}
