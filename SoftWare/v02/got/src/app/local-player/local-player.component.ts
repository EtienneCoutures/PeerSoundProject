import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import {MatSliderModule} from '@angular/material/slider';
import { PlaylistService } from '../playlist/playlist.service';
import { Music } from '../music/music';

const fs = require('fs')
const dataurl = require('dataurl')


@Component({
  selector: 'app-local-player',
  templateUrl: './local-player.component.html',
  styleUrls: ['./local-player.component.scss']
})
export class LocalPlayerComponent implements OnInit, OnDestroy {

  @Output() nextMusic: EventEmitter<any> = new EventEmitter();
  @Output() prevMusic: EventEmitter<any> = new EventEmitter();
  @Output() onMusicEnd: EventEmitter<any> = new EventEmitter();

  private audio: any = null
  private playing: boolean = false
  private volume: number = 0.5

  constructor(private plService: PlaylistService) { }

  ngOnInit() {
    this.audio = new Audio()
    this.audio.addEventListener("timeupdate", function(){
      // debug à jamais mystérieux d'un pb de refresh de currentTime -> ne pas enlever sous peine de lynchage
    });
    this.setVolume(this.volume)
    this.plService.lcPlayer = this

    var self = this
    this.audio.onended = function() {
      self.onMusicEnd.emit()
    }
  }

  ngOnDestroy() {
    this.audio.pause()
    this.audio = null
  }

  play() {
    this.audio.play()
    this.playing = true
  }

  pause() {
    this.audio.pause()
    this.playing = false
  }

  stop() {
    this.pause()
    this.setProgress(0)
  }

  mute() {
    if (this.audio.volume > 0) {
      this.volume = this.audio.volume
      this.setVolume(0)
    }
    else {
      this.setVolume(this.volume)
    }
  }

  setVolume(value: number) {
    this.audio.volume = value;
    // this.volume = value
  }

  setProgress(value: number) {
    this.audio.currentTime = value;
  }

  setMusic(filepath: string, autoplay: boolean = true) {
    if (this.audio.src)
      delete this.audio.src
    this.loadLocalFile(filepath).then((res) => {
      this.stop()
      this.audio.src = res
      this.audio.addEventListener("canplay", () => {
        if (autoplay)
          this.play()
      }, {once: true})
    })
  }

  onPlayClicked() {
    if (this.playing)
      this.pause()
    else
      this.play()
  }

  private loadLocalFile(filepath): Promise<any> { // convert mp3 local file to readable url for html audio tag
    const songPromise = new Promise((resolve, reject) => {
      fs.readFile(filepath, (err, data) => {
        if (err) { reject(err); }
        resolve(dataurl.convert({ data, mimetype: 'audio/mp3' }));
      });
    });
    return songPromise;
  };

  private getVolumeIcon() {
    if (this.audio.volume == 0)
      return 'volume_off'
    else if (this.audio.volume < 0.33)
      return 'volume_mute'
    else if (this.audio.volume < 0.66)
      return 'volume_down'
    else
      return 'volume_up'
  }

  private secondsToMinutesAsString(t: any) {
    var sec = Math.floor(t) % 60
    var min = Math.floor(t / 60)
    var res = min + ':' + (sec < 10 ? '0' : '') + sec
    return res
  }

  private getProgressString() {
    return this.secondsToMinutesAsString(this.audio.currentTime) + ' / ' +
           this.secondsToMinutesAsString(this.audio.duration)
  }

  private getName() {
    if (!this.plService.selectedMusic.music_name)
      this.plService.selectedMusic = this.plService.selectedMusic.Music
    if (this.plService.selectedMusic.music_name.length >= 80)
      return this.plService.selectedMusic.music_name.splice(0, 80) + '...'
    return this.plService.selectedMusic.music_name
  }

  private prevMusicClicked() {
    this.prevMusic.emit()
  }

  private nextMusicClicked() {
    this.nextMusic.emit()
  }

}
