<playlist>

<div class="row align">
  <!-- <div class="arrow-right" ref="arrow" name="arrow"></div> -->
  <div onclick={ handler } id={ id } ref="playlist" class="crop" style="background-image: url('{ image }')">
  </div>
</div>

  <script>

  this.name = opts.param.name;
  this.image = opts.param.image;
  this.id = opts.param.id;
  this.selected = false;

  this.on('mount', function() {
    console.log('refs: ', this.refs);
    //this.refs.arrow.style.display = "none";
  })

  handler(e) {
    $('.current').removeClass('current');
    e.srcElement.className += " current";
    //$('.arrow-right').css("display", "none");
    //this.refs.arrow.style.display = "block";
  }

  </script>

  <style scoped>
  :scope {
    border-radius: 40px;
    width : 80px;
    height: 80px;
    margin-top: 10px;
    margin-bottom: 10px;
    margin-left: 45px;
  }

  .current {
    margin-left : 20px;
    border-radius : 30% !important;
  }

  .crop {
    width : 80px;
    height : 80px;
    border-radius: 40px;
    background-position: center;
    background-size: cover;
    overflow: hidden;
  }

  .crop img {
    width : 80px;
    height: 60px;
  }

  </style>

</playlist>
