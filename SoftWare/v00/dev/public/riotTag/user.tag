<user>

<div class="displayVertical">

  <div onclick={ handler } ref="userpic" id={ id } class="crop" style="background-image: url('{ image }');margin-right: 10px;">
    <div class={ status } style="visibility: { status == 'offline' ? hidden : visible}"></div>
  </div>

  <div><label class="userName">{ name }</label></div>

</div>

  <script>

  console.log('user mount');

  this.name = opts.param.name;
  this.id = opts.param.id;
  this.image = opts.param.image;
  this.status = opts.param.status;

  this.on('mount', function(e) {
    if (this.status == "offline") {
      this.refs.userpic.className += " offline";
      console.log('this.refs.userpic: ', this.refs.userpic.className);
    }
  })

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
    font-weight: normal;
    color : #898989;
    font-size : 110%;
  }

  .online {
    width : 15px;
    height : 15px;
    box-shadow: 0px 0px 0pt 2pt #484a4c;
    border-radius : 50%;
    background-color: #67C363;
    position : absolute;
  }

  .offline {
    -webkit-filter: grayscale(100%); /* Safari 6.0 - 9.0 */
    filter: grayscale(100%);
  }

  .afk {
    width : 15px;
    height : 15px;
    box-shadow: 0px 0px 0pt 2pt #484a4c;
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
