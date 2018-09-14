import { Component, OnInit, Inject, Output } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatButton } from '@angular/material';
import { Playlist } from '../playlist/playlist';
import { PlaylistService } from '../playlist/playlist.service';
import { EventEmitter } from '@angular/core';


@Component({
  selector: 'app-create-playlist',
  templateUrl: './create-playlist.component.html',
  styleUrls: ['./create-playlist.component.scss']
})

export class CreatePlaylistComponent implements OnInit {

  @Output() newPlaylist: EventEmitter<Playlist> = new EventEmitter();
  playlist: Playlist;

  constructor(
    public dialog: MatDialog
    , public plService: PlaylistService
  ) {

  }

  ngOnInit() {

  }

  openDialog() : void {
    this.playlist = new Playlist();
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: this.playlist
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.plService.createPlaylist(result).subscribe((rslt) => {
          if (rslt.code == 0) {
            this.newPlaylist.emit(rslt.Playlist);
          }
        }, error => console.log('error: ', error))
      }

    });
  }

}

@Component({
  selector: 'app-create-playlist-dialog',
  templateUrl: 'create-playlist-dialog.html',
})

export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Playlist
  ) {}

  onNoClick(): void {
    this.dialogRef.close(null);

  }

  create() {
    this.dialogRef.close(this.data);
  }

}
