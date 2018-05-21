var artist = document.getElementById("boxArtist"),
    date = document.getElementById("boxDate"),
    description = document.getElementById("boxDescription"),
    Playlists = document.getElementById("boxPlaylist"),
    popError = document.getElementById("errorPop"),
    closeError = document.getElementById('close_a'),
    btnClose = document.getElementById('close_b'),
    textarea1 = document.getElementById('textarea1'),
    textarea2 = document.getElementById('textarea2'),
    textarea3 = document.getElementById('textarea3'),
    main = document.getElementById('main');

var browser = browser || chrome;
var idMusic = 0;
setTimeout(function(){
    main.classList.add('show');
}, 500);

var valid = document.getElementById("validButton");
if (valid)
    valid.addEventListener("click", sendMusic);

var close = document.getElementById("cloclo");
  if (close)
    close.addEventListener("click", closer)

function closer(){
  sessionStorage.removeItem('infos');
  browser.tabs.executeScript(null, {file: "closer.js"});
}

jQuery.get('https://localhost:8000/api/playlist/',
function (data){
    if (data){
        console.log(data);
        for (var i = 0; i < data.length; i++){
            if (data[i].playlist_creator == JSON.parse(localStorage.getItem("id")))
                {
                    var opt = document.createElement('option');
                    opt.value = data[i].playlist_id;
                    opt.innerHTML = data[i].playlist_name;
                    Playlists.appendChild(opt);
                    console.log(data[i].playlist_id + " - " + data[i].playlist_name);
                }
        }
    }
}
);

if (artist){
    if (artist.value){
        artist.className = 'onfocus';
    }
    artist.onkeydown = function(){
        artist.className = 'onfocus';
    };
}

if (date){
    if(date.value){
        date.className = 'onfocus';
    }
    date.onkeydown = function(){
        date.className = 'onfocus';
    };
}

if(closeError)
    closeError.addEventListener("click", hidePop);

if(btnClose)
    btnClose.addEventListener("click", hidePop);

var url = JSON.parse(localStorage.getItem("musicToAdd"));
var boxUrl = document.getElementById("boxUrl");
    $.getJSON('https://noembed.com/embed', //avoir le titre de la musique
    {   format: 'json', url: url}, function (data) {
        boxUrl.value = data.title;
    });
   

function sleep(miliseconds) {
    var currentTime = new Date().getTime();
    while (currentTime + miliseconds >= new Date().getTime()) {}
}

function sendMusic() {
    var title = document.getElementById("boxUrl");
    if (title.value && artist.value && date.value && description.value) {
        var infs = {
            title  : title.value,
            artist : artist.value,
            date : date.value
        }
        textarea1.className = '';
        textarea2.className = '';
        popError.className = '';
        sessionStorage.setItem("infos", JSON.stringify(infs));
       var musicAdded = 1;
       localStorage.setItem('musicAdded', musicAdded);
       console.log("agagagagaggagag", JSON.parse(localStorage.getItem("id")) + '-' + artist.value + '-' + boxUrl.value + '-' + description.value + '-' + url);
       jQuery.post('https://localhost:8000/api/music/',{
            usr_id: JSON.parse(localStorage.getItem("id")),
            music_source: "soundcloud",
            music_group: artist.value,
            music_name: boxUrl.value,
            music_description: description.value,
            music_url: url,
            music_date: date.value
       },
       function (data){
           if (data){
               console.log(data);
                idMusic = data.Music.music_id;
                jQuery.post('https://localhost:8000/api/musiclink/',{
                    usr_id: JSON.parse(localStorage.getItem("id")),
                    music_id: idMusic,
                    playlist_id: Playlists.options[Playlists.selectedIndex].value
                    },
                    function (data){
                        if (data){
                           console.log(data);
                    }
                    });
                    setTimeout(function(){
                       // document.location.href = "profil.html"
                    }, 500);
           }
       }
       );
    }
    else {
        textarea1.className = 'blur';
        textarea2.className = 'blur';
        textarea3.className = 'blur';
        popError.className = 'show';
    }
}

function hidePop() {
    setTimeout(function(){
       popError.className = '';
    },200);
    textarea1.className = 'stop';
    textarea2.className = 'stop';
    textarea3.className = 'stop';
    
}

function focusInput() {
    textarea1.className = 'onfocus';
    textarea2.className = 'onfocus';
    textarea3.className = 'onfocus';
}