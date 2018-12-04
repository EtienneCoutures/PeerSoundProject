import { Component, OnInit, OnChanges, Input, Output } from '@angular/core';
import { ElectronService } from '../providers/electron.service';
import { Music } from '../music/music'
import { Playlist } from '../playlist/playlist'
import { OfflineFeaturesService } from '../offline-features.service'

@Component({
  selector: 'app-music-list-offline',
  templateUrl: './music-list-offline.component.html',
  styleUrls: ['./music-list-offline.component.scss']
})
export class MusicListOfflineComponent implements OnInit, OnChanges {

  @Input() playlist: Playlist = null

  constructor(public electronService : ElectronService, public offlineService: OfflineFeaturesService) {

  }

  ngOnInit() {
    // console.log('cul', 'offline component onInit')

  }

  ngOnChanges() {
    // this.offlineService.
    // console.log('cul', 'offline component OnChanges')
    // this.loadMusicsFromPspFile()
  }

  loadMusicsFromPspFile() {
    // this.offlineService.getMusicsRequest(this.playlist.playlist_name)
  }

  dlMusic(music: Music) {
    this.offlineService.dlMusic(music)
  }
}
