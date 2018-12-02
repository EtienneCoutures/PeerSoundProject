var t = document.getElementById("buttonConnexion");
var main = document.getElementById('main');
var firstCo = document.getElementById('button1Connexion');

    if (firstCo)
      firstCo.addEventListener("click", function(){
        top.location = "https://www.peersoundproject.com/signup";
      });

    main.classList.add('show');
if (t)
    t.addEventListener("click", changePage);

if (localStorage.getItem("email")){
   document.location.href = "takeMusic.html";
}

var close = document.getElementById("cloclo");
  if (close)
    close.addEventListener("click", closer);

function closer(){
    sessionStorage.removeItem('infos');
    function closePlugin() {
        callEventPageMethod('closePlugin', 'some parameter', function (response) {
        });
    }
    //generic method
    function callEventPageMethod(method, data, callback) {
        chrome.runtime.sendMessage({ method: method, data: data }, function (response) {
            if(typeof callback === "function") callback(response);
        });
    //browser.tabs.executeScript(null, {file: "closer.js"});
    }
    closePlugin();
}

function changePage() {
 if (localStorage.getItem("email")){
    main.classList.remove('show');
    setTimeout(function(){
      document.location.href = "takeMusic.html";
    }, 500);
 }
 else {
    var email = document.getElementById("inputEmail"),
    		pass = document.getElementById("inputPassword");
    if ( (email.value) && (pass.value) ) {
      email.className = '';
        pass.className = '';
           var script = document.createElement('script');
           script.type = "text/javascript";
           script.src = "https://code.jquery.com/jquery-3.3.1.min.js";
           document.getElementsByTagName('head')[0].appendChild(script);
           if (window.jQuery) {
            // jQuery is loaded
        } else {
            // jQuery is not loaded
        }
      //  setTimeout(function(){
            jQuery.post('https://www.peersoundproject.com/api/auth/login',
            {
              login: email.value,
              password: pass.value
            },
             function (data) {
              console.log(data);
              console.log("requete KO");
               if (data.error != - 1  && data.code != -1) {
                  localStorage.setItem("email", email.value);
                  localStorage.setItem("id", data.account.usr_id);
                  localStorage.setItem("name", data.account.usr_firstame);
                  main.classList.remove('show');
                  setTimeout(function(){
                  document.location.href = "./takeMusic.html";
                  }, 500);
                }
              });
      //    }, 500);
    } else if ( !(email.value) && (pass.value) ) {
    	email.className = 'error';
    	pass.className = '';
    } else if ( (email.value) && !(pass.value) ) {
    	email.className = '';
    	pass.className = 'error';
    } else if ( !(email.value) && !(pass.value) ) {
    	email.className = 'error';
    	pass.className = 'error';
    }
  }
}
/*
var musicAdded = 0;
localStorage.setItem('musicAdded', musicAdded);
localStorage.setItem('numMusic', 1)
*/
