import {
  Component
  , ViewChild
  , OnInit
  , OnDestroy
  , AfterViewInit
  , Output
} from '@angular/core';
import { LoginService } from '../../login/login.service';
import { Account } from '../../account';
import { UserService } from '../../user.service';
import { PlaylistService } from '../../playlist/playlist.service';
import { Playlist } from '../../playlist/playlist';
import { Music } from '../../music/music';
import { EventsComponent, Event } from '../../events/events.component';
import { ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../../event.service';
import { Invitation } from '../../events/events.component';
import { OfflineFeaturesService } from '../../offline-features.service';
// import { UrlParser } from 'url-parse';
// import "js-video-url-parser/lib/provider/youtube";
// import "js-video-url-parser/lib/provider/soundcloud";

//declare var SC: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {

  private subs: any[];
  private users: Array<any> = new Array();
  // private ipcRenderer: any = null;
  public musicSrcPlat: string = 'sc';
  public platforms = Object.freeze({"YT":1, "SC":2})
  public ytsrc: string = '';

  @Output() scWidget: any;
  @Output() iframeElement: any;
  @ViewChild('scPlayer') scPlayer: ElementRef;

  private loaded: boolean = true;
  private init: ((cmpt: HomeComponent) => Promise<any>)[] = [
    this.getUserPlaylists,
    this.getSubscription,
    this.getInvitations
  ]


  constructor(
    private loginService: LoginService,
    private userService: UserService,
    private plService: PlaylistService,
    private rd: Renderer2,
    private router: Router,
    private eService: EventService,
    public offlineService: OfflineFeaturesService
  ) {

    this.subs = new Array();
    console.log('this.loginService.account: ', this.loginService.account);
    if (this.loginService.account.playlist) {
      let tmp = new Array();

      this.plService.selectedPl = this.loginService.account.playlist;
      tmp.push(this.loginService.account.playlist);
      this.plService.playlists = tmp;
    }
  }

  initialize(cmpt: HomeComponent): Promise<any> {
    let i = 0;

    return new Promise<any>((resolve, reject) => {
      for (let func of this.init) {
        func(cmpt).then(() => {
          ++i;
          if (i === cmpt.init.length) {
            resolve();
          }
        }).catch(error => {
          reject(error);
        })
      }
    });
  }

  ngOnInit() {
    this.handleMessages();
    this.initialize(this).then((result) => {
      console.log('this.plService.playlists: ', this.plService.playlists);
      this.plService.musics = this.plService.playlists[0].MusicLink;
      this.plService.selectedMusic = this.plService.playlists[0].MusicLink[0];
      this.plService.selectedPl = this.plService.playlists[0];
      this.loaded = true;
    }).catch(error => {
      console.log('error loading home: ', error);
    });
  }

  getUserPlaylists(cmpt: HomeComponent): Promise<any> {
    return new Promise((resolve, reject) => {
      cmpt.userService.getUserPlaylists().subscribe(playlists => {
        cmpt.plService.playlists = cmpt.plService.playlists.concat(playlists);
        resolve();
      }, error => {
        reject(error);
      })
    });
  }

  getSubscription(cmpt: HomeComponent): Promise<any> {
    return new Promise((resolve, reject) => {
      cmpt.userService.getSubscription().subscribe(subscriptions => {
        let tmp: any[] = [];
        subscriptions.map((item: any) => {
          tmp.push(item.Playlist)
        });
        cmpt.plService.playlists = cmpt.plService.playlists.concat(tmp);
        resolve();
      }, error => {
        reject(error);
      })
    });
  }

  getInvitations(cmpt: HomeComponent): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      let tmp: Array<Event> = new Array<Event>();
      cmpt.userService.getInvitations().subscribe(invitations => {
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
        cmpt.userService.events = tmp;

        console.log('events: ', cmpt.userService.events);
        resolve()
      }, error => reject(error));
    })
  }


  handleMessages() {
    this.eService.messages.subscribe(m => {
      console.log('event: ', m);

      if (m.type === "invitReceived") {

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
      } else if (m.type === "newMusic") {
        this.plService.getMusicLinkFromMusicId(m.data.music_id).subscribe(
          link => {
            for (let p in this.plService.playlists) {
              if (this.plService.playlists[p].playlist_id === link.playlist_id) {
                link.Music = m.data;
                console.log('link: ', link);
                this.plService.playlists[p].MusicLink.push(link);
              }
            }
          })
      }
    })

    this.eService.sendMsg({ type: "connection", data: this.plService.account });
  }

  refresh() {
    this.plService.playlists = new Array();
    this.initialize(this).then((result) => {
      for (let pl in this.plService.playlists) {
        if (this.plService.selectedPl.playlist_id
            === this.plService.playlists[pl].playlist_id)
          this.plService.selectedPl = this.plService.playlists[pl];
          this.router.navigate([{ outlets: { homeOutlet:['infoPlaylist'] } }]);
        //this.plService.musics = this.plService.playlists[pl].MusicLink;
      }
      this.offlineService.reset();
    })
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
  }

  deco() {
    this.plService.playlists = new Array();
    this.router.navigate(['']);
  }

  playMusicHandler(music: Music) {
    console.log('cul', music)
    if (music.music_source == 'soundcloud')
      this.musicSrcPlat = 'sc'
    if (music.music_source == 'youtube')
      this.musicSrcPlat = 'yt'

    if (this.plService.selectedMusic !== music) {
      console.log('cul ici')
      if (music.music_source == 'soundcloud') {
        this.scWidget.load(music.music_url, { auto_play: true });
      }
      else if (music.music_source == 'youtube') {
        this.ytsrc = music.music_url;
      }
    } else if (this.plService.selectedMusic === music) {
      if (music.music_source == 'soundcloud') {
        if (this.plService.isPlaying)
          this.scWidget.play();
        else
          this.scWidget.pause();
      }
    }
  }
}
