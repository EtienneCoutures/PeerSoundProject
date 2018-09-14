<app>

  <login ref="login"></login>
  <!--<index ref="index"></index>-->

  <script>

  this.isConnected = opts.param.isConnected;
  console.log('isConnected : ', this.isConnected);
  console.log('jquery : ', $);
  console.log('this : ', this);

  this.on('before-mount', function(e) {
    if (this.isConnected) {
      $('#application').html("<index></index>");
      console.log('mounting index');
      $('body').removeClass('login');
      //riot.mount("index");
    } else {
      $('#application').html("<login></login>");
      console.log('mounting login');
      //riot.mount("login");
    }
  })


  </script>

</app>
