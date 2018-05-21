sessionStorage.removeItem('infos');

var docActive = document.activeElement;
document.activeElement.blur();

var iframe = document.getElementById('PSPFrame');
iframe.classList.remove('showPSP');
setTimeout(function(){
iframe.parentElement.removeChild(iframe);
}, 1000);

docActive = document.activeElement;