<separator>

<div class="row align">
  <div class="guild-separator" style="width: {width}"></div>
</div>

  <script>

  this.width = (opts.param.width || '100px');

  </script>

  <style>

  .guild-separator {
    background:none;
    height:2px;
    margin-bottom:10px;
    position:relative;
    width:100px;
  }

  .guild-separator:after {
    background:#2f3136;
    content:" ";
    height:2px;
    left:20%;
    position:absolute;
    right:20%;
    top:0;
  }

  </style>

</separator>
