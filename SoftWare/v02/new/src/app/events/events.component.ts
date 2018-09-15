import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Playlist } from '../playlist/playlist';

export class Event {
  type: string;
  message: string;
  invitation: Invitation;
}

export class Invitation {
  Inviter: any;
  Playlist: Playlist;
  invitation_id: number;
  invitation_insert: string;
  invitation_update: string;
  invited_role: string;
  invited_usr_id: number;
  inviter_usr_id: number;
  playlist_id: number;
}

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})

export class EventsComponent implements OnInit {

  events: Array<Event> = new Array<Event>();

  constructor(
    private userService: UserService
  ) { }
  ngOnInit() {
    console.log('Event component initiated');

    this.events = this.userService.events;
    console.log('events list : ', this.events);
    //this.getInvitations();
  }

  accept(event: Event) {

    this.userService.deleteInvitation(event.invitation.invitation_id)
    .subscribe(res => {
      if (res.code == 0) {
        this.userService.acceptInvitation(event.invitation.invited_usr_id
                                          , event.invitation.playlist_id)
        .subscribe(res => {
          console.log('accept invitation:', res);
          if (res.code == 0) {
            let idx = this.events.indexOf(event);
            this.events.splice(idx, 1);
          } else {

          }
        }, error => console.log('error while accpeting invitation: ', error));
      }
    })
  }

  refuse(event) {
    console.log('refuse: ', event);
    this.userService.deleteInvitation(event.invitation.invitation_id)
    .subscribe(res => {
      console.log('deleteInvitation: ', res);
      if (res.code == 0) {
        let idx = this.events.indexOf(event);
        this.events.splice(idx, 1);
      }
    }, error => console.log('error while deleting invitaiton: ', error));
  }


  /*getInvitations() {
    this.userService.getInvitations().subscribe(invitations => {
      console.log('invitation: ', invitations);

      for (let invit of invitations) {
        let e = new Event();
        e.message = `Vous avez reçu une invitation à rejoindre la playlist "`
                  + `${invit.Playlist.playlist_name}"`
                  + ` par ${invit.Inviter.usr_login}.`;

        e.invitation = invit;

        e.type = "Invitation";
        this.userService.events.push(e);
      }

    }, error => console.log('error while retrieving invitations: ', error));
  }*/

}
