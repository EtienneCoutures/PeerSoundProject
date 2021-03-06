import { Component, OnInit, Input, Inject } from '@angular/core';
import { Playlist } from '../playlist/playlist';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatButton } from '@angular/material';
import { PlaylistService, Invitation } from '../playlist/playlist.service';
import { EventService } from '../event.service';

@Component({
  selector: 'app-options-pl',
  templateUrl: './options-pl.component.html',
  styleUrls: ['./options-pl.component.scss']
})
export class OptionsPlComponent implements OnInit {

  @Input() playlist: Playlist;
  inviteEmail: string;

  constructor(
    public dialog: MatDialog,
    public plService: PlaylistService,
    private eService: EventService
  ) { }

  openInviteDialog(): void {}

  ngOnInit() {
    console.log('opt pl : ', this.playlist);
  }

  invitePeople() {
    const dialogRef = this.dialog.open(DialogInvitePeople, {
      data: {pl : this.playlist, service: this.plService},
    });

    dialogRef.afterClosed().subscribe(results => {
      this.inviteEmail = results;
      if (results) {
        this.eService.sendMsg({type: 'invitSent', data : results});
      }
    });
  }
}

@Component({
  selector: 'app-invite-people-dialog',
  templateUrl: 'invite-people-dialog.html',
})

export class DialogInvitePeople {

  inviteEmail: string;
  invitation: Invitation = new Invitation();
  error: string;

  constructor(
    public dialogRef: MatDialogRef<DialogInvitePeople>,
    @Inject(MAT_DIALOG_DATA) public data: any,

  ) {}

  onNoClick(): void {
    this.dialogRef.close(null);
  }

  invite() {
    console.log('invite: ', this.data);

    this.invitation.inviter_usr_id = this.data.service.account.usr_id;
    this.invitation.playlist_id = this.data.pl.playlist_id;
    this.invitation.invited_role = "member";

    console.log('inviteEmail: ', this.inviteEmail);

    this.data.service.getUserIdFromMail(this.inviteEmail).subscribe(
      res =>
      {
        console.log('res user id from mail: ', res);
        this.invitation.invited_usr_id = res[0].usr_id;
        //this.invitation.invited_usr_id = invited_id;
        this.data.service.inviteUser(this.invitation).subscribe(res => {
          console.log('invite user: ', res);
          if (res.code == 0) {
            this.invitation.playlist_name = this.data.pl.playlist_name;
            this.invitation.usr_login = this.data.service.account.usr_login;
            this.invitation.invitation_id = res.Invitation.invitation_id;
            this.dialogRef.close(this.invitation);
          } else {
            this.error = "Veuillez vérifier l'adresse mail."
          }
        }, error => console.log('error trying invitation: ', error));

        console.log('res: ', res);
      }, error => console.log('error getting user id from mail: ', error));
    //this.dialogRef.close(this.inviteEmail);
  }

}
