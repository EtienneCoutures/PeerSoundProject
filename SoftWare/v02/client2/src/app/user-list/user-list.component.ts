import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { PlaylistService } from '../playlist/playlist.service'
import { Playlist } from '../playlist/playlist';
import { Account } from '../account';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnChanges, OnInit {

  users: Array<Account> = new Array<Account>();
  @Input() playlist: Playlist;

  constructor(
    private plService: PlaylistService
  ) { }

  ngOnInit() {
  }

  ngOnChanges() {
    console.log('users have changed!');
    this.users = [];
    this.plService.getUserFromPlaylist(this.playlist.playlist_id).subscribe(
      res => {
        this.users.push(res.Playlist.rows[0].Creator);
        this.users = this.users.concat(res.Playlist.rows[0].Subscriber);
        console.log('users: ', this.users);
      }, error => console.log('Error while retrieving users: ', error));
  }
}
