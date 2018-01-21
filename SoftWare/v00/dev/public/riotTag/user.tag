<user>

<div class="displayVertical">

  <div onclick={ handler } id={ id } class="crop" style="background-image: url('{ image }')">
    <div class={ status }></div>
  </div>

  <div><label class="userName">{ name }</label></div>

</div>

  <script>

  this.name = opts.param.name;
  this.id = opts.param.id;
  this.image = opts.param.image;
  this.status = opts.param.status;

  </script>

  <style>

  :scope {
    margin-top : 10px;
  }

  .displayVertical {
    display : flex;
    flex-direction : row;
    align-items: center;
  }

  .userName {
    margin-left : 5px;
    font-weight: lighter;
    color : #898989;
    font-size : 125%;
  }

  .online {
    width : 10px;
    height : 10px;
    border-radius : 50%;
    background-color: #67C363;
    position : absolute;
  }

  .afk {
    width : 10px;
    height : 10px;
    border-radius : 50%;
    background-color: #FF951D;
    position : absolute;
  }

  .crop {
    width : 45px;
    height : 45px;
    border-radius: 50%;
    background-position: center;
    background-size: cover;
    overflow: hidden;
    vertical-align: middle;
  }

  .crop img {
    width : 45px;
    height: 30px;
    vertical-align: middle;
  }

  </style>

</user>
