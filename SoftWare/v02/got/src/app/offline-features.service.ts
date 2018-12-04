import { Injectable } from '@angular/core';
import { PlaylistService } from './playlist/playlist.service';
import { Music } from './music/music';
import { Playlist } from './playlist/playlist';
import { OfflineFeaturesHandler } from '../offline-playlist-src/offline-features-handler'
import { MusicEntry } from '../offline-playlist-src/music-entry'

@Injectable({
  providedIn: 'root'
})
export class OfflineFeaturesService {

  offline: any = new OfflineFeaturesHandler(undefined)
  isOfflineModeOn: boolean = false
  musics: Music[] = []

  constructor(public plService: PlaylistService) {

  }

  loadPlaylistMetadata(pl: Playlist) {
    this.musics.length = 0 // empty music list array
    this.offline.loadPspFile(pl).then((inputs: MusicEntry[]) => { // get psp file metadata
      inputs.forEach((music) => {
        var url = this.plService.selectedPl.MusicLink.find((elem) => { // try to get music url from online music array
          return elem.Music.music_name === music._name
        }).Music.music_url
        this.musics.push(new Music(music, url)) // convert MusicEntry type to Music type and add it to list
      })
    }, (err) => {
      console.error('error while loading playlist "' + pl.playlist_name + '" in offline mode : ' + err)
    })
  }

  dlMusic(music: Music) {
    console.log('dl music')
    this.offline.dlMusicToPspFile(this.plService.selectedPl.playlist_name, music)
  }

  reset() {

  }
}
