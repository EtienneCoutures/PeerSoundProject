<playlistPanel>

  <div id="playlists_panel" class="panel">
    <div each={ elements } data-is={ element } param={ param }></div>
  </div>

<script>

  var self = this;

  this.name = opts.name;
  this.elements = opts.elements;
  this.color = opts.color || "#484a4c";
  this.borders = opts.borders;
  this.alignItems = opts.alignItems;
  this.flexDirection = opts.flexDirection;
  this.scrollBar = (opts.scrollBar || false);

  this.root.riot = false;

  this.on('mount', function() {

    this.root.style.backgroundColor = this.color;

    if (this.borders) {
      this.root.style.borderLeft = this.borders[0] || " ";
      this.root.style.borderTop = this.borders[1] || " ";
      this.root.style.borderRight = this.borders[2] || " ";
      this.root.style.borderBottom = this.borders[3] || " ";
    }
    else {
      this.root.style.border = "2px solid black";
    }

    this.root.style.alignItems = this.alignItems || "center";
    this.root.style.flexDirection = this.flexDirection || "column";

    //console.log('this.refs:', this.refs);

    if (this.scrollBar) {
      $('#' + this.name + '_panel').mCustomScrollbar({
        theme : "minimal"
      });
    }
  })

  myEmitter.on('newPlaylist', function(pl) {
    console.log('NEW PLAYLIST: ', pl);

    var nPl = {element : "playlist"
      , param : {playlist : pl/*name : pl.playlist_name
                , id : pl.playlist_id
                , style : pl.playlist_style
                , image : pl.playlist_img || "../images/psp.png"*/}};

                //self.elements.push(nPl);
                console.log('self.elements.length: ', self.elements.length);
    self.elements.splice(self.elements.length - 1, 0, nPl);

    self.update();
  })

  myEmitter.on('invitationAccepted', function(pl_id) {
    index.requestPlaylistFromID(pl_id, function(pl) {
      console.log('pl: ', pl);
      var nPl = {element : "playlist"
        , param : {playlist : pl.Playlist}};

      self.elements.splice(self.elements.length - 1, 0, nPl);
      self.update();
    })
  })

</script>

<style scoped>
  :scope {
     height: 100%;
     width: 100%;
     display: flex;
  }

  .panel {
    overflow: hidden;
    height: 100%;
    width: 100%;
    overflow: visible;
  }
</style>

</playlistPanel>
