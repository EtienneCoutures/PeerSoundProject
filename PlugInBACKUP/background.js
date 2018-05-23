var browser = browser || chrome;
browser.browserAction.onClicked.addListener(function(tab) {

    browser.tabs.executeScript(null, {file: "content.js"});

});
