var artist = document.getElementById("boxArtist"),
    boxUrl = document.getElementById("boxUrl"),
    date = document.getElementById("boxDate"),
    description = document.getElementById("boxDescription"),
    Playlists = document.getElementById("boxPlaylist"),
    descriptionP = document.getElementById("boxDescriptionP"),
    nameP = document.getElementById("boxName"),
    kind = document.getElementById("boxKind"),
    create = document.getElementById("create"),
    popError = document.getElementById("errorPop"),
    createPlaylist = document.getElementById("createPlaylist"),
    closeError = document.getElementById('close_a'),
    closeErrorP = document.getElementById('close_p'),
    addP = document.getElementById('addP'),
    btnClose = document.getElementById('close_b'),
    textarea1 = document.getElementById('textarea1'),
    textarea2 = document.getElementById('textarea2'),
    textarea3 = document.getElementById('textarea3'),
    textarea4 = document.getElementById('textarea4'),
    textarea5 = document.getElementById('textarea5'),
    textarea6 = document.getElementById('textarea6'),
    main = document.getElementById('main'),
    close = document.getElementById('cloclo'),
    closeP = document.getElementById('clocloP'),
    logout = document.getElementById('logout');
var browser = browser || chrome;
var idMusic = 0;
var url = "";
console.log(browser);

if (Playlists)
Playlists.addEventListener("click", checkPlaylist);

function checkPlaylist(){
 //       console.log(Playlists.options[Playlists.selectedIndex].label);
        if(Playlists.options[Playlists.selectedIndex].label == "Create Playlist"){
            $("#boxPlaylist option[label='Create Playlist']").remove();
            //textarea1.className = 'blur';
            textarea2.className = 'blur';
            textarea3.className = 'blur';
            createPlaylist.className = 'show';
        }
}

console.log(boxUrl);

function getMusic() {
  console.log("test");
  function getContent() {
      callEventPageMethod('getContent', 'some parameter', function (response) {
          console.log(response);
          boxUrl.value = response.title;
          url = response.url;
          doSomethingWith(response);
      });

  }
  //generic method
  function callEventPageMethod(method, data, callback) {
      chrome.runtime.sendMessage({ method: method, data: data }, function (response) {
          if(typeof callback === "function") callback(response);
      });
  }
  getContent();
  //getLink();
}
getMusic();

setTimeout(function(){
    main.classList.add('show');
}, 500);

var valid = document.getElementById("validButton");
if (valid)
    valid.addEventListener("click", sendMusic);

var close = document.getElementById("cloclo");
if (close) {
  close.addEventListener("click", closer)
  console.log(close);
}


function closer(){
  sessionStorage.removeItem('infos');
  function closePlugin() {
      callEventPageMethod('closePlugin', 'some parameter', function (response) {
          doSomethingWith(response);
      });

  }
  //generic method
  function callEventPageMethod(method, data, callback) {
      console.log(method);
      chrome.runtime.sendMessage({ method: method, data: data }, function (response) {
          if(typeof callback === "function") callback(response);
      });
  //browser.tabs.executeScript(null, {file: "closer.js"});
  }
  console.log("close");
  closePlugin();
}

var logut = document.getElementById("lolo");
if (logut){
    logut.addEventListener("click", logOut);
    console.log("MES COUILLES COUILLES COUILLES");
}
function logOut () {
    console.log("CHATTE");
    sessionStorage.removeItem('infos');
    localStorage.removeItem("email");
    function outout() {
        console.log("cul cul cul");
        callEventPageMethod('outout', 'some parameter', function (response) {
            doSomethingWith(response);
        });
    }
     //generic method
  function callEventPageMethod(method, data, callback) {
    console.log(method);
    chrome.runtime.sendMessage({ method: method, data: data }, function (response) {
        if(typeof callback === "function") callback(response);
    });
//browser.tabs.executeScript(null, {file: "closer.js"});
    }
console.log("close");
outout();  
}
 /* récupération des playlists du compte */
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

if(btnClose){
    btnClose.addEventListener("click", hidePop);
}

if(closeErrorP)
    closeErrorP.addEventListener("click", hidePlaylist);

if (addP)
    addP.addEventListener("click", createNewPlaylist);

//using the function:
removeOptions(document.getElementById("mySelectObject"));
function createNewPlaylist(){
    console.log("PLAYLIST :", nameP.value, kind.value, descriptionP.value, JSON.parse(localStorage.getItem("id")));
    if (nameP.value && kind.value){
        removeOptions(Playlists);
        // playlist_description: descriptionP.value
    jQuery.post('https://localhost:8000/api/playlist/',{
        playlist_creator: JSON.parse(localStorage.getItem("id")),
        playlist_name: nameP.value,
        playlist_style: kind.value,
        playlist_description: descriptionP.value
        },
        function (data){
            if (data){
               console.log("DATA !!! ", data);
        }
        });
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
                }
        }
    }
}
);
    setTimeout(function(){
        hidePlaylist();
    }, 1000)
}
}


function removeOptions(selectbox)
{
    var i;
    for(i = selectbox.options.length - 1 ; i >= 0 ; i--)
    {
        selectbox.remove(i);
    }
}

function sleep(miliseconds) {
    var currentTime = new Date().getTime();
    while (currentTime + miliseconds >= new Date().getTime()) {}
}

function sendMusic() {
    var title = document.getElementById("boxUrl");
    if (title.value && artist.value && date.value && description.value && Playlists.options[Playlists.selectedIndex].label != "Create Playlist") {
      if (url.indexOf("soundcloud") != -1)
           var source = "soundcloud";
      else
           var source = "youtube";
      var infs = {
          title  : title.value,
          artist : artist.value,
          date : date.value,
          source : source,
          url: url,
          description: description.value
      }
      //textarea1.className = '';
      textarea2.className = '';
      popError.className = '';
      sessionStorage.setItem("infos", JSON.stringify(infs));
      var musicAdded = 1;
      localStorage.setItem('musicAdded', musicAdded);
      console.log( JSON.parse(localStorage.getItem("id")) + '-' + artist.value + '-' + boxUrl.value + '-' + description.value + '-' + url + '-' + source);
      jQuery.post('https://localhost:8000/api/music/', {
          usr_id: JSON.parse(localStorage.getItem("id")),
          music_source: source,
          music_group: artist.value,
          music_name: boxUrl.value,
          music_description: description.value,
          music_url: url,
          music_date: date.value
      },
      function (data) {
         if (data) {
           console.log(data);
            idMusic = data.Music.music_id;
            jQuery.post('https://localhost:8000/api/musiclink/', {
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
                     closer();
                }, 1000);
         }
       }
      );
    }
    else {
        //textarea1.className = 'blur';
        textarea2.className = 'blur';
        textarea3.className = 'blur';
        popError.className = 'show';
    }
}

function hidePop() {

    setTimeout(function(){
       popError.className = '';
    },200);
    //textarea1.className = 'stop';
    textarea2.className = 'stop';
    textarea3.className = 'stop';
}

function hidePlaylist() {
    var opt = document.createElement('option');
    opt.label ="Create Playlist";
    Playlists.appendChild(opt);
    setTimeout(function(){
        createPlaylist.className = '';
    },200);
    //textarea1.className = 'stop';
    textarea2.className = 'stop';
    textarea3.className = 'stop';
}

function focusInput() {
    //textarea1.className = 'onfocus';
    textarea2.className = 'onfocus';
    textarea3.className = 'onfocus';
}
