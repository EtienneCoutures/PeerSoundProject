<invitepeople>

  <div id="backgound" onclick={close} class="backdrop-2ohBEd" style="z-index:4; opacity: 0.85; background-color: rgb(0, 0, 0); transform: translateZ(0px);"></div>

  <form class="form-deprecated instantInviteModal-5L33Qh" style="opacity: 1;z-index: 5;">
    <div class="form-header">
      <header>Inviter des gens sur la playlist {namePlaylist}</header>
      <div class="blurb-ArHxCz">Email de la personne à inviter : </div>
    </div>
    <div class="form-inner">
      <div class="clipboardInputInner-dxVheg clipboardInput-b0B55c">
        <div class="clipboardInputInner-oj8y-S">
          <input id="email" placeholder="Email">

          </div>
        </div>
        <div class="expireText-NeAc7v">Les invitations doivent être acceptées.</div>
        <span id="error" style="color:red"></span>
      </div>
      <div class="form-actions">
          <div class="checkbox">
            <div class="checkbox-inner">
              <input type="checkbox">
                <span></span>
              </div>
              <span>Admin</span>
            </div>
            <button type="button" onclick={invite} class="copy-2GnRyy copy-2xFKb_">Inviter</button>
          <!--<button class="advanced-PZvMk0">Inviter !</button>-->
        </div>
      </form>

<script>

var self = this;
this.playlistName = opts.playlistName;
this.playlistID = opts.playlistID;

close(e) {
  this.unmount(true);
}

this.on('mount', function(e) {
  console.log('mounting invitePeople');
})

sendInvitation(rslt) {
  console.log('getting ID ok');
  var invitation = {};

  invitation.invited_usr_id = rslt.User.usr_id;
  invitation.inviter_usr_id = account.usr_id;
  invitation.playlist_id = self.playlistID;
  invitation.invited_role = "member";

  var data = JSON.stringify(invitation);

  console.log('invitation: ', invitation);
  options.method = 'POST';
  options.path = '/api/invitation/';

  console.log('options invitation: ', options);
  requestManager.request(baseURL, options, data, function (rslt, req, err) {
    if (rslt.rslt.code == 0) {
      console.log('invitation successfuly sent !');
      self.unmount(true);
    } else {
      console.log('there was a problem sending invitation :/');
      $('#error').html("Erreur : veuillez vérifiez l'email");
    }
  })
}

invite(e) {
  console.log('account : ', account);

  /* On récupère l'id de la personne invitée avant de pouvoir l'inviter .....*/

  options.method = 'GET';
  options.path = '/api/user/' + $('#email').val();

  console.log('option email :', options);
  requestManager.request(baseURL, options, null, function (rslt, req, err) {
    console.log('rslt.rslt: ', rslt.rslt);
    if (rslt.rslt.code == 0) {
      self.sendInvitation(rslt.rslt);
    } else {
      console.log('failed to get ID from mail');
      $('#error').html("Erreur : veuillez vérifiez l'email");
    }
  })
}

</script>

</invitepeople>
