import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from '../../login/login.service';
import { Account } from '../../account';
import { UserService } from '../../user.service';
import { Playlist } from '../../playlist/playlist';
import { Music } from '../../music/music';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit, OnDestroy {

  private account: Account;
  private subs: any[];
  private selectedPl: Playlist;
  private playlists: Playlist[];
  private musics: Music[];

  constructor(
    private loginService: LoginService,
    private userService: UserService) {
    this.account = loginService.account;
    this.subs = new Array();
  }

  ngOnInit() {
    console.log('account: ', this.account.authorization);
    this.userService.setAuthorizationToken(this.account);

    this.userService.getUserPlaylists()
    .subscribe(playlists => {
      this.playlists = playlists;
      this.selectedPl = this.playlists[0];
      this.musics = this.playlists[0].MusicLink;
    }, error => {
      console.log('error while retrieving playlist: ', error);
    });

    /*let sub = this.userService.getUserPlaylists(this.account.usr_id)
      .subscribe(playlists => {
        console.log('playlists: ', playlists);
      }, error => console.log('Error while retrieving playlists : ', error));

    if (sub)
      this.subs.push(sub);*/
  }

  ngOnDestroy() {
    this.subs.map(sub => sub.unsubscribe());
  }

  playlistChangedHandler(pl: Playlist) {
    console.log('pl change: ', pl);
    this.selectedPl = pl;
  }

}
