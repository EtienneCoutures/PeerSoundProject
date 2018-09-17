import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { Playlist } from '../playlist/playlist';
import { Music } from '../music/music';
import { PlaylistService } from '../playlist/playlist.service';

@Component({
  selector: 'app-music-list',
  templateUrl: './music-list.component.html',
  styleUrls: ['./music-list.component.scss']
})
export class MusicListComponent implements OnInit, OnChanges {

  @Output() playMusic: EventEmitter<Music> = new EventEmitter();
  @Input() musics: Music[];

  constructor(
    private plService : PlaylistService
  ) {}

  ngOnInit() {

  }

  ngOnChanges() {
    console.log("musics music list: ", this.musics);
  }

  trackElement(index: number, element: any) {
    return element ? element.guid : null;
  }

  playMusicEvent(music, idx) {
    if (this.plService.selectedMusic !== music) {
      this.plService.isPlaying = true;
      this.playMusic.emit(music);
      this.plService.selectedMusic = music;
    } else {
      this.plService.isPlaying = !this.plService.isPlaying;
      this.playMusic.emit(music);
    }
    console.log('play music: ', music);
  }

}
