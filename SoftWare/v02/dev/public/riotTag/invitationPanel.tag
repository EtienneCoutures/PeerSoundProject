<invitationPanel>

  <div style="text-align: center"><h2>Mes invitations - {nbInvitations}</h2><h2></h2></div>

  <separator param={separatorWidth}></separator>

  <div id="{ name }_panel" class="panel">
    <div each={ elements } data-is={ element } param={ param }>
    </div>
  </div>

  <script>

  var self = this;

  this.name = opts.name;
  this.elements = opts.elements;
  this.color = opts.color || "#484a4c";
  this.borders = opts.borders;
  this.alignItems = opts.alignItems;
  this.flexDirection = opts.flexDirection;
  this.scrollBar = true;
  this.invitations = opts.elements;
  this.nbInvitations = opts.elements.length;

  this.separatorWidth = {width: '90%'};

  this.root.riot = false;

  this.on('mount', function() {

    console.log("invitations: ", this.invitations);

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

    myEmitter.emit('showInvitationPanel');
  })

  myEmitter.on('showPlaylistInfo', function(playlist) {
    console.log('JEDOIS ME UNMOUNT');
    self.unmount(true);
  })

  myEmitter.on('invitationDeleted',function(invitation) {
    console.log('INVITAITON DELETED: ', invitation);

    console.log('self.elements.length: ', self.elements.length);
    for (var i = 0; i < self.elements.length; ++i) {
      if (self.elements[i].param.invitation_id === invitation.invitation_id) {
        self.elements.splice(i, 1);
        self.nbInvitations = self.elements.length;
        console.log('NEW ELEMENTS: ', self.elements);
        self.update();
      }
    }
  });

  </script>

</invitationPanel>
