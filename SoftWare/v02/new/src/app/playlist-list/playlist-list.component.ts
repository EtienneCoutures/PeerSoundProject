import { Component, OnInit, OnDestroy, EventEmitter, Output, Input } from '@angular/core';
import { PlaylistComponent } from '../playlist/playlist.component';
import { UserService } from '../user.service';
import { Playlist } from '../playlist/playlist';
import { APIResponse } from '../APIResponse';

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
  playlists: Playlist[];
  selected: Playlist;

  constructor(
    private userService: UserService
  ) {
      this.selected = null;
    //this.playlists = [{name : "penis"}];
    //this.playlists.push(new PlaylistComponent());//;
    //this.playlists[1] = ;
    //this.playlists[2] =
    this.playlists = [{playlist_name : "sperme"}, {playlist_name : "sperme2"}];
  }

  ngOnInit() {
    this.userService.getUserPlaylists()
    .subscribe(playlists => {
      this.playlists = playlists;
      this.selectPlaylist(this.playlists[0]);
    }, error => {
      console.log('error while retrieving playlist: ', error);
      this.playlists = [{playlist_name : "sperme"}, {playlist_name : "sperme2"}];
    });
  }

  ngOnDestroy() {}

  selectPlaylist(pl: Playlist) {
    this.selected = pl;
    this.playlistChanged.emit(pl);
    console.log('selected pl: ', pl);
  }

  newPlaylistHandler(pl: Playlist) {
    this.playlists.push(pl);
  }
}
