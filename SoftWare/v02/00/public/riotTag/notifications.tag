<notifications>

<div onclick={notifications}>
  <i class="{active ? 'fa fa-bell' : 'fa fa-bell-slash-o'}" style="font-size:36px;color: white;"></i>
</div>

  <script>

  var notifier = require('electron-notifications');
  var process = require('process');

  this.active = (opts.param.on || true);

  notifications(e) {
    if (this.active == false) {
      notifier.notify('PSP Software', {
      message: "Notifications are now active !",
      icon: process.cwd() + '/public/images/checked.svg.png',
      buttons: ['Dismiss']
    })
  }

      this.active = this.active ? false : true;
      e.srcElement.className = this.active ? 'fa fa-bell' : 'fa fa-bell-slash-o';
      self.update();
}

  </script>

  <style>

  :scope{
    margin-bottom: 15px;
    margin-left: 1050px;
    position: relative;
    bottom: 35px;
  }

  </style>

</notifications>
