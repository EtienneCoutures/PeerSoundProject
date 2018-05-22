var main = document.getElementById('main');
main.classList.add('show');
var browser = browser || chrome;
var musicName = document.getElementById('musicName');
var playlistName = document.getElementById('playlistName');
var prevM = document.getElementById('previousbtn');
var prevP = document.getElementById('previousbtnP');
var nextM = document.getElementById('nextbtn');
var nextP = document.getElementById('nextbtnP');
var close = document.getElementById("cloclo");
var logout = document.getElementById("outout");
var ProfilName = document.getElementById("name");

var namePlaylist = [];
var idPlaylist = [0];
var MusicFromPlaylist = [{}];
var cptPlaylist = 0;
var cptMusic = 0;
var artist = "";
var music = "";

//récupération de la musique d'une playlist apres un changement de playlist ou le premier load de la page
// plus ajout des li pour le media player
function getMusicFromPlaylist(){
    jQuery.get('https://localhost:8000/api/musiclink',
    function (data){
        if (data){
            console.log("api/musiclink" ,data);
            for (var i = 0; i < data.length; i++){
                if (data[i].usr_id == JSON.parse(localStorage.getItem("id")) &&
                    data[i].playlist_id == idPlaylist[cptPlaylist] &&
                    data[i].Music.music_source == "soundcloud"){
                    MusicFromPlaylist[cptMusic] = data[i].Music;
                    console.log("Music ooo ",  MusicFromPlaylist[cptMusic]);
                    cptMusic++;
                }
            }
            cptMusic = 0;
                musicName.innerHTML = MusicFromPlaylist[cptMusic].music_name + " - " + MusicFromPlaylist[cptMusic].music_group;
            console.log(MusicFromPlaylist[cptMusic].music_url);
            $(".sc-player").empty()
            for (cptMusic = 0; cptMusic < MusicFromPlaylist.length; cptMusic++) {
              $(".sc-player").append("<a href='" + MusicFromPlaylist[cptMusic].music_url + "'></a>")
            }
            cptMusic = 0;
            $("div.sc-player").scPlayer();
        }
    });
}
// récupération des différentes playlist au load de la page
jQuery.get('https://localhost:8000/api/playlist/',
function (data){
    if (data){
        console.log("api/playlist", data);
        for (var i = 0; i < data.length; i++){
            if (data[i].playlist_creator == JSON.parse(localStorage.getItem("id")))
                {
                    namePlaylist[cptPlaylist] = data[i].playlist_name;
                    idPlaylist[cptPlaylist] = data[i].playlist_id;
                    cptPlaylist++;
                }
        }
        cptPlaylist = 0;
        playlistName.innerHTML = namePlaylist[cptPlaylist];
        getMusicFromPlaylist();
    }
});

//next playlist
if (nextP)
    nextP.addEventListener("click", goNextP);
function goNextP()
{
    if (namePlaylist.length -1 > cptPlaylist){
        cptPlaylist++;
        playlistName.innerHTML = namePlaylist[cptPlaylist];
    }
    else{
        cptPlaylist = 0;
        playlistName.innerHTML = namePlaylist[cptPlaylist];
    }
    cptMusic = 0;
    MusicFromPlaylist = [{}];
    getMusicFromPlaylist();
}

//previous playlist
if (prevP)
prevP.addEventListener("click", goPrevP);
function goPrevP()
{
if (cptPlaylist == 0){
    cptPlaylist = namePlaylist.length -1;
    playlistName.innerHTML = namePlaylist[cptPlaylist];
}
    else {
        cptPlaylist--;
        playlistName.innerHTML = namePlaylist[cptPlaylist];
    }
    cptMusic = 0;
    MusicFromPlaylist = [{}];

//    $(".post").remove();
    getMusicFromPlaylist();
}

//prochaine musique
if (nextM)
    nextM.addEventListener("click", goNextM);
function goNextM()
{
  $('.sc-player').removeClass('playing')
  $('.sc-trackslist li.active').click();
  $nextItem = $('.sc-trackslist li.active').next('li')
  $nextItem.addClass('active').siblings('li').removeClass('active');  
  console.log("nexitm", $nextItem);
  if(!$nextItem.length){
    $nextItem = $('.sc-trackslist li.active').prev('li')
    $nextItem.addClass('active').siblings('li').removeClass('active');   
      while (cptMusic != 0){
        $nextItem = $('.sc-trackslist li.active').prev('li')
        $nextItem.addClass('active').siblings('li').removeClass('active');
        console.log("test !!!!!!!!!!!!!");
        cptMusic--;        
      }
  }
  else
    cptMusic++;
  $('.sc-trackslist li.active').click();
  $('.sc-player').addClass('playing');
    musicName.innerHTML = MusicFromPlaylist[cptMusic].music_name + " - " + MusicFromPlaylist[cptMusic].music_group;
}

//prochaine musique
if (prevM)
    prevM.addEventListener("click", goPrevM);
function goPrevM()
{
    console.log("PREVIUOIS");
  $('.sc-player').removeClass('playing')
  $('.sc-trackslist li.active').click();
  $nextItem = $('.sc-trackslist li.active').prev('li')
  $nextItem.addClass('active').siblings('li').removeClass('active');  
  if(!$nextItem.length){
    $nextItem = $('.sc-trackslist li.active').next('li')
    $nextItem.addClass('active').siblings('li').removeClass('active');   
      while (cptMusic != MusicFromPlaylist.length){
        $nextItem = $('.sc-trackslist li.active').next('li')
        $nextItem.addClass('active').siblings('li').removeClass('active');
        cptMusic++;        
        console.log("test !!!!!!!!!!!!!"+ cptMusic);
      }
      cptMusic--;
  }
  else
    cptMusic--;
  $('.sc-trackslist li.active').click();
  $('.sc-player').addClass('playing');
musicName.innerHTML = MusicFromPlaylist[cptMusic].music_name + " - " + MusicFromPlaylist[cptMusic].music_group;
}


if (close)
  close.addEventListener("click", closer);

function closer(){
    var musicAdded = 0;
    localStorage.setItem('musicAdded', musicAdded);
browser.tabs.executeScript(null, {file: "closer.js"});
}

if (logout)
  logout.addEventListener("click", Logout);

function Logout(){
    console.log("YOUHOUUUO");
    localStorage.removeItem("email");
    document.location.href="index.html";
}

var add = document.getElementById('buttonAdd');
if (add)
    add.addEventListener("click", getMusic);

function getMusic()
{
    getLink();
}
//check url pour pouvoir passer sur la page d'ajout de la musique
function getLink(fenetre, tab) {
    if (!fenetre) {
         browser.windows.getLastFocused(function(fenetre) { getLink(fenetre); });
     } else {
         if (!tab) {
             browser.tabs.getSelected(fenetre.id, function(tab) { getLink(fenetre, tab); });
         } else {
             var url = tab.url;
             if (url.indexOf("www.youtube.com/watch?v=") > 0 || url.indexOf("soundcloud.com/") > 0){
                var urlStringified = JSON.stringify(url);
                localStorage.setItem("musicToAdd", urlStringified);
                main.classList.remove('show');
                setTimeout(function(){
                 document.location.href = "takeMusic.html"
                }, 500);
            }
        }
    }
}

var musicAdded = localStorage.getItem('musicAdded');
musicAdded = JSON.parse(musicAdded);
var name = localStorage.getItem('nameProfil');
ProfilName.innerHTML = name;
console.log(musicAdded+"!!!!!");
if (musicAdded == 1){
    $(function(){
        var popup = document.getElementById("myPopup");
        popup.innerHTML = "Music Added"
        popup.classList.toggle("show");
        function show_popup(){
            $(".popup").slideUp();
        };
        window.setTimeout( show_popup, 2000 );
     });
     popup.classList.toggle("hidden");
     musicAdded = 0;
     localStorage.setItem('musicAdded', musicAdded);
}
else if (musicAdded == 2){
    $(function(){
    var popup = document.getElementById("myPopup");
        popup.innerHTML = "Wrong Music"
        popup.classList.toggle("show");
        function show_popup(){
            $(".popup").slideUp();
        };
        window.setTimeout( show_popup, 2000 );
     });
     popup.classList.toggle("hidden");
     musicAdded = 0;
     localStorage.setItem('musicAdded', musicAdded);
}

jQuery.get('https://localhost:8000/api/user/' + JSON.parse(localStorage.getItem("id")),
function (data){
    if (data){
        console.log("api/user", data);
        ProfilName.innerHTML = data.User.usr_login;
        localStorage.setItem("nameProfil", data.User.usr_login);
    }
}
);

/*
$(document).ready(function() {
    var marquee = $('div.marquee');
    console.log(marquee);
    marquee.each(function() {
        var mar = $(this),indent = mar.width();
        mar.marquee = function() {
            indent--;
            mar.css('text-indent',indent);
            if (indent < -1 * mar.children('div #musicName').width()) {
                indent = mar.width();
            }
        };
        mar.data('interval',setInterval(mar.marquee,1000/60));
    });
});*/