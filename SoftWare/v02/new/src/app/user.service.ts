import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from './account';
import { PlaylistComponent } from './playlist/playlist.component';
import { Playlist } from './playlist/playlist';
import { APIResponse } from './APIResponse';
import { Event } from './events/events.component';
import { LoginService } from './login/login.service';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  headers: HttpHeaders;
  params: HttpParams;
  account: Account;
  events: Array<Event> = new Array<Event>();

  constructor(
    private httpClient: HttpClient
    , private loginService: LoginService
  ) {
    this.params = new HttpParams().set('where'
                  , `{"playlist_creator":${this.loginService.account.usr_id.toString()}}`);

    console.log('this.loginService.account: ', this.loginService.account.authorization);

    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': this.loginService.account.authorization
    })
  }

  getUserPlaylists(userId?: number): Observable<Playlist[]> {
    console.log('HEADERS: ', this.headers);
    return this.httpClient.get<Playlist[]>(`http://localhost:8000/api/playlist/`
                                , {params: this.params, headers: this.headers});
  }

  getAllUserPlaylist(userId?: number) {
    return this.httpClient.get<Playlist[]>(`http://localhost:8000/api/subscription/`
                                ,  {headers: this.headers});
  }

  getInvitations(userId?: number) {
    this.params = new HttpParams().set('where'
                  , `{"invited_usr_id":${this.account.usr_id.toString()}}`);

    return this.httpClient.get<any>('http://localhost:8000/api/invitation', {
      params: this.params,
      headers: this.headers
    });
  }

  deleteInvitation(invitation_id: number) {

    return this.httpClient.delete<any>(`http://localhost:8000/api/invitation/${invitation_id}`
                                    , {headers: this.headers});
  }

  acceptInvitation(usr_id: number, pl_id: number): any {
    return this.httpClient.post<any>(`http://localhost:8000/api/subscription`
                                , {usr_id: usr_id, playlist_id: pl_id}
                                , {headers: this.headers});
  }

  getSubscription(): any {
    this.params = new HttpParams().set('where'
                  , `{"usr_id":${this.loginService.account.usr_id.toString()}}`);

    return this.httpClient.get<any>('http://localhost:8000/api/subscription'
    , {params: this.params, headers: this.headers});
  }
}
