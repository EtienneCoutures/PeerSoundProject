import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from '../../login/login.service';
import { Account } from '../../account';
import { UserService } from '../../user.service';
import { PlaylistService } from '../../playlist/playlist.service';
import { Playlist } from '../../playlist/playlist';
import { Music } from '../../music/music';
import { EventsComponent, Event } from '../../events/events.component';

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
  private users: Array<any> = new Array();
  //private events: Array<Event> = new Array<Event>();

  constructor(
    private loginService: LoginService,
    private userService: UserService,
    private plService: PlaylistService) {
    this.account = loginService.account;
    this.subs = new Array();
  }

  ngOnInit() {
    console.log('account: ', this.account.authorization);
    this.userService.setAuthorizationToken(this.account);

    this.userService.getUserPlaylists().subscribe(playlists => {
      this.playlists = playlists;
      this.selectedPl = this.playlists[0];
      this.musics = this.playlists[0].MusicLink;
      this.getInvitations();
      /*this.plService.getUserFromPlaylist(playlists[0].playlist_id).subscribe(
        res => {
          this.users.push(res.Playlist.rows[0].Creator);
          this.users = this.users.concat(res.Playlist.rows[0].Subscriber);
          console.log('users: ', this.users);
        }, error => console.log('Error while retrieving users: ', error));
*/

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

  getInvitations() {
    let tmp: Array<Event> = new Array<Event>();
    this.userService.getInvitations().subscribe(invitations => {
      console.log('invitation: ', invitations);

      for (let invit of invitations) {
        let e = new Event();
        e.message = `Vous avez reçu une invitation à rejoindre la playlist "`
                  + `${invit.Playlist.playlist_name}"`
                  + ` par ${invit.Inviter.usr_login}.`;

        e.invitation = invit;

        e.type = "Invitation";
        tmp.push(e);
      }
      this.userService.events = tmp;

      console.log('events: ', this.userService.events);
    }, error => console.log('error while retrieving invitations: ', error));
  }

}
