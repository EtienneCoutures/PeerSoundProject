<usergroup>

  <div style="display: {length ? block : none}; visibility: {length ? visible : hidden};">
    <h3 class="old-h2"><label style="color : #898989;">{ name }—{ nbUser }</label></h3>

    <div each={ users } data-is={ element } param={ param }></div>
  </div>

  <script>


    var self = this;
    this.name = opts.param.name;
    this.nbUser = opts.param.nbUser;
    this.users = opts.param.users;
    this.length = this.users.length;

    this.on('before-mount', function(e) {
      console.log('userGroup opts: ', opts);
      console.log('MOUNTING USERS: ', this.users);
      /*if (this.users.length == 0) {
        console.log('Unmounting usergroup ', this.name);
        self.unmount(true);
      }*/
    });

  </script>

  <style>

:scope {
  margin-top: 40px;
  margin-left: 40px;
  margin-bottom: 20px;
}

  .old-h2 {
    margin:9px 0
  }

  </style>

</usergroup>
