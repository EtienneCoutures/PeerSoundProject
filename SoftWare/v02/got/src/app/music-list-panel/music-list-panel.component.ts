import { Component, OnInit, OnChanges, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { PlaylistService } from '../playlist/playlist.service';
import { ElectronService } from '../providers/electron.service';
import { Music } from '../music/music';
import { EventsComponent, Event } from '../events/events.component';
import { EventService } from '../event.service';
import { Playlist } from '../playlist/playlist'
import { OfflineFeaturesService } from '../offline-features.service'

@Component({
  selector: 'app-music-list-panel',
  templateUrl: './music-list-panel.component.html',
  styleUrls: ['./music-list-panel.component.scss']
})

export class MusicListPanelComponent implements OnInit, OnChanges {

  @Output() playMusic: EventEmitter<Music> = new EventEmitter()
  @Input() playlist: Playlist

  private isOffline: boolean = false
  private ipcRenderer: any = null

  constructor(private plService: PlaylistService,
              public offlineService: OfflineFeaturesService) {
  }

  ngOnInit() {
    // console.log('cul music panel oninit')
  }

  ngOnChanges(changes: any) {
    // console.log('cul music list panel changes', changes)

    // if new playlist opened -> load & update its associated psp file

    var prevPlaylist: Playlist = null
    var currPlaylist: Playlist = null

    if (changes.playlist) {
      prevPlaylist = changes.playlist.previousValue
      currPlaylist = changes.playlist.currentValue
    }

    if (currPlaylist && (prevPlaylist == null || prevPlaylist.playlist_name !== currPlaylist.playlist_name)) {
      // this.offlineService.loadPspFile(currPlaylist)
      this.offlineService.loadPlaylistMetadata(currPlaylist)

      // if offline mode activated on playlist change, load its offline musics
      // if (this.isOffline) {
      //   this.offlineService.loadMusics(this.playlist.playlist_name)
      // }
    }
  }

  dlFullPlaylist(): void {

  }

  playMusicEvent(music: Music): void {
    console.log('playMusicEvent')
    this.playMusic.emit(music)
  }
}
