<playlist>

<div class="row align">
  <!-- <div class="arrow-right" ref="arrow" name="arrow"></div> -->
  <div onclick={ handler } id={ id } ref="playlist" class="crop {selected ? 'current' : ''}" style="background-image: url('{ image }')">
  </div>
</div>

  <script>

  var self = this;

  this.name = opts.param.playlist.playlist_name;
  this.image = (opts.param.playlist.playlist_img || "../images/psp.png");
  this.id = opts.param.playlist.playlist_id;
  this.selected = opts.param.selected || false;
  this.position = opts.param.position;
  this.currPlaylistPos = 0;
  this.nbPlaylist = opts.param.nbPlaylist;
  this.musics = {};
  this.playlist = opts.param.playlist;

  this.on('mount', function() {
    if (self.selected) {
      console.log('MOUNTING FIRST PL')

        /*this.getMusicOfPlaylist(this.setMusicOfPlaylist, function(musics) {
          console.log('retrieving musics from the first pl: ', musics);
          myEmitter.emit('readMusic', {music : musics[0].param, auto_play : false});
          myEmitter.emit('initialize', self.position);

          self.getUsers(function() {
            console.log('retrieving users from first playlist ok');
            self.showPlaylistInfo();
          })
        });*/

        //self.handler('e');

        this.getMusicOfPlaylist(function(musics) {
          console.log('MUSIC OF PLAYLIST: ', musics);
          self.getUsers(function(users) {
            console.log('SETTING USERS')
            self.formatUsers(users);
            self.setMusicOfPlaylist(musics);
            self.showPlaylistInfo();
          });
        });
    }

  })

  myEmitter.on('initialize', function(currPos) {
    self.currPlaylistPos = currPos;
  })

  /*myEmitter.on('ffLeftPL', function () {
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
  })*/


  /*myEmitter.on('ffRightPL', function() {
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
  });*/

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

    myEmitter.emit('switchingPlaylist', opts.param.playlist);
    self.showPlaylistInfo();

    var menubar = [{element : "menubar", param : { currentPlaylist :
      {name : self.name, id : self.id, image : self.image}}}];

      this.getMusicOfPlaylist(function(musics) {
        console.log('MUSIC OF PLAYLIST: ', musics);
        self.getUsers(function(users) {
          console.log('SETTING USERS')
          self.formatUsers(users);
          self.setMusicOfPlaylist(musics);
        });
      });
  }

      setMusicOfPlaylist(musicLink) {
        var musics = new Array();

        for (var i = 0; i < musicLink.length; ++i) {
          if (musicLink[i].Music) {
            var music = {};

            music.element = "music";
            music.param = musicLink[i].Music;

            musics.push(music);
          }
        }

        console.log('Music: ', musics);
        console.log('riot: ', riot);

        //self.musics = musics;
        riot.mount('#musicPanel', {elements : musics, name : "musics"
          , borders : ["", "", "", ""], alignItems : "left", scrollBar : true
          , color: '#363636'});
      }

      getMusicOfPlaylist(next) {
        console.log('INDEX: ', index);
        index.requestMusics(next, self.id);
        /*options.path = "/api/playlist/" + this.id;
        options.method = "GET";

        console.log('getMusicOfPlaylist: ', options);
        requestManager.request(baseURL, options, null, function(rslt, req, err) {
          console.log('music rslt : ', rslt);
          next(rslt.rslt.Playlist.MusicLink, next2);
        })*/
      }

      myEmitter.on('plNameChange', function(pl) {
        if (this.id == pl.id) {
          console.log('playlist plNameChange');
          this.name = pl.name;
          self.update();
        }
      })

      getUsers(next) {
        /*options.method = 'GET';
        options.path = '/api/playlist/users/' + self.id;

        console.log('getUSers: ', options);
        requestManager.request(baseURL, options, null
          , function(rslt, req, err) {

            console.log('USERS : ', rslt.rslt);
            self.formatUsers(rslt.rslt.Playlist.rows[0]);
            //next();
        })*/
        index.requestUsers(next, self.id);
      }

      formatUsers(users) {
        console.log('format users: ', users);
        var creator = users.Creator;
        var subscriber = users.Subscriber;

        var groupUser = [{element : "usergroup", param : {name : "Users"
            , nbUser : 1 + subscriber.length, users : [{element : "user"
            , param : {name : creator.usr_login
                    , image : "../images/psp.png", status : 'online'
                    , admin : true
                    , id : creator.usr_id}}]}}];

        for (var i = 0; i < subscriber.length; ++i) {
          var sub = subscriber[i].Subscriber;
          var elm = {element : "user", param : {name : sub.usr_login
                      , image : "../images/psp.png", status : 'online'
                      , admin : subscriber[i].usr_role == "admin" ? true : false
                      , id : sub.usr_id}};

          groupUser[0].param.users.push(elm);
        }

        riot.mount('#users', {elements : groupUser
                            , name : "usersGroup"
                            , borders : ["", "", "", ""], scrollBar : true
                            , color: '#363636'});
      }

      showPlaylistInfo() {
        myEmitter.emit('showPlaylistInfo', self.playlist);

        riot.mount('playlistInfo', self.playlist);
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
