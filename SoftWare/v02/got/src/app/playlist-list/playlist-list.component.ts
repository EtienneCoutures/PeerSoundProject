import { Component, OnInit, OnDestroy, EventEmitter, Output, Input } from '@angular/core';
import { PlaylistComponent } from '../playlist/playlist.component';
import { UserService } from '../user.service';
import { Playlist } from '../playlist/playlist';
import { APIResponse } from '../APIResponse';
import { PlaylistService } from '../playlist/playlist.service';

export interface Section {
  name: string;
  updated: Date;
}

@Component({
  selector: 'app-playlist-list',
  templateUrl: './playlist-list.component.html',
  styleUrls: ['./playlist-list.component.scss']
})

export class PlaylistListComponent implements OnInit {

  @Output() playlistChanged: EventEmitter<Playlist> = new EventEmitter();
  @Input() playlists: Playlist[];
  @Input() nbNotif: number;

  constructor(
    private userService: UserService,
    private plService: PlaylistService
  ) {

    }

  ngOnInit() {}

  ngOnDestroy() {}

  selectPlaylist(pl: Playlist) {
    this.playlistChanged.emit(pl);
  }

  newPlaylistHandler(pl: Playlist) {
    this.plService.playlists.push(pl);
  }
}
