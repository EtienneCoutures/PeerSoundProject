import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { LoginService } from '../login/login.service';
import { Account } from '../account';
import { Playlist } from './playlist';
import { Music } from '../music/music';

export class Invitation {
  invited_usr_id: number;
  inviter_usr_id: number;
  playlist_id: number;
  invited_role: string;
  playlist_name?: string;
  usr_login?: string;
  invitation_id?:string;
}

@Injectable({
  providedIn: 'root'
})

export class PlaylistService {

  headers: HttpHeaders;
  params: HttpParams;

  account: Account;
  selectedPl: Playlist;
  playlists: Playlist[] = new Array<Playlist>();
  isPlaying: boolean;
  musics: Music[];
  selectedMusic: Music;

  constructor(
    private httpClient: HttpClient,
    private loginService: LoginService
  ) {
    this.account = this.loginService.account;

    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': this.account.authorization
    })
  }

  getPlaylistMusics(playlistId: number) {
    return this.httpClient.get<any>(`http://localhost:8000/api/playlist/${playlistId}`
                                , {headers : this.headers});
  }

  createPlaylist(pl: Playlist) {
    pl.playlist_creator = this.account.usr_id;
    return this.httpClient.post<any>('http://localhost:8000/api/playlist/'
                                          , pl, {headers : this.headers});
  }

  inviteUser(invitation: Invitation) {
    return this.httpClient.post<any>('http://localhost:8000/api/invitation'
                                    , invitation, {headers: this.headers});
  }

  getUserIdFromMail(mail: string) {
    /*this.params = new HttpParams().set('where'
                  , `{"usr_email":${mail.toString()}}`);*/

    return this.httpClient.get(`http://localhost:8000/api/user`
      + `?where=%7B%22usr_email%22:%22${mail.toString()}%22%7D`, {
      params: this.params,
      headers: this.headers
    });
  }

  getUserFromPlaylist(plId: number) {
    return this.httpClient.get<any>(`http://localhost:8000/api/playlist/users/${plId}`
                              , {headers: this.headers});
  }

  getMusicLinkFromMusicId(id:number) {
    return this.httpClient.get<any>(`http://localhost:8000/api/musiclink`
      + `?where=%7B%22music_id%22:%22${id.toString()}%22%7D`)
  }

}