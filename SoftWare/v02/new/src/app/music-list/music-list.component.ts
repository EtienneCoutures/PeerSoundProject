import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { Playlist } from '../playlist/playlist';
import { Music } from '../music/music';

@Component({
  selector: 'app-music-list',
  templateUrl: './music-list.component.html',
  styleUrls: ['./music-list.component.scss']
})
export class MusicListComponent implements OnInit, OnChanges {

  @Output() playMusic: EventEmitter<Music> = new EventEmitter();
  @Input() musics: Music[];

  constructor() {}

  ngOnInit() {

  }

  ngOnChanges() {
    console.log("musics music list: ", this.musics);
  }

  playMusic(music) {
    console.log('play music: ', music);
  }

}
