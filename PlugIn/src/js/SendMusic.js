var popError = document.getElementById("errorPop"),
    closeError = document.getElementById('close_a'),
    main = document.getElementById('main');

    var browser = browser || chrome;
setTimeout(function(){
    main.classList.add('show');
}, 500);

var add = document.getElementById("buttonAdd");
if (add)
    add.addEventListener("click", AddColleague);

var valid = document.getElementById("sendButton");
if (valid)
    valid.addEventListener("click", ChangePage);

var goBack = document.getElementById("backLink");
if (goBack)
    goBack.addEventListener("click", historyPage);

if(closeError)
    closeError.addEventListener("click", hidePop);

var tab = [];
var tabchecked = [];

if (JSON.parse(localStorage.getItem("contacts"))){
    var tabContacts = JSON.parse(localStorage.getItem("contacts"));
    ShowContactsStorage();
}
else
    var tabContacts = [];

var close = document.getElementById("cloclo");
  if (close)
    close.addEventListener("click", closer)

function closer(){
    sessionStorage.removeItem('infos');
  browser.tabs.executeScript(null, {file: "closer.js"});
}


function AddColleague() {
    var emailContact = document.getElementById("inputEmailC"),
        champAjout = document.getElementById('ChampsAjout');
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if(emailContact.value != '') {
        if ( emailReg.test( emailContact.value ) === true ) {
            champAjout.className = '';
            tabContacts.push(emailContact.value);
        } else {
            champAjout.className = 'error';
        }
    } else {
        champAjout.className = 'error';
    }
    tabchecked = [];
    for (var i = 0; i < tabContacts.length -1; i++){
    var c = document.getElementById("remove" + tabContacts[i]);
    if (c.checked)
     tabchecked.push(1);
     else
        tabchecked.push(0);
}
    localStorage.setItem("tabchecked", JSON.stringify(tabchecked));
    ShowContacts();
    emailContact.value = "";
    localStorage.setItem("contacts", JSON.stringify(tabContacts));
    addCheck();
}

function addCheck() {
    var test =  JSON.parse(localStorage.getItem("tabchecked"));
    for (var z = 0; z < tabContacts.length; z++){
        if (test[z] == 1)
        {
            document.getElementById('remove' + tabContacts[z]).checked = true;
        }
        if (z == tabContacts.length -1)
            document.getElementById('remove' + tabContacts[z]).checked = true;
    }
   // test = [];
    //localStorage.setItem("tabchecked", JSON.stringify(test));
}
document.getElementById('inputEmailC').onkeypress = function(e){
    if (!e) e = window.event;
    var keyCode = e.keyCode || e.which;
    if (keyCode == '13'){
        AddColleague();
      return false;
    }
}


function ShowContacts() {
    document.getElementById("showC").innerHTML = "";
    for (var i = 0; i < tabContacts.length; i++){
        var lastEmail = tabContacts[i];
        document.getElementById("showC").innerHTML += '<div class="checkbox"><input type="checkbox" id="remove' + tabContacts[i] + '" name="remove' + tabContacts[i] + '" /><label for="remove' + tabContacts[i] + '"><span class="contactName">' + tabContacts[i] +'</span></label><a href="#" class="deleteThisOne" title="delete this contact?"></a></div>';

        document.getElementById('remove' + lastEmail).checked = true;
    }
}

function ShowContactsStorage() {
    document.getElementById("showC").innerHTML = "";
    for (var i =0; i < tabContacts.length; i++){
        //var firstC = tabContacts[i].charAt(0);
        document.getElementById("showC").innerHTML += '<div class="checkbox"><input type="checkbox" id="remove' + tabContacts[i] + '" name="remove' + tabContacts[i] + '" /><label for="remove' + tabContacts[i] + '"><span class="contactName">' + tabContacts[i] +'</span></label><a href="#" class="deleteThisOne" title="delete this contact?"></a></div>';
    }
    var test =  JSON.parse(localStorage.getItem("tabchecked"));
    for (var z = 0; z < tabContacts.length; z++){
        if (test[z] == 1)
        {
            document.getElementById('remove' + tabContacts[z]).checked = true;
        }
        if (z == tabContacts.length -1)
            document.getElementById('remove' + tabContacts[z]).checked = true;
    }
  /*  test = [];
    localStorage.setItem("tabchecked", JSON.stringify(test));*/
    
}
ShowContactsStorage();

function ChangePage() {
    tab = [];
for (var i = 0; i < tabContacts.length; i++){
    var c = document.getElementById("remove" + tabContacts[i]);
    if (c.checked)
        tab.push(tabContacts[i]);
}

var infos = sessionStorage.getItem("infos");
infos = JSON.parse(infos);
    if(tab.length != 0) {
      jQuery.post('http://127.0.0.1:8080/domain/', {
            sender: localStorage.getItem("email"),
            title: infos.title,
            contacts: JSON.stringify(tab),
            artist: infos.artist,
            date : infos.date
        }, function(rslt, err) {
        });
        popError.className = '';
        main.classList.remove('show');
	setTimeout(function(){
        document.location.href = "profil.html";
	}, 500);
    } else {
        popError.className = 'show';
         setTimeout(function(){
           popError.className = '';
        },2000);

    }
}

function historyPage() {
    tabchecked = [];
    for (var i = 0; i < tabContacts.length -1; i++){
    var c = document.getElementById("remove" + tabContacts[i]);
    if (c.checked)
     tabchecked.push(1);
     else
        tabchecked.push(0);
    }
    localStorage.setItem("tabchecked", JSON.stringify(tabchecked));
    main.classList.remove('show');
    setTimeout(function(){
        document.location.href = "takeMusic.html";
    }, 500);
}

function hidePop() {
    popError.className = '';
}
/*
jQuery.noConflict();
jQuery(function($) {

    $(document).ready(function() {

        $('#showC').niceScroll({
            cursorcolor: 'rgba(255,255,255,.1)',
            cursorwidth: '5px',
            cursorborder: '1px solid rgba(255,255,255,.1)'
        });
        $('#showC').delegate('.deleteThisOne', 'click', function(e) {
            var contactName = $(this).parents('.checkbox').find('.contactName').text();
            $(this).parents('.checkbox').animate({
                left: '-100%'
            }, 300, function() {
                $(this).find('input').prop( "checked", false );
                $(this).remove();
                var indexContact = tabContacts.indexOf(contactName);
                tabContacts.splice(indexContact, 1);
                localStorage.setItem('contacts', JSON.stringify(tabContacts));
                contactName = '';
            });
            e.preventDefault();
        });
    });
});*/
