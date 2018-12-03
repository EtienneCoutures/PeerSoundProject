import { Component, OnInit, Input } from '@angular/core';
import reframe from 'reframe.js'
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

export class YtPlayerComponent implements OnInit {

  public YT: any;
  public video: any;
  public player: any;
  public reframed: Boolean = false;

  @Input() url: string = null;

  constructor() { }
  init() {
    var tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    // tag.src = this.url;
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }

  ngOnInit() {
    this.init();
    console.log('cul', new Url(this.url).query.substr(3))

    // this.video = '1cH2cerUpMQ' //video id
    this.video = new Url(this.url).query.substr(3)
    if (myGlobals.ytApiLoadedOnce) {
      this.onYouTubeIframeAPIReady(undefined)
    }

    window['onYouTubeIframeAPIReady'] = (e) => {
      myGlobals.setYtApiLoadedOnce(true)
      this.onYouTubeIframeAPIReady(e)
    };
  }

  onYouTubeIframeAPIReady(e) {
    this.YT = window['YT'];
    this.reframed = false;

    this.player = new window['YT'].Player('player', {
      videoId: this.video,
      events: {
        'onStateChange': this.onPlayerStateChange.bind(this),
        'onError': this.onPlayerError.bind(this),
        'onReady': (e) => {
          if (!this.reframed) {
            if (e) {
              this.reframed = true;
              reframe(e.target.a);
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
