var browser = browser || chrome;
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
    closeP = document.getElementById('clocloP');
browser.browserAction.onClicked.addListener(function(tab) {

    browser.tabs.executeScript(null, {file: "content.js"});

});

console.log("ackgtrounf");
    var script = document.createElement('script');
    script.type = "text/javascript";
    script.src = "./src/js/index.js";
    document.getElementsByTagName('head')[0].appendChild(script);
    if (window.jQuery) {
     // jQuery is loaded
     console.log("Yeah!");
 } else {
     // jQuery is not loaded
     console.log("Doesn't Work");
    }

    var title = title;
    var url = url;

    function getContent(sendResponse) {
        var mydata = { title: title, url: url };
        console.log(mydata);
        sendResponse(mydata);
    }

    function getLink(tab) {
      if (tab.url.indexOf("www.youtube.com/watch?v=") > 0 || tab.url.indexOf("soundcloud.com/") > 0) {
          title = tab.title;
          url = tab.url;
        }
    }

    chrome.runtime.onMessage.addListener(callback);
    function callback(obj, sender, sendResponse) {
        console.log(obj);
        if (obj) {
            if (obj.method == 'getContent') {
                browser.windows.getLastFocused(function(fenetre) {
                  browser.tabs.query({ active: true, windowId: fenetre.id} , function(array) {
                    getLink(array[0]);
                  });
                });
                setTimeout(function(){
                    getContent(sendResponse);
                }, 1000);
                console.log("?");
            } else if (obj.method == 'closePlugin') {
                console.log("close");
                closer();
                closePlugin(sendResponse);
            } else if (obj.method == 'outout') {
                console.log("outout");
                closer();
                outout(sendResponse);
            } else if (obj.method == 'sendMusic') {
                postMusic(obj.data);
                sendMusic(sendResponse);
            }
        }
        return true; // remove this line to make the call sync!
    }

    //some async method

    function closePlugin(sendResponse) {
      console.log("close");
      browser.tabs.executeScript(null, {file: "closer.js"});
      /*chrome.storage.local.get(["mydata"], function (obj) {
        var mydata = $.trim(obj["mydata"]);
        sendResponse(mydata);
      });*/
    }
    function outout(sendResponse) {
        console.log("outout");
        browser.tabs.executeScript(null, {file: "closer.js"});
        /*chrome.storage.local.get(["mydata"], function (obj) {
          var mydata = $.trim(obj["mydata"]);
          sendResponse(mydata);
        });*/
      }
    //some async method 
    function sendMusic(sendResponse) {
      chrome.storage.local.get(["mydata"], function (obj) {
        var mydata = $.trim(obj["mydata"]);
        sendResponse(mydata);
      });
    }

    var close = document.getElementById("cloclo");
      if (close)
        close.addEventListener("click", closer)

    function closer(){
      sessionStorage.removeItem('infos');
      browser.tabs.executeScript(null, {file: "src/js/closer.js"});
    }

    function closer(){
        var musicAdded = 0;
        localStorage.setItem('musicAdded', musicAdded);
        browser.tabs.executeScript(null, {file: "closer.js"});
    }
