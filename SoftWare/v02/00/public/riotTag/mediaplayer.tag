<mediaplayer>

<div class="row">
  <div id="overlay" name="overlay" ref="overlay" style="display: {showVolume ? 'block' : 'none'}">
  </div>
</div>

<div class="row center">
  <div onclick={ ffLeftPL } class="little_btn" style="background-image: url('{ pathFFLeft }')"></div>
  <div class="margin">{ currPlaylist }</div>
  <div onclick={ ffRightPL } class="little_btn" style="background-image: url('{ pathFFRight }')"></div>
</div>

<div class="row center">
  <div onclick={ ffLeftMusic } class="button" style="background-image: url('{ pathFFLeft }')"></div>
  <div class="margin">{currMusicArtist}-{ currMusic }</div>
  <div onclick={ ffRightMusic } class="button" style="background-image: url('{ pathFFRight }')"></div>
</div>

<div class="row">
  <audio ref="myaudio" id="myaudio" name="myaudio" preload="metadata">
    HTML5 audio not supported
  </audio>
</div>

  <div class="col-md-5 center">
    <div onclick={ playPauseAudio } class="button margin" style="background-image: url('{ play ? pathPauseBtn : pathPlayBtn }')"></div>
    <div onclick={ volume } class="button margin" style="background-image: url('{ pathVolume }')"></div>
  </div>

  <div class="col-md-5 center">
    { currMusicTime } / { currMusicLength }
    <div onclick={ download } class="little_btn margin" style="background-image: url('{ pathDownload }')"></div>
  </div>

<div class="row center">
  <canvas ref="canvas" id="canvas" name="canvas" width="70%" height="10%">
    canvas not supported
  </canvas>
</div>


  <script>

  var self = this;

  this.play = false;
  this.showVolume = false;

  this.pathPlayBtn = "../images/play_button.jpg";
  this.pathPauseBtn = "../images/pause_button.jpg";
  this.pathFFLeft = "../images/ff_left.jpg";
  this.pathFFRight = "../images/ff_right.jpg";
  this.pathVolume = "../images/volume.jpg";
  this.pathDownload = "../images/download.jpg";

  this.currPlaylist = "Playlist1";
  this.currMusic = "music1";
  this.currMusicArtist = "Jean-Jacques Goldman";
  this.currMusicTime = "00:00";
  this.currMusicLength = "00:00";

  this.on('mount', function() {
    console.log('this.refs: ', this.refs);
    console.log('this: ', this);

    this.oAudio = this.refs.myaudio;
    this.canvas = this.refs.canvas;
    this.overlay = this.refs.overlay;

    this.oAudio.addEventListener("timeupdate", this.progressBar, true);
    this.oAudio.addEventListener("timeupdate", this.updateTime, true);
    this.canvas.addEventListener("click", this.clickCanvas, true);
    this.canvas.addEventListener("click", this.updateTime, true);

    this.oAudio.src = "../musics/watch.mp3";
    //self.currMusicLength = self.getTimeInMinutes(self.oAudio.duration);
  })

  myEmitter.on('readMusic', function(music) {
    console.log('readmusic bitch :', music);
    self.currPlaylist = music.playlistName;
    self.currMusic = music.title;
    self.currMusicArtist = music.artist;
    self.oAudio.src = music.url;
    self.update();
    self.playPauseAudio('c');
  })

  /*myEmitter.on('changePlaylist', function(playlist) {
    self.currPlaylist = playlist.name;

  })*/

  playPauseAudio(e) {
    try {
      this.play = !this.play;
      this.play ? self.oAudio.play() : self.oAudio.pause();
    }
    catch (e) {
      if (window.console && console.error("Error:" + e));
    }
  }

  this.updateTime = function() {
    var elapsedTime = Math.round(self.oAudio.currentTime);
    self.currMusicTime = self.getTimeInMinutes(Math.round(elapsedTime));
    self.update();

    if (self.currMusicLength === "00:00")
      self.currMusicLength = self.getTimeInMinutes(self.oAudio.duration);
  }

  this.progressBar = function() {
    var elapsedTime = Math.round(self.oAudio.currentTime);

    if (self.canvas.getContext) {
      var ctx = canvas.getContext("2d");

      ctx.clearRect(0, 0, self.canvas.clientWidth, self.canvas.clientHeight);
      ctx.fillStyle = "rgb(66, 143, 244)";
      var fWidth = (elapsedTime / self.oAudio.duration)
                    * (self.canvas.clientWidth);
      if (fWidth > 0) {
        ctx.fillRect(0, 0, fWidth, self.canvas.clientHeight);
      }
    }
 }

 this.clickCanvas = function(e) {
   if (!e) {
     e = window.event;
   }
   try {
     self.oAudio.currentTime = self.oAudio.duration
                             * (e.offsetX / self.canvas.clientWidth);
   }
   catch (err) {
     if (window.console && console.error("Error:" + err));
   }
 }

 this.getTimeInMinutes = function(second) {
   var nMin = Math.floor(second / 60);
   var nSnd = Math.round(second % 60);
   var time = "";

   if (nMin >= 10) {
     time += nMin + ":";
   } else if (nMin < 10) {
     time += "0" + nMin + ":";
   } else {
     time += "00:";
   }

   if (nSnd >= 10) {
     time += nSnd;
   } else if (nSnd < 10) {
     time += "0" + nSnd;
   } else {
     nSnd += "00";
   }

   return time;
 }

  download(e) {
    console.log('download');
  }

  volume(e) {
    console.log('Show volume');
    this.showVolume = !this.showVolume;
  }

  ffLeftPL(e) {
    console.log('ffLeftPL');
    myEmitter.emit('ffLeftPL');
  }

  ffRightPL(e) {
    console.log('ffRightPL');
    myEmitter.emit('ffRightPL');
  }

  ffLeftMusic(e) {
    myEmitter.emit('ffLeftMusic');
    console.log('ffLeftMusic');
  }

  ffRightMusic(e) {
    myEmitter.emit('ffRightMusic');
    console.log('ffRightMusic');
  }

  </script>

  <style>

  .margin {
    margin : 10px;
  }

  #canvas  {
    margin-top:10px;
    border-style:solid;
    border-width:1px;
    background-color: white;
  }

  #overlay {
    position: fixed; /* Sit on top of the page content */
    display: none; /* Hidden by default */
    width: 30px; /* Full width (cover the whole page) */
    height: 100px; /* Full height (cover the whole page) */
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.5); /* Black background with opacity */
    z-index: 2; /* Specify a stack order in case you're using a different order for other elements */
    cursor: pointer; /* Add a pointer on hover */
  }

  .hp_slide{
    width:100%;
    background:white;
    height:25px;
  }

  .hp_range{
    width:5%;
    background:black;
    height:35px;
  }

  .center {
    display: flex;
    justify-content: center; /* align horizontal */
    align-items: center; /* align vertical */
    margin : 10px;
  }

  .button {
    width : 60px;
    height : 60px;
    border-radius: 30px;
    background-position: center;
    background-size: cover;
    overflow: hidden;
  }

  .little_btn {
    width : 40px;
    height : 40px;
    border-radius: 20px;
    background-position: center;
    background-size: cover;
    overflow: hidden;
  }

  .little_btn img {
    width : 40px;
    height: 20px;
  }

  .button img {
    width : 60px;
    height: 40px;
  }



  </style>

</mediaplayer>
