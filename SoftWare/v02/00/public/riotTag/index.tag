<index>

  <div class="container-fluid p-0">

    <div class="row no-gutter" style="height:100vh;">

      <!-- playlists -->
      <div class="col-md-1">
        <div style="height:10%">
          <riotPanel id="socialBtn"></riotPanel>
        </div>
        <div style="height:90%">
          <riotPanel id="playlistPanel"></riotPanel>
        </div>
      </div>

        <!-- musics -->
        <div class="col-md-2">

          <div class="menubar">
            <riotPanel id="menubar"></riotPanel>
          </div>

            <div style="height:5%; width:80%">
              <research id="researchMusic"></research>
            </div>
            <div style="height:85%">
              <riotPanel id="musicPanel"></riotPanel>
            </div>

          <div class="menubar">
            <riotPanel id="userSettings"></riotPanel>
          </div>

        </div>

        <!-- middle panel -->
        <div id="middlePanel" class="col-md-7">

          <div class="middle-menubar">
            <riotPanel id="playlistOptions"></riotPanel>
          </div>

          <div style="height:95%; background-color:#484a4c;">

            <!-- social -->
            <div style="height:70%">
              <joinOrCreate></joinOrCreate>
              <invitePeople></invitePeople>
              <changePlaylistName></changePlaylistName>
              <riotPanel id="messages"></riotPanel>
            </div>

            <!-- lecteur media -->
            <div style="height:30%">
              <riotPanel id="mediaplayer"></riotPanel>
            </div>

         </div>

       </div>
        <!-- users -->
        <div id="usersPanel" class="col-md-2">

          <div class="middle-menubar">
            <research id="researchUser"></research>
          </div>

          <div style="height:95%">
            <riotPanel id="users"></riotPanel>
          </div>

        </div>

      </div>

    </div>

<script>

const EventEmitter = require('events');
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

this.on('mount', function(e) {
  console.log('mounting index...');
})

var addPlaylist = [{element : "addPlaylist", param : {name : "addPlaylist"}}];

var socialBtn = [{element : "socialbtn", param : {}}
                , {element : "separator", param : {}}
              ];

var playlists = [{element : "playlist", param : {name : "playlist1", id : '1'
                , image : "../images/hardcore2.jpg", selected : true
                , position : '1', nbPlaylist : 12}}
              , {element : "playlist", param : {name : "playlist2", id : '2'
                , image : "../images/angerfist.jpg"
                , position : '2', nbPlaylist : 12}}
              , {element : "playlist", param : {name : "playlist3", id : '3'
                , image : "../images/lsd.jpg"
                , position : '3', nbPlaylist : 12}}
              , {element : "playlist", param : {name : "playlist4", id : '4'
                , image : "../images/acidcore.jpg"
                , position : '4', nbPlaylist : 12}}
              , {element : "playlist", param : {name : "playlist1", id : '5'
                , image : "../images/hardcore2.jpg"
                , position : '5', nbPlaylist : 12}}
              , {element : "playlist", param : {name : "playlist2", id : '6'
                , image : "../images/angerfist.jpg"
                , position : '6', nbPlaylist : 12}}
              , {element : "playlist", param : {name : "playlist3", id : '7'
                , image : "../images/lsd.jpg"
                , position : '7', nbPlaylist : 12}}
              , {element : "playlist", param : {name : "playlist4", id : '8'
                , image : "../images/acidcore.jpg"
                , position : '8', nbPlaylist : 12}}
              , {element : "playlist", param : {name : "playlist1", id : '9'
                , image : "../images/hardcore2.jpg"
                , position : '9', nbPlaylist : 12}}
              , {element : "playlist", param : {name : "playlist2", id : '10'
                , image : "../images/angerfist.jpg"
                , position : '10', nbPlaylist : 12}}
              , {element : "playlist", param : {name : "playlist3", id : '11'
                , image : "../images/lsd.jpg"
                , position : '11', nbPlaylist : 12}}
              , {element : "playlist", param : {name : "playlist4", id : '12'
                , image : "../images/acidcore.jpg"
                , position : '12', nbPlaylist : 12}}
              , {element : "addplaylist", param : {name : "addPlaylist"}}
              ];

var musics = [{element : "music", param : {title : "music1"
                , artist:'Jean-Jacques Goldman', id : '1'
                , url : "../musics/watch.mp3"
                , playlistName : "playlist1", selected : true, position : 1}}
              , {element : "music", param : {title : "music2", nbMusics : 44
                , artist:'Jean-Jacques Goldman', id : '2', position : 2
                , url : "../musics/watch.mp3", playlistName : "playlist1"}}
              , {element : "music", param : {title : "music3", nbMusics : 44
                , artist:'Jean-Jacques Goldman', id : '3', position : 3
                , url : "../musics/watch.mp3", playlistName : "playlist1"}}
              , {element : "music", param : {title : "music4", nbMusics : 44
                , artist:'Jean-Jacques Goldman', id : '4', position : 4
                , url : "../musics/watch.mp3", playlistName : "playlist1"}}
              , {element : "music", param : {title : "music5", nbMusics : 44
                , artist:'Jean-Jacques Goldman', id : '5', position : 5
                , url : "../musics/watch.mp3", playlistName : "playlist1"}}
              , {element : "music", param : {title : "music6", nbMusics : 44
                , artist:'Jean-Jacques Goldman', id : '6', position : 6
                , url : "../musics/watch.mp3", playlistName : "playlist1"}}
              , {element : "music", param : {title : "music7", nbMusics : 44
                , artist:'Jean-Jacques Goldman', id : '7', position : 7
                , url : "../musics/watch.mp3", playlistName : "playlist1"}}
              , {element : "music", param : {title : "music8", nbMusics : 44
                , artist:'Jean-Jacques Goldman', id : '8', position : 8
                , url : "../musics/watch.mp3", playlistName : "playlist1"}}
              , {element : "music", param : {title : "music2", nbMusics : 44
                , artist:'Jean-Jacques Goldman', id : '2', position : 9
                , url : "../musics/watch.mp3", playlistName : "playlist1"}}
              , {element : "music", param : {title : "music3", nbMusics : 44
                , artist:'Jean-Jacques Goldman', id : '3', position : 10
                , url : "../musics/watch.mp3", playlistName : "playlist1"}}
              , {element : "music", param : {title : "music4", nbMusics : 44
                , artist: 'Alifer™', id : '4', position : 11
                , url : "../musics/watch.mp3", playlistName : "playlist1"}}
              , {element : "music", param : {title : "music5", nbMusics : 44
                , artist: 'Alifer™', id : '5', position : 12
                , url : "../musics/watch.mp3", playlistName : "playlist1"}}
              , {element : "music", param : {title : "music6", nbMusics : 44
                , artist: 'Alifer™', id : '6', position : 13
                , url : "../musics/watch.mp3", playlistName : "playlist1"}}
              , {element : "music", param : {title : "music7", nbMusics : 44
                , artist: 'Alifer™', id : '7', position : 14
                , url : "../musics/watch.mp3", playlistName : "playlist1"}}
              , {element : "music", param : {title : "music8", nbMusics : 44
                , artist: 'Alifer™', id : '8', position : 15
                , url : "../musics/watch.mp3", playlistName : "playlist1"}}
              , {element : "music", param : {title : "music2", nbMusics : 44
                , artist: 'Alifer™', id : '2', position : 16
                , url : "../musics/watch.mp3", playlistName : "playlist1"}}
              , {element : "music", param : {title : "music3", nbMusics : 44
                , artist: 'Alifer™', id : '3', position : 17
                , url : "../musics/watch.mp3", playlistName : "playlist1"}}
              , {element : "music", param : {title : "music4", nbMusics : 44
                , artist: 'TotoLaFripouille', id : '4', position : 18
                , url : "../musics/watch.mp3", playlistName : "playlist1"}}
              , {element : "music", param : {title : "music5", nbMusics : 44
                , artist: 'TotoLaFripouille', id : '5', position : 19
                , url : "../musics/watch.mp3", playlistName : "playlist1"}}
              , {element : "music", param : {title : "music6", nbMusics : 44
                , artist: 'TotoLaFripouille', id : '6', position : 20
                , url : "../musics/watch.mp3", playlistName : "playlist1"}}
              , {element : "music", param : {title : "music7", nbMusics : 44
                , artist: 'TotoLaFripouille', id : '7', position : 21
                , url : "../musics/watch.mp3", playlistName : "playlist1"}}
              , {element : "music", param : {title : "music8", nbMusics : 44
                , artist: 'TotoLaFripouille', id : '8', position : 22
                , url : "../musics/watch.mp3", playlistName : "playlist1"}}
              , {element : "music", param : {title : "music2", nbMusics : 44
                , artist: 'MrBiscotte2018', id : '2', position : 23
                , url : "../musics/watch.mp3", playlistName : "playlist1"}}
              , {element : "music", param : {title : "RPZ", nbMusics : 44
                , artist: 'MrBiscotte2018', id : '3', position : 24
                , url : "../musics/watch.mp3", playlistName : "playlist1"}}
              , {element : "music", param : {title : "hardcore", nbMusics : 44
                , artist: 'MrBiscotte2018', id : '4', position : 25
                , url : "../musics/watch.mp3", playlistName : "playlist1"}}
              , {element : "music", param : {title : "music5", nbMusics : 44
                , artist: 'MrBiscotte2018', id : '5', position : 26
                , url : "../musics/watch.mp3", playlistName : "playlist1"}}
              , {element : "music", param : {title : "music6", nbMusics : 44
                , artist: 'MrBiscotte2018', id : '6', position : 27
                , url : "../musics/watch.mp3", playlistName : "playlist1"}}
              , {element : "music", param : {title : "music7", nbMusics : 44
                , artist: 'MrBiscotte2018', id : '7', position : 28
                , url : "../musics/watch.mp3", playlistName : "playlist1"}}
              , {element : "music", param : {title : "music8", nbMusics : 44
                , artist: 'MrBiscotte2018', id : '8', position : 29
                , url : "../musics/watch.mp3", playlistName : "playlist1"}}
              , {element : "music", param : {title : "music2", nbMusics : 44
                , artist: 'FriteMan', id : '2', position : 30
                , url : "../musics/watch.mp3", playlistName : "playlist1"}}
              , {element : "music", param : {title : "L'Homme Frite", nbMusics : 44
                , artist: 'FriteMan', id : '3', position : 31
                , url : "../musics/watch.mp3", playlistName : "playlist1"}}
              , {element : "music", param : {title : "music4", nbMusics : 44
                , artist: 'FriteMan', id : '4', position : 32
                , url : "../musics/watch.mp3", playlistName : "playlist1"}}
              , {element : "music", param : {title : "music5", nbMusics : 44
                , artist: 'FriteMan', id : '5', position : 33
                , url : "../musics/watch.mp3", playlistName : "playlist1"}}
              , {element : "music", param : {title : "music6", nbMusics : 44
                , artist: 'FriteMan', id : '6', position : 34
                , url : "../musics/watch.mp3", playlistName : "playlist1"}}
              , {element : "music", param : {title : "music7", nbMusics : 44
                , artist: 'FriteMan', id : '7', position : 35
                , url : "../musics/watch.mp3", playlistName : "playlist1"}}
              , {element : "music", param : {title : "music8", nbMusics : 44
                , artist: 'FriteMan', id : '8', position : 36
                , url : "../musics/watch.mp3", playlistName : "playlist1"}}
              , {element : "music", param : {title : "music2", nbMusics : 44
                , artist: 'FriteMan', id : '2', position : 37
                , url : "../musics/watch.mp3", playlistName : "playlist1"}}
              , {element : "music", param : {title : "music3", nbMusics : 44
                , artist: 'FriteMan', id : '3', position : 38
                , url : "../musics/watch.mp3", playlistName : "playlist1"}}
              , {element : "music", param : {title : "music4", nbMusics : 44
                , artist: 'EncoreUnArtiste', id : '4', position : 39
                , url : "../musics/watch.mp3", playlistName : "playlist1"}}
              , {element : "music", param : {title : "music5", nbMusics : 44
                , artist: 'EncoreUnArtiste', id : '5', position : 40
                , url : "../musics/watch.mp3", playlistName : "playlist1"}}
              , {element : "music", param : {title : "music6", nbMusics : 44
                , artist: 'EncoreUnArtiste', id : '6', position : 42
                , url : "../musics/watch.mp3", playlistName : "playlist1"}}
              , {element : "music", param : {title : "music7", nbMusics : 44
                , artist: 'EncoreUnArtiste', id : '7', position : 43
                , url : "../musics/watch.mp3", playlistName : "playlist1"}}
              , {element : "music", param : {title : "music8", nbMusics : 44
                , artist: 'EncoreUnArtiste', id : '8', position : 44
                , url : "../musics/watch.mp3", playlistName : "playlist1"}}
              ];

var mediaplayer = [{element : "mediaplayer", param : {}}];

var userOnClick = function (e, self) {
  self.refs.popout.style.visibility = self.options ? 'hidden' : 'visible';
  self.options = self.options ? false : true;
  console.log('show this shit: ', self.refs.popout.style.visibility);
  console.log('self.options: ', self.options);
}

var users = [{element : "usergroup", param : {name : "Administrateur"
      , nbUser : 1, users : [{element : "user", param : {name : "PSPAdmin"
        , image : "../images/PSPAdmin.jpeg", status : "afk", id : 1}}]}}
        , {element : "usergroup", param : {name : "En ligne", nbUser : 6
, users : [{element : "user", param : {name : "KETAMAX"
            , image : "../images/ketamax.jpg", status : "online"
            , admin : true, id : 2, userOnClick : userOnClick}}
          , {element : "user", param : {name : "ITIZ"
            , image : "../images/itiz.png", status : "afk", id : 3}}
          , {element : "user", param : {name : "TuturLaVoiture"
            , image : "../images/psp.png", status : "afk", id : 4}}
          , {element : "user", param : {name : "Angry_Capitalist"
            , image : "../images/psp.png", status : "online", id : 5}}
          , {element : "user", param : {name : "TuturLaVoiture"
            , image : "../images/psp.png", status : "afk", id : 6}}
          , {element : "user", param : {name : "Angry_Capitalist"
            , image : "../images/psp.png", status : "online", id : 7}}
          ]}}
        , {element : "usergroup", param : {name : "Hors ligne", nbUser : 9
, users : [{element : "user", param : {name : "MrBiscotte"
            , image : "../images/hugo.png", status : "offline", id : 10}}
          , {element : "user", param : {name : "Khedira"
            , image : "../images/psp.png", status : "offline", id : 11}}
          , {element : "user", param : {name : "gabo34"
            , image : "../images/psp.png", status : "offline", id : 12}}
          , {element : "user", param : {name : "henryTeteDeBois"
            , image : "../images/psp.png", status : "offline", id : 13}}
          , {element : "user", param : {name : "MomoLaFrite"
            , image : "../images/psp.png", status : "offline", id : 14}}
          , {element : "user", param : {name : "Khedira"
            , image : "../images/psp.png", status : "offline", id : 15}}
          , {element : "user", param : {name : "gabo34"
            , image : "../images/psp.png", status : "offline", id : 16}}
          , {element : "user", param : {name : "henryTeteDeBois"
            , image : "../images/psp.png", status : "offline", id : 17}}
          , {element : "user", param : {name : "MomoLaFrite"
            , image : "../images/psp.png", status : "offline", id : 18}}
          ]}}];

var userSettings = [{element : "usersettings", param : {name : "KETAMAX"
            , image : "../images/ketamax.jpg", status : "online"}}]

var playlistOptions = [{element : "hideshowusers"
, param : {name : "hideshowusers"}}, {element : "notifications"
, param : {name : "notifications", on : true}}];

riot.mount('#socialBtn', {elements : socialBtn, name : "socialBtn"
  , color : '#212326', borders : ["", "", "", ""]});
riot.mount('#playlistPanel', {elements : playlists, name : "playlists"
  , color : '#212326', borders : ["", "", "", ""], scrollBar : true});

riot.mount('#playlistOptions', {elements: playlistOptions, color : '#2C2C2C'
  , flexDirection : 'row', borders : ["", "", "", ""]
  , alignItems: 'flex-end'});


var musicPanel = {elements : musics, name : "musics"
  , borders : ["", "", "", ""], alignItems : "left", scrollBar : true
, color: '#363636'};
riot.mount('#musicPanel', musicPanel);


var messages = [
, {element : "message", param : {user : "toto", content : "hello", id : '1'}}
, {element : "message", param : {user : "titi", content : "hey :)", id : '2'}}
]

//riot.mount('#messages', {elements : messages, name : "message panel"});

var MP = riot.mount('#mediaplayer', {elements : mediaplayer, name : "mediaplayer"
, borders : ["","","",""]});

//console.log('MP: ', MP);

var userGroup = {elements : users, name : "users"
  , borders : ["", "", "", ""], scrollBar : true, color: '#363636'};

riot.mount('#users', userGroup);

var menubar = [{element : "menubar", param : { currentPlaylist : {name : "playlist1", id : '1'
, image : "../images/hardcore2.jpg"}}}];

riot.mount('#menubar', {elements : menubar, name : "menubar", color : '#363636'
  , borders : ["", "", "", ""]});
riot.mount('#userSettings', {elements : userSettings, color: '#2C2C2C'
  , borders : ["", "", "", ""], alignItems : "left", flexDirection : "row"});

console.log('musicPanel : ', musicPanel);
console.log('userGroup : ', userGroup);

  function musicResearch(input, researchField) {
    console.log('music input:', input);
    var regex = new RegExp('^' + input + '.*$', 'i');
    var nResearchField = JSON.parse(JSON.stringify(researchField));
    var musics = nResearchField.elements;
    var results = new Array();

    for (var i = 0; i < musics.length; ++i) {
      console.log('musics[i].param.artist: ', musics[i].param.artist);
      if (regex.test(musics[i].param.artist)
        || regex.test(musics[i].param.title)) {
        //musics.splice(i, 1);
        results.push(musics[i]);
      }
    }

    nResearchField.elements = results;
    console.log('music results: ', results);
    riot.mount('#musicPanel', nResearchField);
  }

  function userResearch(input, researchField) {
    console.log('researchField: ', researchField.elements);
    var regex = new RegExp('^' + input + '.*$', 'i');
    var nResearchField = JSON.parse(JSON.stringify(researchField));
    var userGroup = nResearchField.elements;
    var results = JSON.parse(JSON.stringify(userGroup));

    for (var i = 0; i < results.length; ++i) {
      results[i].param.users = new Array();
    }

    for (var i = 0; i < userGroup.length; ++i) {
      //console.log('userGroup[i].param.name: ', userGroup[i].param.name);
      for (var j = 0; j < userGroup[i].param.users.length; ++j) {
        //console.log('userGroup[i].param.users[j].param.name: '
          //, userGroup[i].param.users[j].param.name);
        if (regex.test(userGroup[i].param.users[j].param.name)) {
          results[i].param.users.push(userGroup[i].param.users[j]);
        }
      }
    }

    for (var i = 0; i < results.length; ++i) {
      if (results[i].param.users.length == 0)
        results.splice(i, 1);
      else {
        results[i].param.nbUser = results[i].param.users.length;
      }
    }

    //researchField.elements = userGroup;
    console.log('true results: ', results);
    nResearchField.elements = results;
    riot.mount('#users', nResearchField);
  }

  var opts = {param : {researchField : musicPanel
    , researchAlgo : musicResearch, type : 'musics'}}

  riot.mount('#researchMusic', opts);
  /*riot.mount('#researchUser', {param : {researchField : userGroup
    , researchAlgo : userResearch, type : 'users'}});*/


</script>

</index>
