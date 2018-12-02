import { Component, OnInit, Input, Inject, EventEmitter, Output } from '@angular/core';
import { Playlist } from '../playlist/playlist';
import {
  MatDialog
  , MatDialogRef
  , MAT_DIALOG_DATA
  , MatButton
  , MatSnackBar
} from '@angular/material';
import { PlaylistService, Invitation } from '../playlist/playlist.service';
import { EventService } from '../event.service';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';

@Component({
  selector: 'app-options-pl',
  templateUrl: './options-pl.component.html',
  styleUrls: ['./options-pl.component.scss']
})
export class OptionsPlComponent implements OnInit {

  @Input() playlist: Playlist;
  @Output() conModeSwitched: EventEmitter<boolean> = new EventEmitter();

  inviteEmail: string;
  isOffline: boolean = false;

  constructor(
    public dialog: MatDialog,
    public plService: PlaylistService,
    private eService: EventService,
    public bar: MatSnackBar
  ) { }

  openInviteDialog(): void {
  }

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
        this.bar.open('Invitation envoyée !', 'Ok', {duration : 3000
          , verticalPosition: 'top'});
      }
    });
  }

  switchConnectivityMode(): void {
    this.isOffline = !this.isOffline;
    this.conModeSwitched.emit(this.isOffline);
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

  isEmail(myVar: string) {
  var regEmail = new RegExp('^[0-9a-z._-]+@{1}[0-9a-z.-]{2,}[.]{1}[a-z]{2,5}$'
    , 'i');
    return regEmail.test(myVar);
  }

  invite() {
    console.log('invite: ', this.data);

    if (!this.isEmail(this.inviteEmail)) {
      this.error = "Veuillez entrer une adresse mail valide."
      return ;
    }

    this.invitation.inviter_usr_id = this.data.service.account.usr_id;
    this.invitation.playlist_id = this.data.pl.playlist_id;
    this.invitation.invited_role = "member";

    console.log('inviteEmail: ', this.inviteEmail);

    this.data.service.getUserIdFromMail(this.inviteEmail).subscribe(
      res =>
      {
        if (!res || !res[0]) {
          this.error = "Pas d'utilisateur trouvé.";
          return ;
        }
        console.log('res user id from mail: ', res);
        this.invitation.invited_usr_id = res[0].usr_id;
        //this.invitation.invited_usr_id = invited_id;
        this.data.service.inviteUser(this.invitation).subscribe(res => {
          if (res.code === 0) {
            this.invitation.playlist_name = this.data.pl.playlist_name;
            this.invitation.usr_login = this.data.service.account.usr_login;
            this.invitation.invitation_id = res.Invitation.invitation_id;
            this.error = "";
            this.dialogRef.close(this.invitation);
          } else if (res.code === 1){
            this.error = "Invitation déjà envoyée."
          }
        }, error => console.log('error trying invitation: ', error));

      }, error => console.log('error getting user id from mail: ', error));
  }

}