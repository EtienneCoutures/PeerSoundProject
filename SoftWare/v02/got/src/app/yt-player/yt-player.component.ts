import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { PlaylistService } from '../playlist/playlist.service';

// require from 'reframe.js'

import * as myGlobals from '../../globals'
var Url = require('url-parse');
var Url2 = require("js-video-url-parser")

@Component({
  selector: 'app-yt-player',
  templateUrl: './yt-player.component.html',
  styleUrls: ['./yt-player.component.scss'],
  // template:
  //   ``,
  // styles: [`.max-width-1024 { max-width: 1024px; margin: 0 auto; }`],
})

export class YtPlayerComponent implements OnInit, OnChanges {

  public YT: any;
  public video: any;
  public player: any;
  public reframed: Boolean = false;

  @Input() url: string = null;
  @Input() isPlaying: boolean = false;
  @Output() isPlayingEvent: EventEmitter<boolean> = new EventEmitter();
  @Output() onMusicEnd: EventEmitter<void> = new EventEmitter();

  constructor(private plService : PlaylistService) { }
  init() {
    var tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }

  ngOnInit() {
    this.init();

    this.video = new Url(this.url).query.substr(3)
    if (myGlobals.ytApiLoadedOnce) {
      this.onYouTubeIframeAPIReady(undefined)
    }

    window['onYouTubeIframeAPIReady'] = (e) => {
      myGlobals.setYtApiLoadedOnce(true)
      this.onYouTubeIframeAPIReady(e)
    };

  }

  ngOnChanges(changes: any) {
    console.log('cul changes', changes)
    if (changes.url && changes.url.firstChange === false) {
      console.log(this.player)
      this.video = Url2.parse(changes.url.currentValue).id
      this.player.loadVideoById(this.video)
    }
    if (changes.isPlaying && changes.isPlaying.firstChange === false) {
        if (changes.isPlaying.currentValue)
          this.player.playVideo()
        else
          this.player.pauseVideo()
    }
  }

  onYouTubeIframeAPIReady(e) {
    this.YT = window['YT'];
    this.reframed = false;
    // console.log('cul on yt api ready')

    this.player = new window['YT'].Player('player', {
      videoId: this.video,
      events: {
        'onStateChange': this.onPlayerStateChange.bind(this),
        'onError': this.onPlayerError.bind(this),
        'onReady': (e) => {
          // e.target.playVideo()
          if (!this.reframed) {
            if (e) {
              this.reframed = true;
            }
          }
        }
      }
    });
  }

  onPlayerStateChange(event) {
    // console.log('cul', event.data)
    switch (event.data) {
      case window['YT'].PlayerState.PLAYING:
      console.log('playiing');
        this.plService.isPlaying = true;
        // console.log('play')
        // this.isPlayingEvent.emit(true)
        if (this.cleanTime() == 0) {
          // console.log('started ' + this.cleanTime());
        } else {
          // console.log('playing ' + this.cleanTime())
        };
        break;
      case window['YT'].PlayerState.PAUSED:
        this.plService.isPlaying = false;
        // this.isPlayingEvent.emit(false)
        // this.plService.isPlaying = true
        console.log('pause')
        if (this.player.getDuration() - this.player.getCurrentTime() != 0) {
          // console.log('paused' + ' @ ' + this.cleanTime());
        };
        break;
      case window['YT'].PlayerState.ENDED:
        console.log('ended ');
        this.onMusicEnd.emit();
        break;
    };
  };

  //utility
  cleanTime() {
    return Math.round(this.player.getCurrentTime())
  };

  onPlayerError(event) {
    // console.log('cul error', event.data)
    switch (event.data) {
      case 2:
        // console.log('' + this.video)
        break;
      case 100:
        break;
      case 101 || 150:
        break;
    };
  };
}
