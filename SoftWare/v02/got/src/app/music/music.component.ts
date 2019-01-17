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
  //isSelected: boolean = false;
  selectedMusic: Music;
  contextMenu: boolean = false;
  contextMenuX: number = 0
  contextMenuY: number = 0

  constructor(
    private plService: PlaylistService
  ) {
    //this.isPlaying = this.plService.isPlaying;
    //this.selectedMusic = this.plService.selectedMusic;
  }

  isSelected() {
    return  this.plService.selectedMusic &&
            this.music === this.plService.selectedMusic;
  }

  ngOnInit() {
    // console.log('i construct a music:', this.music);

  }

  clickMusic() {
    // console.log('click music');
//    this.selectedMusic = this.music;
    //this.isPlaying = !this.isPlaying;
  }

  onRightClick(e: any) {
    this.contextMenu = true
    this.contextMenuX = e.clientX
    this.contextMenuY = e.clientY
  }

  test() {
    // console.log('cul', this.music)
    
  }

}
