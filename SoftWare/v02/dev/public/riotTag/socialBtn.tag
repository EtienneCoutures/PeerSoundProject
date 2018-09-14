<socialbtn>

<div class="row align"
  <div class="guild" onclick={ openSocial }>
    <div class="guild-inner" draggable="false" style="border-radius: 25px; background-color: rgb(47, 49, 54);margin-top:10px;margin-bottom:10px;">
      <div class="social-icon" style="overflow: hidden; right: 10px"></div>
    </div>
    <div class="badge">{ nbNotifications }</div>
  </div>
</div>

  <script>

  var self = this;
  this.nbNotifications = 0;
  this.invitations = [];
  this.elements = new Array();

  this.on('mount', function(e) {
    self.getMyInvitations();
  });

  getMyInvitations() {
    options.method = 'GET';
    options.path = "/api/invitation/?where=%7B%22invited_usr_id%22:"
                    + account.usr_id + "%7D";

    console.log('invitations options: ', options);
    requestManager.request(baseURL, options, null, function(rslt, rep, err) {
      console.log('MY INVITATIONS: ', rslt);
      if (rslt.code == 1) {
        self.nbNotifications = 0;
      } else {
        self.nbNotifications = rslt.rslt.length;
        self.invitations = rslt.rslt;
        for (var i = 0; i < self.invitations.length; ++i) {
          self.elements.push({element : "invitation", param : self.invitations[i]});

        }

      }
      self.update();
    })
  }

  myEmitter.on('invitationDeleted', function(invitation) {
    self.nbNotifications--;
    self.nbNotifications = self.nbNotifications < 0 ? 0 : self.nbNotifications;
    self.update();
  })

  openSocial(e) {
    console.log('openSOcial');
    var userOnClick = function (e, self) {

    }

    self.getMyInvitations();
    self.update();
    console.log('riot, ', riot);
    riot.mount('#events', {elements : self.elements, borders : ["", "", "", ""]})

    /*var friends = [{element : "usergroup", param : {name : "En ligne", nbUser : 6
    , users : [{element : "user", param : {name : "KETAMAX"
                , image : "../images/ketamax.jpg", status : "online"
                , admin : true, id : 2}}
              , {element : "user", param : {name : "ITIZ"
                , image : "../images/itiz.png", status : "afk", id : 3}}
              , {element : "user", param : {name : "TuturLaVoiture"
                , image : "../images/psp.png", status : "afk", id : 4}}
              , {element : "user", param : {name : "Angry_Capitalist"
                , image : "../images/psp.png", status : "online", id : 5}}
              , {element : "user", param : {name : "TuturLaVoiture"
                , image : "../images/psp.png", status : "afk", id : 6}}
              , {element : "user", param : {name : "Angry_Capitalist"
                , image : "../images/psp.png", status : "online", id : 7}}
              ]}}
            , {element : "usergroup", param : {name : "Hors ligne", nbUser : 9
    , users : [{element : "user", param : {name : "MrBiscotte"
                , image : "../images/hugo.png", status : "offline", id : 10}}
              , {element : "user", param : {name : "Khedira"
                , image : "../images/psp.png", status : "offline", id : 11}}
              , {element : "user", param : {name : "gabo34"
                , image : "../images/psp.png", status : "offline", id : 12}}
              , {element : "user", param : {name : "henryTeteDeBois"
                , image : "../images/psp.png", status : "offline", id : 13}}
              , {element : "user", param : {name : "MomoLaFrite"
                , image : "../images/psp.png", status : "offline", id : 14}}
              , {element : "user", param : {name : "Khedira"
                , image : "../images/psp.png", status : "offline", id : 15}}
              , {element : "user", param : {name : "gabo34"
                , image : "../images/psp.png", status : "offline", id : 16}}
              , {element : "user", param : {name : "henryTeteDeBois"
                , image : "../images/psp.png", status : "offline", id : 17}}
              , {element : "user", param : {name : "MomoLaFrite"
                , image : "../images/psp.png", status : "offline", id : 18}}
              ]}}];

    var friendGroup = {elements : users, name : "users"
      , borders : ["", "", "", ""], scrollBar : true, color: '#363636'};*/

      //riot.unmount('#users');
    //riot.mount('#users', friendGroup);
  }

  </script>

  <style>

    .badge {
      -webkit-box-shadow:0 1px 0 rgba(0,0,0,.25),inset 0 1px 0 hsla(0,0%,100%,.15);
      background-clip:padding-box;
      background-color:#f04747;
      border-radius:3px;box-shadow:0 1px 0 rgba(0,0,0,.25),inset 0 1px 0 hsla(0,0%,100%,.15);
      color:#fff;
      display:inline-block;
      font-size:12px;
      font-weight:500;
      line-height:12px;
      padding:3px 6px;
      text-shadow:0 1px 0 rgba(0,0,0,.25);
    }

    .social-icon {
      background-image:url('../images/social.svg');
      background-position:50%;
      background-repeat:no-repeat;
      height:80px;
      background-size:80px 60px;
      width:80px
    }

  </style>

</socialbtn>
