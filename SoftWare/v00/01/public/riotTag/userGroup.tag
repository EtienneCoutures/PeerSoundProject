<userGroup>

  <h2 class="old-h2">{ name }—{ nbUser }</h2>

  <div each={ users } data-is={ user } param={ param }></div>

  <script>

    this.name = opts.name;
    this.nbUser = opts.nbUser;
    this.users = opts.users;

  </script>

  <style>

  .old-h2 {
    margin:9px 0
  }

  </style>

</userGroup>
