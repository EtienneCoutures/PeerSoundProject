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
import { OfflineFeaturesService } from '../../offline-features.service'
const dataurl = require('dataurl')
const fs = require('fs')

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {

  private subs: any[];
  private users: Array<any> = new Array();
  private ipcRenderer: any = null
  private document: any;
  public musicSrcPlat: string = 'sc';
  public platforms = Object.freeze({ "YT": 1, "SC": 2 })
  public ytsrc: string = '';
  public pauseYt: boolean = true;

  @Output() scWidget: any;
  @Output() iframeElement: any;
  @ViewChild('scPlayer') scPlayer: ElementRef;
  // @ViewChild('lcPlayer') lcPlayer: ElementRef;

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
    public offlineService: OfflineFeaturesService,
  ) {

    this.subs = new Array();
    this.document = document;
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
      // console.log('from init', this.plService.playlists)
      this.plService.selectedMusic = this.plService.playlists[0].MusicLink[0];
      this.plService.selectedPl = this.plService.playlists[0];
      this.plService.musics = this.plService.playlists[0].MusicLink;
      this.router.navigate(['/', 'home', { outlets: { homeOutlet: ['infoPlaylist'] } }]);

      if (this.plService.playlists[0].MusicLink[0]) {
        this.plService.selectedMusic = this.plService.playlists[0].MusicLink[0];
        // console.log('music_source: ', this.plService.selectedMusic.music_source);
        if (this.plService.selectedMusic.music_source === 'soundcloud') {
          this.scWidget.load(this.plService.selectedMusic.music_url);
          this.musicSrcPlat = 'soundcloud';
        }
        else if (this.plService.selectedMusic.music_source === 'youtube')
        {
          this.ytsrc = this.plService.selectedMusic.music_url;
          this.musicSrcPlat = "youtube";
        }
      }
      this.loaded = true;
    }).catch(error => {
      console.log('error loading home: ', error);
    });
  }

  getUserPlaylists(cmpt: HomeComponent): Promise<any> {
    return new Promise((resolve, reject) => {
      cmpt.userService.getUserPlaylists().subscribe(playlists => {
        playlists.forEach((pl) => { // convert bdd music link obj to standard Music obj
          pl.MusicLink.forEach((musLink, i) => {
            pl.MusicLink[i] = Music.getMusFromMusicLink(musLink)
          })
        })
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
        // console.log('invitation: ', invitations);

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

        // console.log('events: ', cmpt.userService.events);
        resolve()
      }, error => reject(error));
    })
  }


  handleMessages() {
    this.eService.messages.subscribe(m => {
      // console.log('event: ', m);

      if (m.type === "invitReceived") {

        let e = new Event();
        e.type = "Invitation";

        e.message = `Vous avez reçu une invitation à rejoindre la playlist "`
          + `${m.data.playlist_name}"`
          + ` par ${m.data.usr_login}.`;

        // console.log('n event pushed: ', e);
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
        this.router.navigate([{ outlets: { homeOutlet: ['infoPlaylist'] } }]);
        //this.plService.musics = this.plService.playlists[pl].MusicLink;
      }
      this.offlineService.reset();
    })
  }

  public soundFile: any

  ngAfterViewInit() {
    console.log('after view init')
    // new Audio('C:/Users/moi/Desktop/psp2/PeerSoundProject/SoftWare/v02/got/tmp.mp3').play()
    this.iframeElement = this.scPlayer.nativeElement;
    this.scWidget = window['SC'].Widget('sc-player');
    let self = this;
    this.scWidget.bind(window['SC'].Widget.Events.FINISH, (e) => {
      self.playNextMusic();
    })
  }

  convertLocalSong(filePath): Promise<any> { // convert mp3 local file to readable url for html audio tag
    const songPromise = new Promise((resolve, reject) => {
      fs.readFile(filePath, (err, data) => {
        if (err) { reject(err); }
        resolve(dataurl.convert({ data, mimetype: 'audio/mp3' }));
      });
    });
    return songPromise;
  };

  playNextMusic() {
    let found = this.plService.plInPlay.MusicLink.find((item: any) => {
      return item.Music.music_id === this.plService.selectedMusic.music_id;
    });

    if (found) {
      let index = this.plService.plInPlay.MusicLink.indexOf(found);
      if (index >= 0) {
        if (typeof this.plService.musics[index + 1] !== 'undefined') {
          this.playMusicHandler(this.plService.plInPlay.MusicLink[index + 1]);
        } else {
          this.playMusicHandler(this.plService.plInPlay.MusicLink[0]);
        }
      } else console.log('error: the selected music is not part of the current playlist');
    } else console.log('error: the selected music is not part of the current playlist');
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

    // console.log('ici', this.musicSrcPlat, music.music_source, this.plService.isSelectedMusic(music))
    console.log(music)

    if (this.plService.isNewMusicSelected(music)) {
      console.log('ici dif')

      var prevMusicSrcPlat = this.musicSrcPlat

      // set new src platform player

      if (music.isLocalFile)
        this.musicSrcPlat = 'local'
      else
        this.musicSrcPlat = music.music_source

      // pause previously used player

      if (prevMusicSrcPlat != this.musicSrcPlat) {
        switch (prevMusicSrcPlat) {
          case 'youtube':
            this.plService.ytPlayer.pauseVideo()
            break
          case 'soundcloud':
            this.scWidget.pause()
            break
          case 'local':
            this.plService.lcPlayer.stop()
            break
        }
      }

      // load new music

      switch (this.musicSrcPlat) {
        case 'youtube':
          if (this.ytsrc == music.music_url) {// handle come back to same yt music as before playing one on another plateform
            this.plService.ytPlayer.seekTo(0) // reset video
            this.plService.ytPlayer.playVideo()
          }
          this.ytsrc = music.music_url;
          break

        case 'soundcloud':
            this.scWidget.load(music.music_url, { auto_play: true }); // load new sc music
            break

        case 'local':
          music.isExtractedPromise.then(() => { // wait until file extraction from psp archive completed
            this.plService.lcPlayer.setMusic('./tmp.mp3', true)
          })
          break
      }

      this.plService.isPlaying = true
      this.plService.plInPlay = this.plService.selectedPl;
      this.plService.selectedMusic = music;
    }
    else { // same music clicked -> pause / play
      console.log('ici pareil')

      switch (this.musicSrcPlat) {
        case 'youtube':
          if (this.plService.isPlaying)
            this.plService.ytPlayer.pauseVideo();
          else
            this.plService.ytPlayer.playVideo();
          break

        case 'soundcloud':
          if (this.plService.isPlaying)
            this.scWidget.pause();
          else
            this.scWidget.play();
          break

        case 'local':
          this.plService.lcPlayer.onPlayClicked()
          break
      }
      this.plService.isPlaying = !this.plService.isPlaying
    }
  }
}
