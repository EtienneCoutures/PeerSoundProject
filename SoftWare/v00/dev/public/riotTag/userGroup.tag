<userGroup>

  <label>
    { name }
  </label>

  <div each={ users } data-is={ user } param={ param }></div>

  <script>

    this.name = opts.name;
    this.users = opts.users;

  </script>

</userGroup>
