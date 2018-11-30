import { Component, ViewChild, OnInit, OnDestroy,AfterViewInit, Output } from '@angular/core';
import { LoginService } from '../../login/login.service';
import { Account } from '../../account';
import { UserService } from '../../user.service';
import { PlaylistService } from '../../playlist/playlist.service';
import { Playlist } from '../../playlist/playlist';
import { Music } from '../../music/music';
import { EventsComponent, Event } from '../../events/events.component';
import {ElementRef,Renderer2} from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../../event.service';
import { Invitation } from '../../events/events.component';
import { OfflineFeaturesService } from '../../offline-features.service'

//declare var SC: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {

  private subs: any[];
  private users: Array<any> = new Array();
  private ipcRenderer: any = null
  /*private account: Account;
  private playlists: Playlist[] = new Array();
  private musics: Music[];*/
  @Output()  scWidget: any;
  @Output()  iframeElement: any;

  @ViewChild('scPlayer') scPlayer:ElementRef;

  constructor(
    private loginService: LoginService,
    private userService: UserService,
    private plService: PlaylistService,
    private rd: Renderer2,
    private router: Router,
    private eService: EventService,
    public offlineService: OfflineFeaturesService
  ) {

    //this.account = this.loginService.account;
    /*this.account = this.loginService.account;
    this.playlists = this.plService.playlists;
    this.musics = this.plService.musics;*/

    this.subs = new Array();
    console.log('this.loginService.account: ', this.loginService.account);
    if (this.loginService.account.playlist) {
      console.log('hello bitches');
      let tmp = new Array();

      this.plService.selectedPl = this.loginService.account.playlist;
      tmp.push(this.loginService.account.playlist);
      this.plService.playlists = tmp;
    }
  }

  ngOnInit() {

    //console.log('account bearer: ', this.account.authorization);

    this.userService.getUserPlaylists().subscribe(playlists => {
      console.log('PLAYLISTS: ', playlists);
      this.userService.getSubscription().subscribe(subscription => {
        let tmp = new Array();

        console.log('PLAYLISTS: ', playlists);
        if (subscription) {
          for (let i = 0; i < subscription.length; ++i) {
            tmp.push(subscription[i].Playlist);
          }
        }
        console.log('SUBS: ', tmp);

        this.plService.playlists = playlists.concat(tmp);
        this.plService.musics = this.plService.playlists[0].MusicLink;
        this.plService.selectedMusic = this.plService.playlists[0].MusicLink[0];
        this.plService.selectedPl = this.plService.playlists[0];
        console.log('this.plService.selectedMusic: ', this.plService.musics);

        //this.musics = this.playlists[0].MusicLink;
        //this.playlists = this.plService.playlists;
        this.router.navigate([{ outlets: { homeOutlet: ['home/infoPlaylist'] } }]);

        this.getInvitations();

      }, error => console.log('error while retrieving subs: ', error));
    }, error => console.log('error while retrieving playlist: ', error));

    this.eService.messages.subscribe(m => {
      console.log('event: ', m);

      if (m.type == "invitReceived") {

        let e = new Event();
        e.type = "Invitation";

        e.message = `Vous avez reçu une invitation à rejoindre la playlist "`
                  + `${m.data.playlist_name}"`
                  + ` par ${m.data.usr_login}.`;

        console.log('n event pushed: ', e);
        e.invitation = new Invitation();
        e.invitation.invitation_id = m.data.invitation_id;
        e.invitation.invited_usr_id = m.data.invited_usr_id;
        e.invitation.playlist_id = m.data.playlist_id;
        //e.invitation = {};
        this.userService.events.push(e)
      } else if (m.type == "newMusic") {
        this.plService.getMusicLinkFromMusicId(m.data.music_id).subscribe(
          link => {
            for (let p in this.plService.playlists) {
              if (this.plService.playlists[p].playlist_id == link.playlist_id) {
                link.Music = m.data;
                console.log('link: ',link);
                this.plService.playlists[p].MusicLink.push(link);
              }
            }
          })
      }
    })

    this.eService.sendMsg({type: "connection", data: this.plService.account});
  }

  refresh() {
    this.userService.getUserPlaylists().subscribe(playlists => {
      console.log('PLAYLISTS: ', playlists);
      this.userService.getSubscription().subscribe(subscription => {
        let tmp = new Array();

        console.log('PLAYLISTS: ', playlists);
        if (subscription) {
          for (let i = 0; i < subscription.length; ++i) {
            tmp.push(subscription[i].Playlist);
          }
        }
        console.log('SUBS: ', tmp);

        this.plService.playlists = playlists.concat(tmp);
        for (let pl in this.plService.playlists) {
          if (this.plService.selectedPl.playlist_id = this.plService.playlists[pl].playlist_id)
          this.plService.selectedPl = this.plService.playlists[pl];
            //this.plService.musics = this.plService.playlists[pl].MusicLink;
        }

        //this.musics = this.playlists[0].MusicLink;
        //this.playlists = this.plService.playlists;
        //this.router.navigate([{ outlets: { homeOutlet: ['home/infoPlaylist'] } }]);

        this.getInvitations();
        this.offlineService.reset()
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
    this.plService.selectedPl = pl;
    this.plService.musics = pl.MusicLink;
    //this.musics = pl.MusicLink;
  }

  deco() {
    this.router.navigate(['']);
  }

  playMusicHandler(music: Music) {
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
