import { Component, ViewChild, OnInit, OnDestroy,AfterViewInit } from '@angular/core';
import { LoginService } from '../../login/login.service';
import { Account } from '../../account';
import { UserService } from '../../user.service';
import { PlaylistService } from '../../playlist/playlist.service';
import { Playlist } from '../../playlist/playlist';
import { Music } from '../../music/music';
import { EventsComponent, Event } from '../../events/events.component';
import {ElementRef,Renderer2} from '@angular/core';
import { Router } from '@angular/router';

//declare var SC: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {

  private account: Account;
  private subs: any[];
  private playlists: Playlist[] = new Array();
  private musics: Music[];
  private users: Array<any> = new Array();
  private selectedPl: Playlist;
  private scWidget: any;
  private iframeElement: any;
  @ViewChild('scPlayer') scPlayer:ElementRef;
  //@ViewChild('iframe') iframe:ElementRef;

  //private events: Array<Event> = new Array<Event>();

  constructor(
    private loginService: LoginService,
    private userService: UserService,
    private plService: PlaylistService,
    private rd: Renderer2,
    private router: Router
  ) {
    this.account = this.loginService.account;
    this.subs = new Array();
    this.plService.selectedPl = this.selectedPl;
    console.log('SCWidget: ', window['SC']);
  }

  ngOnInit() {
    console.log('account bearer: ', this.account.authorization);

    this.userService.getUserPlaylists().subscribe(playlists => {
      this.userService.getSubscription().subscribe(subscription => {

        if (subscription) {
          for (let i = 0; i < subscription.length; ++i) {
            this.playlists.push(subscription[i].Playlist);
          }
        }

        this.playlists = playlists.concat(this.playlists);
        this.selectedPl = this.playlists[0];
        this.plService.selectedMusic = this.playlists[0].MusicLink[0];
        this.plService.selectedPl = this.playlists[0];
        this.musics = this.playlists[0].MusicLink;
        this.router.navigate([{ outlets: { homeOutlet: ['home/infoPlaylist'] } }]);

        this.getInvitations();

      }, error => console.log('error while retrieving subs: ', error));
    }, error => console.log('error while retrieving playlist: ', error));
  }

  ngAfterViewInit() {
    this.iframeElement = this.scPlayer.nativeElement;
    this.scWidget = window['SC'].Widget(this.iframeElement);
  }

  ngOnDestroy() {
    this.subs.map(sub => sub.unsubscribe());
  }

  playlistChangedHandler(pl: Playlist) {
    console.log('pl change: ', pl);
    this.selectedPl = pl;
    this.plService.selectedPl = pl;
    this.musics = pl.MusicLink;
  }

  deco() {
    this.router.navigate(['']);
  }

  playMusicHandler(music: Music) {
    console.log('playMusicHandler music: ', music);
    if (this.plService.selectedMusic !== music) {
      this.scWidget.load(music.music_url, {auto_play : true});
    } else if (this.plService.selectedMusic === music) {
      if (this.plService.isPlaying)
        this.scWidget.play();
      else
        this.scWidget.pause();
    }
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
