<message>

  <div id={ id }>

    { user } :
    <label>{ content }</label>
  </div>

  <script>

  this.user = opts.param.user;
  this.content = opts.param.content;
  this.id = opts.param.id;

  this.on('mount', function(e) {
    console.log('message mounted');
  })

  </script>

  <style>
  </style>

</message>
