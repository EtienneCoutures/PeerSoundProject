<usergroup>

  <h2 class="old-h2">{ name }—{ nbUser }</h2>

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
  margin-top: 60px;
}

  .old-h2 {
    margin:9px 0
  }

  </style>

</usergroup>
