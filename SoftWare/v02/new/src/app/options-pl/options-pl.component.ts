import { Component, OnInit, Input } from '@angular/core';
import { Playlist } from '../playlist/playlist';

@Component({
  selector: 'app-options-pl',
  templateUrl: './options-pl.component.html',
  styleUrls: ['./options-pl.component.scss']
})
export class OptionsPlComponent implements OnInit {

  @Input() playlist: Playlist;

  constructor() { }

  ngOnInit() {
    console.log('opt pl : ', this.playlist);
  }

  setCurrentPl(pl: Playlist) {
    console.log('opt pl : ', this.playlist);
    this.playlist = pl;
  }
}
