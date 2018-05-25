<invitation>

<div>Vous avez été invité à rejoindre la playlist
  <span style="font-weight: bold">{playlist_name}</span>
   par <span style="font-weight: bold">{usr_login}</span>
   comme <span style="font-weight: bold">{ invited_role }</span> !
   <br>
<button onclick={accept} type="button" class="btn btn-success">
  <span class="glyphicon glyphicon-ok" aria-hidden="true">Accepter</span>
</button>
<button onclick={refuse} type="button" class="btn btn-danger">
  <span class="glyphicon glyphicon-remove" aria-hidden="true">Refuser</span>
</button>
<br></br>
  <separator param={miniSep}></separator>
</div>


<script>

var self = this;

this.playlist_name = opts.param.Playlist.playlist_name;
this.usr_login = opts.param.Inviter.usr_login;
this.invited_role = opts.param.invited_role;
this.invitation_id = opts.param.invitation_id;
this.playlist_id = opts.param.playlist_id;
this.miniSep = {width : '400px'};

this.on('mount', function() {
  console.log('Mounting an invitation : ', opts);
})

refuse(e) {
  self.deleteInvitation(function() {

  })
}

deleteInvitation(next) {
  options.method = 'DELETE';
  options.path = '/api/invitation/' + self.invitation_id;

  requestManager.request(baseURL, options, null, function(rslt, req, err) {
    console.log('REFUSE INVITATION: ', rslt);
    if (rslt.rslt.code == 0) {
      next(true);
      //self.unmount(true);
      myEmitter.emit('invitationDeleted', opts.param);
    } else {
      next(false);
    }
  })
}

accept(e) {
  self.deleteInvitation(function() {
    options.method = 'POST';
    options.path = '/api/subscription'

    var data = JSON.stringify({usr_id : account.usr_id
      , playlist_id : self.playlist_id});

    requestManager.request(baseURL, options, data, function(rslt, req, err) {
      if (rslt.rslt.code == 0) {
        console.log('INVITATION ACCEPTED: ', rslt);
        myEmitter.emit('invitationAccepted', self.playlist_id);
      }
    });
  })
}

</script>

<style>

:scope {
  margin: 10px;
  text-align : center;
  position : relative;
}

</style>

</invitation>
