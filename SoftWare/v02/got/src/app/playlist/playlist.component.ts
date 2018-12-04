import { Component, OnInit, Input, OnDestroy, EventEmitter } from '@angular/core';
import { Playlist } from './playlist';
import { PlaylistService } from './playlist.service';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})

export class PlaylistComponent {

  subs?: any[];

  @Input()
  playlist: Playlist;

  navigationExtras: NavigationExtras;

  isSelected: boolean;

  constructor(
    private playlistService: PlaylistService,
    private router: Router
  ) {
    this.isSelected = false;
  }

  ngOnInit() {
    this.navigationExtras = { queryParams: this.playlist };

    // console.log('im creating a playlist: ', this.playlist);
    this.playlistService.getPlaylistMusics(this.playlist.playlist_id)
      .subscribe(musics => {
        // console.log('musics: ', musics);
      }, error => console.log('error while retrieving musics: ', error));
  }

  ngOnDestroy() {}

  selectPlaylist() {
    //this.router.navigate([{ outlets: { homeOutlet: ['infoPlaylist'] } }]);
  }


}
