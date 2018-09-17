import { Component, OnInit, Input } from '@angular/core';
import { Music } from './music';
import { PlaylistService } from '../playlist/playlist.service';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.scss']
})

export class MusicComponent implements OnInit {

  @Input() music: Music;
  isPlaying: boolean = false;

  constructor(
    private plService: PlaylistService
  ) { }

  ngOnInit() {
    console.log('i construct a music:', this.music);

  }

  clickMusic() {
    console.log('click music');
    this.isPlaying = !this.isPlaying;
    //this.plService.selectedMusic = this.music;
  }

}
