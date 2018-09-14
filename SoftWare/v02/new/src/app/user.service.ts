import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from './account';
import { PlaylistComponent } from './playlist/playlist.component';
import { Playlist } from './playlist/playlist';
import { APIResponse } from './APIResponse';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  headers: HttpHeaders;
  params: HttpParams;
  account: Account;

  constructor(private httpClient: HttpClient) {}

  setAuthorizationToken(account: Account) {
    this.account = account;
    this.params = new HttpParams().set('where'
                  , `{"playlist_creator":${this.account.usr_id.toString()}}`);

    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': account.authorization
    })
  }

  getUserPlaylists(userId?: number) {
    return this.httpClient.get<Playlist[]>(`http://localhost:8000/api/playlist/`
                                , {params: this.params, headers: this.headers});
  }
}
