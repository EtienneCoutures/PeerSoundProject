import { Component, OnInit, Input } from '@angular/core';
import { Playlist } from '../playlist/playlist';
import { Music } from '../music/music';

@Component({
  selector: 'app-music-list',
  templateUrl: './music-list.component.html',
  styleUrls: ['./music-list.component.scss']
})
export class MusicListComponent implements OnInit {


  @Input() musics: Music[];

  constructor() { }

  ngOnInit() {

  }

}
