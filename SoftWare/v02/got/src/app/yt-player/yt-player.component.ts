import { Component, OnInit, Input, OnChanges } from '@angular/core';
// require from 'reframe.js'
import * as myGlobals from '../../globals'

var Url = require('url-parse');

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

  constructor() { }
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
    if (changes.url && changes.url.firstChange === false) {
      this.video = new Url(changes.url.currentValue).query.substr(3)
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
    console.log('cul on yt api ready')

    this.player = new window['YT'].Player('player', {
      videoId: this.video,
      events: {
        'onStateChange': this.onPlayerStateChange.bind(this),
        'onError': this.onPlayerError.bind(this),
        'onReady': (e) => {
          e.target.playVideo()
          if (!this.reframed) {
            if (e) {
              this.reframed = true;
              // reframe(e.target.a);
            }
          }
        }
      }
    });
  }

  onPlayerStateChange(event) {
    console.log('cul', event.data)
    switch (event.data) {
      case window['YT'].PlayerState.PLAYING:
        if (this.cleanTime() == 0) {
          console.log('started ' + this.cleanTime());
        } else {
          console.log('playing ' + this.cleanTime())
        };
        break;
      case window['YT'].PlayerState.PAUSED:
        if (this.player.getDuration() - this.player.getCurrentTime() != 0) {
          console.log('paused' + ' @ ' + this.cleanTime());
        };
        break;
      case window['YT'].PlayerState.ENDED:
        console.log('ended ');
        break;
    };
  };

  //utility
  cleanTime() {
    return Math.round(this.player.getCurrentTime())
  };

  onPlayerError(event) {
    console.log('cul error', event.data)
    switch (event.data) {
      case 2:
        console.log('' + this.video)
        break;
      case 100:
        break;
      case 101 || 150:
        break;
    };
  };
}
