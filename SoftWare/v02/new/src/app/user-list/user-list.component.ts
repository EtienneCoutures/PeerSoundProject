import { Component, OnInit, Input, AfterContentInit } from '@angular/core';
import { PlaylistService } from '../playlist/playlist.service'
import { Playlist } from '../playlist/playlist';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  @Input() playlist: Playlist;

  constructor(
    private plService: PlaylistService
  ) { }

  ngOnInit() {
    console.log('init user list: ', this.playlist);
    this.plService.getUserFromPlaylist(this.playlist.playlist_id).subscribe(
      res => {
        console.log('users: ', res);
      }, error => console.log('Error while retrieving users: ', error));
  }

}
