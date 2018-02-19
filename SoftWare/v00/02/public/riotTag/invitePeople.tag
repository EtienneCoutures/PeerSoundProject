<invitepeople>

  <div id="backgound" onclick={close} class="backdrop-2ohBEd" style="z-index:4; opacity: 0.85; background-color: rgb(0, 0, 0); transform: translateZ(0px);"></div>

  <form class="form-deprecated instantInviteModal-5L33Qh" style="opacity: 1;z-index: 5;">
    <div class="form-header">
      <header>Inviter des gens sur la playlist {namePlaylist}</header>
      <div class="blurb-ArHxCz">Partagez ce lien avec d'autres personnes pour leur accorder l'accès à cette playlist</div>
    </div>
    <div class="form-inner">
      <div class="clipboardInputInner-dxVheg clipboardInput-b0B55c">
        <div class="clipboardInputInner-oj8y-S">
          <input value="https://peersoundproject.gg/QZrRqE" readonly="">
            <button type="button" class="copy-2GnRyy copy-2xFKb_">Copier</button>
          </div>
        </div>
        <div class="expireText-NeAc7v">Les liens d'invitation expirent par défaut au bout d'un jour</div>
      </div>
      <div class="form-actions">
        <div class="checkbox">
          <div class="checkbox-inner">
            <input type="checkbox" value="on">
              <span></span>
            </div>
            <span>Faire en sorte que ce lien n'expire jamais</span>
          </div>
          <button class="advanced-PZvMk0"></button>
        </div>
      </form>

<script>

close(e) {
  this.unmount(true);
}

this.on('mount', function(e) {
  console.log('mounting invitePeople');
})

</script>

</invitepeople>
