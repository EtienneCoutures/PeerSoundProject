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

  private userIconColors = [
    '#9C27B0',
    '#673AB7',
    '#3F51B5',
    '#2196F3',
    '#009688',
    '#4CAF50',
    '#CDDC39',
    '#FFEB3B',
    '#FFC107',
    '#FF9800',
    '#FF5722',
    '#F44336'
  ]

  constructor(
    private plService: PlaylistService
  ) { }

  ngOnInit() {
  }

  ngOnChanges() {
    // console.log('users have changed!');
    if (this.playlist) {
      this.users = [];
      this.plService.getUserFromPlaylist(this.playlist.playlist_id).subscribe(
        res => {
          this.users.push(res.Playlist.rows[0].Creator);
          this.users = this.users.concat(res.Playlist.rows[0].Subscriber);
          // console.log('users: ', this.users);
        }, error => console.log('Error while retrieving users: ', error));
    }
  }
}
