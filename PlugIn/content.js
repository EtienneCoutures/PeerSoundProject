var isFirefox = typeof InstallTrigger !== 'undefined';
var isChrome = !!window.chrome && !!window.chrome.webstore;
var iframe = document.getElementById('PSPFrame');
var extensionOrigin = "";
var browser = browser || chrome;
if (!iframe){
    if (isChrome == true)
         extensionOrigin = 'chrome-extension://' + browser.runtime.id;
    else if (isFirefox == true){
        extensionOrigin = 'moz-extension://' + browser.runtime.id;

    }
    //if (!location.ancestorOrigins.contains(extensionOrigin)) {
    var iframe = document.createElement('iframe');
    iframe.src = browser.runtime.getURL('index.html');
    iframe.id = "PSPFrame";
    setTimeout(function(){
    	iframe.className += 'showPSP';
  	}, 500);
    document.body.appendChild(iframe);
}
//}