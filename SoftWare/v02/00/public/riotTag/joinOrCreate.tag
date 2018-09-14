<joinorcreate>

  <div id="backgound" onclick={close} class="backdrop-2ohBEd" style="z-index:4; opacity: 0.85; background-color: rgb(0, 0, 0); transform: translateZ(0px);"></div>

  <div id="joinOrCreate" ref="joinOrCreate" class="form deprecated create-or-join center" style="transform: translateX(0%) translateZ(0px);z-index:5;">
    <div class="form-inner">
      <header>Oh, une nouvelle playlist ?</header>
      <div class="actions">
        <div class="action create">
          <div class="action-body">Créez une nouvelle playlist et invitez vos amis !</div>
          <div class="action-icon"></div>
          <button class="btn btn-primary" onclick={createPlaylist} type="button">Créer une playlist</button>
        </div>
        <div>OU</div>
        <div class="action join">
          <div class="action-body">Entrez une invitation et rejoignez la playlist de votre ami.</div>
          <div class="action-icon"></div>
          <button class="btn btn-primary" onclick={joinPlaylist} type="button">Rejoindre une playlist</button>
        </div>
      </div>
    </div>
  </div>

  <div class="inner-1_1f7b" ref="createPlaylist" style="z-index:4; visibility:hidden; display:none;height:700px !important">
    <div class="create-guild-container deprecated">
      <form class="form deprecated create-guild" style="transform: translateX(0%) translateZ(0px);">
        <div class="form-inner">
          <h5>Créer votre playlist</h5>
          <p>En créant une playlist, vous aurez accès <strong>gratuitement</strong> aux salons musicaux à partager avec vos amis.</p>
          <ul class="guild-form">
            <li>
              <div class="control-group">
                <label for="guild-name">Nom de la playlist</label>
                <input type="text" id="guild-name" placeholder="Entrez le nom de la playlist" value="">
                <label for="guild-name">Style musical</label>
                <input type="text" id="style" placeholder="style" value="">
                <label for="guild-name">Description</label>
                <input type="text" id="description" placeholder="description" value="">
                </div>
                <div class="control-group">
                  <!--<label for="guild-region">Région du serveur</label>
                  <div class="regionSelect-1lpijo">
                    <div class="regionSelectInner-1cIYbU">
                      <div class="regionSelectFlag-221UrM" style="background-image: url(&quot;/assets/64f37efd5319b9b581557604864f042a.png&quot;);"></div>
                      <div class="regionSelectName-1XSzzb">Russia</div>
                    </div>
                    <button type="button">Modifier</button>
                  </div>-->
                  <div class="help-text">En créant une playlist, vous acceptez la <strong><a href="//discordapp.com/guidelines" target="_blank" rel="noreferrer">Charte d’Utilisation de la Communauté PSP</a></strong>.
                </div>
              </div>
            </li>
            <li>
              <div class="avatar-uploader">
                <div class="avatar-uploader-inner">
                  <div class="avatar-uploader-acronym"></div>
                  <div class="avatar-uploader-hint">Changer l'icône</div>
                  <input type="file" id="playlist_img" class="file-input" accept=".jpg,.jpeg,.png,.gif" style="position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; opacity: 0; cursor: pointer;"></div>
                  <small class="size-info">Taille minimum : <strong>128x128</strong></small>
                </div>
                <div class="form-actions">
                  <button onclick={retour} type="button" class="btn btn-default">Retour</button>
                  <button type="button" class="btn btn-primary" onclick={creation}>Créer</button>
                </div>
              </li>
            </ul>
          </div>
        </form>
      </div>
    </div>

    <div class="inner-1_1f7b" ref="joinPlaylist" style="display: none; visibility: hidden; z-index:4;">
      <div class="create-guild-container deprecated">
        <form class="form deprecated join-server" style="transform: translateX(0%) translateZ(0px);">
          <div class="form-inner">
            <h5>Rejoindre une playlist</h5>
            <div class="control-group">
              <div class="instructions">
                <p>Entrez une invitation ci-dessous pour rejoindre une playlist existante. L'invitation ressemble à celles-ci :</p>
                <p class="sample-link">https://peersoundproject.gg/qJq5C</p>
                <p class="sample-link">https://peersoundproject.gg/peersoundproject-developers</p>
                <p class="sample-link">qJq5C</p>
              </div>
            </div>
            <div class="link-container control-group">
              <input type="text" class="">
                <label for="invite">Entrez une invitation </label>
              </div>
            </div>
            <div >
              <button onclick={retour} type="button" class="btn btn-default">Retour</button>
              <button type="button" class="btn btn-primary">Rejoindre</button>
            </div>
          </form>
        </div>
      </div>

  <script>

  var self = this;

  this.on('mount', function(e) {
    console.log('mounting joinOrCreate');
  })

  $('#playlist_img').change(function(e) {

  })

  creation(e) {
    var playlist = {};

    playlist.playlist_creator = account.usr_id;
    playlist.playlist_style = $('#style').val();
    playlist.playlist_description = $('#description').val();
    playlist.playlist_name = $('#guild-name').val();
    playlist.playlist_img = $('#playlist_img').prop('files')[0]
                            ? $('#playlist_img').prop('files')[0].path
                            : "../images/psp.png";

    console.log('playlist :', playlist);
    options.method = 'POST';
    options.path = "/api/playlist";

    var data = JSON.stringify(playlist);

    requestManager.request(baseURL, options, data, function (rslt, req, err) {
      console.log('rslt: ', rslt);
      //self.close(rslt);
      self.unmount(true);

      myEmitter.emit('newPlaylist', rslt.rslt.Playlist);
    });
  }

  close(e) {
    this.unmount(true);
  }

  joinPlaylist(e) {
    this.refs.joinOrCreate.style.visibility = "hidden";
    this.refs.joinOrCreate.style.display = "none";
    this.refs.joinPlaylist.style.visibility = "visible";
    this.refs.joinPlaylist.style.display = "block";
  }

  createPlaylist(e) {
    this.refs.joinOrCreate.style.visibility = "hidden";
    this.refs.joinOrCreate.style.display = "none";
    this.refs.createPlaylist.style.visibility = "visible";
    this.refs.createPlaylist.style.display = "block";
  }

  retour(e) {
    this.refs.joinOrCreate.style.visibility = "visible";
    this.refs.joinOrCreate.style.display = "block";
    this.refs.createPlaylist.style.visibility = "hidden";
    this.refs.createPlaylist.style.display = "none";
    this.refs.joinPlaylist.style.visibility = "hidden";
    this.refs.joinPlaylist.style.display = "none";
  }


  </script>

  <style>

  :scope {
    display : flex;
    justify-content: center; /* align horizontal */
    align-items: center;
  }

  .center {
    display : flex;
    justify-content: center; /* align horizontal */
    align-items: center;
  }

  </style>

</joinorcreate>
