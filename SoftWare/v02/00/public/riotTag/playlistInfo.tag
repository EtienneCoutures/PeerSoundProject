<playlistinfo>

  <div style="text-align: center"><h2>{playlist_name}</h2><h2></h2></div>

  <separator param={separatorWidth}></separator>

  <div id="{ name }_panel" class="panel">
    <div each={ elements } data-is={ element } param={ param }></div>
  </div>

  <script>

    var self = this;
    this.separatorWidth = {width: '90%'};
    this.playlist_name = opts.playlist_name;
    this.elements = new Array();

    console.log('PLAYLIST INFO OPTS: ', opts);

    this.on('mount', function() {
      this.elements.push({element : "info"
      , param : {name : "Style", value : opts.playlist_style}});

      this.elements.push({element : "info"
      , param : {name : "Description", value : opts.playlist_description}});

      /*this.elements.push({element : "info"
      , param : {name : "Commentaire", value : opts.playlist_comment}});*/

      self.update();
    })

    myEmitter.on('showInvitationPanel',function() {
      self.unmount(true);
    });

  </script>

</playlistinfo>
