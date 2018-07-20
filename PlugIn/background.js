var browser = browser || chrome;
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