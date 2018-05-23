<playlist>

<div class="row align">
  <!-- <div class="arrow-right" ref="arrow" name="arrow"></div> -->
  <div onclick={ handler } id={ id } ref="playlist" class="crop {selected ? 'current' : ''}" style="background-image: url('{ image }')">
  </div>
</div>

  <script>

  var self = this;

  this.name = opts.param.name;
  this.image = opts.param.image;
  this.id = opts.param.id;
  this.selected = opts.param.selected || false;
  this.position = opts.param.position;
  this.currPlaylistPos = 0;
  this.nbPlaylist = opts.param.nbPlaylist;

  var musics = [{element : "music", param : {name : "music1", id : '1'}}
                , {element : "music", param : {name : "music2", id : '2'}}
                , {element : "music", param : {name : "music3", id : '3'}}
                , {element : "music", param : {name : "music4", id : '4'}}
                , {element : "music", param : {name : "music5", id : '5'}}
                , {element : "music", param : {name : "music6", id : '6'}}
                , {element : "music", param : {name : "music7", id : '7'}}
                , {element : "music", param : {name : "music8", id : '8'}}
              ];

  var users = [{element : "usergroup", param : {name : "En ligne", nbUser : 6
, users : [{element : "user", param : {name : "KETAMAX"
      , image : "../images/ketamax.jpg", status : "online"
      , admin : true}}
    , {element : "user", param : {name : "ITIZ"
      , image : "../images/itiz.png", status : "afk"}}
    , {element : "user", param : {name : "TuturLaVoiture"
      , image : "../images/psp.png", status : "afk"}}
    , {element : "user", param : {name : "Angry_Capitalist"
      , image : "../images/psp.png", status : "online"}}
    , {element : "user", param : {name : "TuturLaVoiture"
      , image : "../images/psp.png", status : "afk"}}
    , {element : "user", param : {name : "Angry_Capitalist"
      , image : "../images/psp.png", status : "online"}}
    ]}}
  , {element : "usergroup", param : {name : "Hors ligne", nbUser : 9
, users : [{element : "user", param : {name : "MrBiscotte"
      , image : "../images/hugo.png", status : "offline"}}
    , {element : "user", param : {name : "Khedira"
      , image : "../images/psp.png", status : "offline"}}
    , {element : "user", param : {name : "gabo34"
      , image : "../images/psp.png", status : "offline"}}
    , {element : "user", param : {name : "henryTeteDeBois"
      , image : "../images/psp.png", status : "offline"}}
    , {element : "user", param : {name : "MomoLaFrite"
      , image : "../images/psp.png", status : "offline"}}
    , {element : "user", param : {name : "Khedira"
      , image : "../images/psp.png", status : "offline"}}
    , {element : "user", param : {name : "gabo34"
      , image : "../images/psp.png", status : "offline"}}
    , {element : "user", param : {name : "henryTeteDeBois"
      , image : "../images/psp.png", status : "offline"}}
    , {element : "user", param : {name : "MomoLaFrite"
      , image : "../images/psp.png", status : "offline"}}
    ]}}];


  this.on('mount', function() {
    console.log('refs: ', this.refs);
    if (self.selected)
      myEmitter.emit('initialize', self.position);
  })

  myEmitter.on('initialize', function(currPos) {
    self.currPlaylistPos = currPos;
  })

  myEmitter.on('ffLeftPL', function () {
    if (self.currPlaylistPos == 1) {
      return;
    }

    if (self.selected) {
      self.selected = false;
      self.update();
    } else if (self.position == (parseInt(self.currPlaylistPos) - 1)) {
      self.selected = true;
      self.update();
    }
    --self.currPlaylistPos;
  })


  myEmitter.on('ffRightPL', function() {
    if (self.currPlaylistPos >= self.nbPlaylist) {
      return;
    }

    if (self.selected) {
      self.selected = false;
      self.update();
    } else if (self.position == (parseInt(self.currPlaylistPos) + 1)) {
      self.selected = true;
      self.update();
    }
    ++self.currPlaylistPos;
  });

  myEmitter.on('deselect', function(position) {
    if (self.selected) {
      self.selected = false;
      self.update();
    }
    self.currPlaylistPos = position;
  });

  handler(e) {
    myEmitter.emit('deselect', self.position);
    self.selected = true;
    self.update();

    var menubar = [{element : "menubar", param : { currentPlaylist :
      {name : self.name, id : self.id, image : self.image}}}];

    riot.mount('#musicPanel', {elements : musics, name : "musics"
      , borders : ["", "", "", ""], alignItems : "left", scrollBar : true
    , color: '#363636'});

    riot.mount('#users', {elements : users, name : "users"
      , borders : ["", "", "", ""], scrollBar : true, color: '#363636'});

    riot.mount('#menubar', {elements : menubar, name : "menubar", color : '#363636'
      , borders : ["", "", "", ""]});

  }

  </script>

  <style scoped>
  :scope {
    border-radius: 40px;
    width : 80px;
    height: 80px;
    margin-top: 10px;
    margin-bottom: 10px;
    margin-left: 45px;
  }

  .current {
    margin-left : 20px;
    border-radius : 30% !important;
  }

  .crop {
    width : 80px;
    height : 80px;
    border-radius: 40px;
    background-position: center;
    background-size: cover;
    overflow: hidden;
  }

  .crop img {
    width : 80px;
    height: 60px;
  }

  </style>

</playlist>
