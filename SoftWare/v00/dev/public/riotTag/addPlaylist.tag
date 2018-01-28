<addplaylist>

  <div class="row align">
    <button class="guild guilds-add"><span class="guilds-add-inner">+</span></button>
  </div>

  <script>

  this.on('mount', function(e) {
    console.log('addPlaylist mounted');
  })

  </script>

  <style>

 .guild {
   height:80px !important;
   width:80px !important;
 }

.guilds-add {
  -webkit-transition:border-color .25s ease,color .25s ease;
  background:#1e2124;
  border:1px dashed #535559;
  border-radius:50%;
  color:#535559;
  font-size:60px;
  font-weight:300;
  height:100%;
  line-height:100%;
  padding:0;
  text-align:center;
  transition:border-color .25s ease,color .25s ease;
  width:100%
}

.guilds-add-inner {
  position:relative;top:-1px
}

  </style>

</addplaylist>
