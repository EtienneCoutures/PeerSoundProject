<socialbtn>

<div class="row align"
  <div class="guild">
    <div class="guild-inner" draggable="false" style="border-radius: 25px; background-color: rgb(47, 49, 54);margin-top:10px;margin-bottom:10px;">
      <div class="social-icon"></div>
    </div>
    <div class="badge">{ nbNotifications }</div>
  </div>
</div>

  <script>

  this.nbNotifications = opts.nbNotifications || 14;

  this.on('mount', function(e) {});

  </script>

  <style>

    .badge {
      -webkit-box-shadow:0 1px 0 rgba(0,0,0,.25),inset 0 1px 0 hsla(0,0%,100%,.15);
      background-clip:padding-box;
      background-color:#f04747;
      border-radius:3px;box-shadow:0 1px 0 rgba(0,0,0,.25),inset 0 1px 0 hsla(0,0%,100%,.15);
      color:#fff;
      display:inline-block;
      font-size:12px;
      font-weight:500;
      line-height:12px;
      padding:3px 6px;
      text-shadow:0 1px 0 rgba(0,0,0,.25);
    }

    .social-icon {
      background-image:url('../images/social.svg');
      background-position:50%;
      background-repeat:no-repeat;
      height:80px;
      background-size:80px 60px;
      width:80px
    }

  </style>

</socialbtn>
