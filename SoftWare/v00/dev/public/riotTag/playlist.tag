<playlist>

<div class="row align">
  <div class="arrow-right" ref="arrow" name="arrow"></div>
  <div onclick={ handler } id={ id } class="crop" style="background-image: url('{ image }')">
  </div>
</div>

  <script>

  this.name = opts.param.name;
  this.image = opts.param.image;
  this.id = opts.param.id;
  this.selected = false;

  this.on('mount', function() {
    console.log('refs: ', this.refs);
    this.refs.arrow.style.display = "none";
  })

  handler(e) {
    $('.current').removeClass('current');
    e.srcElement.className += " current";
    $('.arrow-right').css("display", "none");
    this.refs.arrow.style.display = "block";
  }

  </script>

  <style scoped>
  :scope {
    border-radius: 40px;
    width : 80px;
    height: 80px;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .align {
    display : flex;
    justify-content: center; /* align horizontal */
    align-items: center; /* align vertical */
  }

  .arrow-right {
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  display : "none";
  border-left: 10px solid black;
}


  .current {
    margin-left : 20px;
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
