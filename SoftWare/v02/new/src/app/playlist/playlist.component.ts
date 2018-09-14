import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Playlist } from './playlist';
import { PlaylistService } from './playlist.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})

export class PlaylistComponent {

  subs?: any[];

  @Input()
  playlist: Playlist;

  isSelected: boolean;

  constructor(
    private playlistService: PlaylistService
  ) {
    this.isSelected = false;
  }

  ngOnInit() {
    console.log('im creating a playlist: ', this.playlist);
    this.playlistService.getPlaylistMusics(this.playlist.playlist_id)
      .subscribe(musics => {
        console.log('musics: ', musics);
      }, error => console.log('error while retrieving musics: ', error));
  }

  ngOnDestroy() {}

  selectPlaylist() {

  }


}
