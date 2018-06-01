<user>

  <div id="backgound" onclick={close} class="backdrop-2ohBEd" style="z-index:4; opacity: 1; background-color: transparent; transform: translateZ(0px);pointer-events:none"></div>
<div class="displayVertical" >

  <div  onclick={ userOptions } ref="userpic" id={ id } class="crop" style="background-image: url('{ image }');margin-right: 10px;">
    <div class={ status } style="visibility: { status == 'offline' ? hidden : visible}"></div>
  </div>

  <div><label class="userName">{ name }</label></div>

  <div id="user_{id}" class="popout popout-bottom" ref="popout" style="z-index: 1000; visibility: hidden; overflow: visible; position: absolute; top:0; margin-left:150px;transform: translateY(0%) translateX(-50%) translateZ(0px);">
    <div class="menu-3BZuDT">
      <div class="item-rK1j5B">
        <input type="checkbox" class="icon-3ICDZz" checked="checked"/>
        <div class="label-HtH0tJ">Ajout</div>
      </div>

      <div class="item-rK1j5B">
        <input type="checkbox" class="icon-3ICDZz" checked="checked"/>
        <div class="label-HtH0tJ">Suppression</div>
      </div>

      <div class="item-rK1j5B">
        <input type="checkbox" class="icon-3ICDZz" checked="checked"/>
        <div class="label-HtH0tJ" onclick={changePlaylistName}>Edition</div>
      </div>
      <div class="separator-1hpa3S"></div>
      <div class="item-rK1j5B leave-2bjeRM">
        <div class="icon-3ICDZz" style="background-image: url(&quot;../images/leavePlaylist.svg&quot;);"></div>
        <div class="label-HtH0tJ">Renvoyer</div>
      </div>
    </div>
  </div>

  <div style="visibility: {admin ? 'visible' : 'hidden'}">
    <svg name="Crown" class="member-owner-icon" width="24" height="24" viewBox="0 0 24 24">
      <g fill="none" fill-rule="evenodd">
        <path fill="#faa61a" fill-rule="nonzero" d="M2,11 L0,0 L5.5,7 L9,0 L12.5,7 L18,0 L16,11 L2,11 L2,11 Z M16,14 C16,14.5522847 15.5522847,15 15,15 L3,15 C2.44771525,15 2,14.5522847 2,14 L2,13 L16,13 L16,14 Z" transform="translate(3 4)"></path>
        <rect width="24" height="24"></rect>
      </g>
    </svg>
  </div>

</div>

  <script>

  var self = this;
  this.name = opts.param.name;
  this.id = opts.param.id;
  this.image = opts.param.image;
  this.status = opts.param.status;
  this.admin = (opts.param.admin || false);
  this.options = false;

  console.log('user mount: ', this.id, ' refs: ', this.refs);

  this.on('mount', function(e) {
    if (this.status == "offline") {
      this.refs.userpic.className += " offline";
      //console.log('this.refs.userpic: ', this.refs.userpic.className);
    }
  })

  userOptions(e) {
    self.refs.popout.style.visibility = self.options ? 'hidden' : 'visible';
    self.options = self.options ? false : true;
    console.log('show this shit: ', self.refs.popout.style.visibility);
    console.log('self.options: ', self.options);
  }

  close(e) {
    console.log('toto1');
    self.refs.popout.style.visibility = 'hidden';
    self.options = false;
  }


/*  $(document).mouseup(function(e)
{
  console.log('hello: ', self.options)

    if (self.options == false)
      return

    var container = $("#user_" + self.id);
    console.log('container: ', container);

    // if the target of the click isn't the container nor a descendant of the container
    if (!container.is(e.target) && container.has(e.target).length === 0)
    {
      console.log('hide this shit');
        container.hide();
    }});*/


  </script>

  <style>

  :scope {
    margin-top : 10px;
  }

  :scope:hover {
    /*background-color: #d1d1e0;*/
  }

  .displayVertical {
    display : flex;
    flex-direction : row;
    align-items: center;
    width: 80% !important;
    position: relative;
  }

  .userName {
    margin-top: 10px;
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

  popup {
    position: relative;
    display: inline-block;
    cursor: pointer;
}

/* The actual popup (appears on top) */
.popup .popuptext {
    visibility: hidden;
    width: 160px;
    background-color: #555;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 8px 0;
    position: absolute;
    z-index: 1;
    bottom: 125%;
    left: 50%;
    margin-left: -80px;
}

.popup .show {
    visibility: visible;
    -webkit-animation: fadeIn 1s;
    animation: fadeIn 1s
}

/* Add animation (fade in the popup) */
@-webkit-keyframes fadeIn {
    from {opacity: 0;}
    to {opacity: 1;}
}

@keyframes fadeIn {
    from {opacity: 0;}
    to {opacity:1 ;}
}

.label__checkbox {
  display: none;
}

.label__check {
  display: inline-block;
  border-radius: 50%;
  border: 5px solid rgba(0,0,0,0.1);
  background: white;
  vertical-align: middle;
  margin-right: 20px;
  width: 2em;
  height: 2em;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border .3s ease;

  i.icon {
    opacity: 0.2;
    font-size: ~'calc(1rem + 1vw)';
    color: transparent;
    transition: opacity .3s .1s ease;
    -webkit-text-stroke: 3px rgba(0,0,0,.5);
  }

  &:hover {
    border: 5px solid rgba(0,0,0,0.2);
  }
}

.label__checkbox:checked + .label__text .label__check {
  animation: check .5s cubic-bezier(0.895, 0.030, 0.685, 0.220) forwards;

  .icon {
    opacity: 1;
    transform: scale(0);
    color: white;
    -webkit-text-stroke: 0;
    animation: icon .3s cubic-bezier(1.000, 0.008, 0.565, 1.650) .1s 1 forwards;
  }
}

.center {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%,-50%);
}

@keyframes icon {
  from {
    opacity: 0;
    transform: scale(0.3);
  }
  to {
    opacity: 1;
    transform: scale(1)
  }
}

@keyframes check {
  0% {
    width: 1.5em;
    height: 1.5em;
    border-width: 5px;
  }
  10% {
    width: 1.5em;
    height: 1.5em;
    opacity: 0.1;
    background: rgba(0,0,0,0.2);
    border-width: 15px;
  }
  12% {
    width: 1.5em;
    height: 1.5em;
    opacity: 0.4;
    background: rgba(0,0,0,0.1);
    border-width: 0;
  }
  50% {
    width: 2em;
    height: 2em;
    background: #00d478;
    border: 0;
    opacity: 0.6;
  }
  100% {
    width: 2em;
    height: 2em;
    background: #00d478;
    border: 0;
    opacity: 1;
  }
}

  </style>

</user>
