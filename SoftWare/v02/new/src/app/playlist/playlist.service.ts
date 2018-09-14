import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { LoginService } from '../login/login.service';
import { Account } from '../account';
import { Playlist } from './playlist';

@Injectable({
  providedIn: 'root'
})

export class PlaylistService {

  headers: HttpHeaders;
  params: HttpParams;
  account: Account;

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
    return this.httpClient.get(`http://localhost:8000/api/playlist/${playlistId}`
                                , {headers : this.headers});
  }

  createPlaylist(pl: Playlist) {
    pl.playlist_creator = this.account.usr_id;
    return this.httpClient.post<any>('http://localhost:8000/api/playlist/'
                                          , pl, {headers : this.headers});
  }
}
