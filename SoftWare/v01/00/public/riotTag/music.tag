<music>

<div onclick={readMusic} id="music_{position}" class="{selected ? 'selected' : ''}">
  <div class="trackItem g-flex-row sc-type-small sc-type-light">
    <div class="trackItem__image">
      <div class="image m-sound image__lightOutline readOnly customImage sc-artwork sc-artwork-placeholder-8 m-loaded" style="height: 30px; width: 30px;">
        <span style="background-image: url(&quot;https://i1.sndcdn.com/artworks-000009032609-bdc26i-t50x50.jpg&quot;); width: 30px; height: 30px; opacity: 1;" class="sc-artwork sc-artwork-placeholder-8  image__full g-opacity-transition" aria-label="Requiem for a Trip" aria-role="img"></span>
      </div>
      <div class="trackItem__play"></div>
    </div>
    <!--<div class="trackItem__numberWrapper">
      <span class="trackItem__number sc-font-tabular">{position || id}<span class="sc-type-light">—</span></span>
    </div>-->
    <div style="display: block; width: 75%;">
        <!--<div style="display: block; width: 100%;">-->
          <label class="trackItem__username sc-link-light">{artist}</label>
          <span class="sc-type-light">—</span>
          <label class="trackItem__trackTitle sc-link-dark sc-font-light">{title}</label>
        <!--</div>-->
        <!--<div style="display: inline-block; text-align: right; width: 95%;background: green;">-->
          <label ref="play" aria-role="button" href="" class="sc-button-play playButton sc-button sc-button-small" tabindex="0" title="Play" style="float: right !important;" draggable="true">Play</label>
          <label ref="pause" aria-role="button" href="" class="sc-button-pause pauseButton sc-button sc-button-small" tabindex="0" title="Pause" draggable="true" style="float: right !important">Pause</label>
        <!--</div>-->
      </div>
    </div>
  </div>

  <div class="popout popout-bottom" ref="popout" style="z-index: 1000; overflow: hidden; visibility: hidden; display: none; left: 120px; top: 40px; height: 192px; width: 216px; transform: translateY(0%) translateX(-50%) translateZ(0px);position absolute;">
    <div class="menu-3BZuDT">
      <div class="item-rK1j5B">
        <div class="icon-3ICDZz" style="background-image: url(&quot;../images/editPlaylistName.svg&quot;);"></div>
        <div class="label-HtH0tJ" onclick={changePlaylistName}>Changer le nom</div>
      </div>
      <div class="separator-1hpa3S"></div>
      <div class="item-rK1j5B leave-2bjeRM">
        <div class="icon-3ICDZz"><i class="fa fa-times-circle"></i></div>
        <div class="label-HtH0tJ">Supprimer</div>
      </div>
    </div>
  </div>


  <script>

  var self = this;

  this.selected = (opts.param.selected || false);
  this.name = opts.param.music_name;
  this.url = opts.param.music_url;
  this.id = opts.param.music_id;
  this.picture = opts.param.music_picture_default;
  this.artist = (opts.param.music_group || 'Alifer™');
  this.title = (opts.param.music_name || 'Requiem for a Trip');
  this.position = opts.param.music_id;

  this.currMusicPos = 1;
  this.popup = false;

  this.on('mount', function() {
    self.updateSelection();

    $('#music_' + self.position).contextmenu(function() {
      self.refs.popout.style.visibility = self.popup ? 'hidden' : 'visible';
      self.refs.popout.style.display = self.popup ? 'none' : 'block';
      self.popup = self.popup ? false : true;
    });

    if (self.selected)
      myEmitter.emit('initializeMusics', self.position);
  })


  updateSelection() {
    /*if (!self.refs.play || self.refs.pause)
      return ;*/

    if (self.selected) {
      self.refs.play.style.visibility = 'hidden';
      self.refs.play.style.display = 'none';
      self.refs.pause.style.visibility = 'visible';
      self.refs.pause.style.display = 'inline-block';
    } else {
      self.refs.play.style.visibility = 'visible';
      self.refs.pause.style.visibility = 'hidden';
      self.refs.pause.style.display = 'none';
      self.refs.play.style.display = 'inline-block';
    }
  }

  myEmitter.on('deselectMusic', function(position) {
    if (self.selected) {
      self.selected = false;
      self.update();
    }
    self.currMusicPos = position;
  });

  readMusic(e) {
    self.refs.popout.style.visibility = 'hidden';
    self.refs.popout.style.display = 'none';
    self.popup = false;

    console.log('readmUsic musc');
    myEmitter.emit('readMusic', opts.param);
    myEmitter.emit('deselectMusic', self.position);
    self.selected = true;
    self.refs.play.style.visibility = 'hidden';
    self.refs.play.style.display = 'none';
    self.refs.pause.style.visibility = 'visible';
    self.refs.pause.style.display = 'inline-block';
    self.update();
  }

  myEmitter.on('initializeMusics', function(currPos) {
    self.currMusicPos = currPos;
  })

  myEmitter.on('readMusic', function(e) {
    if (self.selected) {
      self.selected = false;
      self.refs.play.style.visibility = 'visible';
      self.refs.pause.style.visibility = 'hidden';
      self.refs.pause.style.display = 'none';
      self.refs.play.style.display = 'inline-block';
      self.update();
    }
  })

  myEmitter.on('ffRightMusic', function() {
    if (self.currMusicPos >= self.nbMusics) {
      return;
    }

    if (self.selected) {
      self.selected = false;
      self.updateSelection();
      self.update();
    } else if (self.position == (parseInt(self.currMusicPos) + 1)) {
      self.selected = true;
      self.updateSelection();
      self.update();
    }
    ++self.currMusicPos;
  });

  myEmitter.on('ffLeftMusic', function() {
    if (self.currMusicPos == 1) {
      return;
    }

    if (self.selected) {
      self.selected = false;
      self.updateSelection();
      self.update();
    } else if (self.position == (parseInt(self.currMusicPos) - 1)) {
      self.selected = true;
      self.updateSelection();
      self.update();
    }
    --self.currMusicPos;
  });

  </script>

  <style>

  :scope {
    margin-top: 5px;
    margin-left: 10px;
    width: 100%;
    position: relative;
  }

  .selected {
    background-color: #d1d1e0;
  }

  :scope:hover {
    background-color: #d1d1e0;
  }

  </style>

</music>
