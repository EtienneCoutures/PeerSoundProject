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

  constructor(
    private route: ActivatedRoute,
    private plService: PlaylistService
  ) {}

  ngOnChanges() {}

}
