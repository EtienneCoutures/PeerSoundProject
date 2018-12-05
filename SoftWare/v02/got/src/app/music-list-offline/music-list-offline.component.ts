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
      if (this.plService.selectedMusic !== music) {
        this.offlineService.extractMusicFile(music)
        this.plService.isPlaying = true;
        this.plService.selectedMusic = music;
        this.playOfflineMusic.emit(music);
      } else {
        this.plService.isPlaying = !this.plService.isPlaying;
        this.playOfflineMusic.emit(music);
      }
    }
  }

  loadMusicsFromPspFile() {
    // this.offlineService.getMusicsRequest(this.playlist.playlist_name)
  }

  dlMusic(music: Music) {
    console.log('from dlMusic', music)
    this.offlineService.dlMusic(music)
  }
}
