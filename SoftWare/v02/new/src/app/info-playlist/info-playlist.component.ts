import { Component, OnChanges } from '@angular/core';
import { Playlist } from '../playlist/playlist';
import { ActivatedRoute } from '@angular/router';
import { PlaylistService } from '../playlist/playlist.service';

@Component({
  selector: 'app-info-playlist',
  templateUrl: './info-playlist.component.html',
  styleUrls: ['./info-playlist.component.scss']
})
export class InfoPlaylistComponent implements OnChanges {

  playlist: Playlist;

  constructor(
    private route: ActivatedRoute,
    private plService: PlaylistService
  ) {
    this.route.queryParams.subscribe(params => {
      console.log('query params: ', params);
    })

    console.log('info pl selected pl :', JSON.stringify(this.plService.selectedPl));
    this.playlist = this.plService.selectedPl;
  }

  ngOnChanges() {
    console.log('this.playlist: ', this.plService.selectedPl);
    this.playlist = this.plService.selectedPl;
  }

}
