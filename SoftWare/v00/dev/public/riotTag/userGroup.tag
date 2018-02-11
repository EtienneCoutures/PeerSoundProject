<usergroup>

  <h3 class="old-h2"><label style="color : #898989;">{ name }—{ nbUser }</label></h3>

  <div each={ users } data-is={ element } param={ param }></div>

  <script>

  console.log('userGroup opts: ', opts);

    this.name = opts.param.name;
    this.nbUser = opts.param.nbUser;
    this.users = opts.param.users;

    this.on('mount', function(e) {
      console.log('this.users: ', this.users);
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
