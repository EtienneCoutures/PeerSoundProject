import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { Music } from '../music/music'
import { Playlist } from '../playlist/playlist'
import { OfflineFeaturesService } from '../offline-features.service'
import { PlaylistService } from '../playlist/playlist.service';

@Component({
  selector: 'app-music-list-offline',
  templateUrl: './music-list-offline.component.html',
  styleUrls: ['./music-list-offline.component.scss']
})
export class MusicListOfflineComponent implements OnInit, OnChanges {

  @Input() playlist: Playlist = null
  // @Input() musics: Music[]
  @Output() playOfflineMusic: EventEmitter<Music> = new EventEmitter();

  constructor(public offlineService: OfflineFeaturesService,
              private plService : PlaylistService) {

  }

  ngOnInit() {
    // console.log('cul', 'offline component onInit')

  }

  ngOnChanges() {
    // this.offlineService.
    // console.log('cul', 'offline component OnChanges')
    // this.loadMusicsFromPspFile()
  }

  playMusicEvent(music: Music) {
    if (music.isOfflineAvailable) {
      if ((this.plService.selectedMusic && this.plService.selectedMusic != music) ||
          !this.plService.selectedMusic) {

        music.isExtractedPromise = new Promise((res, rej) => {
          this.offlineService.extractMusicFile(music).then(() => { // extract file
            res()
          }, (err) => {
            rej(err)
          })
        })
        this.playOfflineMusic.emit(music);
      } else {
        this.playOfflineMusic.emit(music);
      }
    }
  }

  isSelected(music: Music) {
    return this.plService.selectedMusic == music
    // if (!this.plService.selectedMusic)
    //   return false
    // return music.music_name == this.plService.selectedMusic.music_name && this.plService.selectedMusic.isLocalFile
  }

  dlMusic(music: Music) {
    this.offlineService.dlMusic(music)
  }
}
