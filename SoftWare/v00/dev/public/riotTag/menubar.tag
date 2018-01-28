<menubar>

  <header onclick={ showPlaylistOptions } class="header-1tSljs" style="width:100%">
    <span class="name-3gtcmp">Playlist1</span>
    <svg width="18" height="18" class="button-2ZR58H">
      <g fill="none" fill-rule="evenodd">
        <path d="M0 0h18v18H0"></path>
        <path stroke="#FFF" d="M4.5 4.5l9 9" stroke-linecap="round"></path>
        <path stroke="#FFF" d="M13.5 4.5l-9 9" stroke-linecap="round"></path>
      </g>
    </svg>
  </header>

  <div class="popout popout-bottom" ref="popout" style="z-index: 1000; overflow: hidden; visibility: hidden; left: 120px; top: 40px; height: 192px; width: 216px; transform: translateY(0%) translateX(-50%) translateZ(0px);">
    <div class="menu-3BZuDT">
      <div class="item-rK1j5B">
        <div class="icon-3ICDZz" style="background-image: url(&quot;../images/invitePeople.svg&quot;);">
        </div>
        <div class="label-HtH0tJ">Inviter des gens</div>
      </div>
      <div class="separator-1hpa3S"></div>
      <div class="item-rK1j5B">
        <div class="icon-3ICDZz" style="background-image: url(&quot;../images/playlistNotif.svg&quot;);">
        </div>
        <div class="label-HtH0tJ">Notifications</div>
      </div>
      <div class="item-rK1j5B">
        <div class="icon-3ICDZz" style="background-image: url(&quot;../images/editPlaylist.svg&quot;);"></div>
        <div class="label-HtH0tJ">Confidentialité</div>
      </div>
      <div class="separator-1hpa3S"></div>
      <div class="item-rK1j5B">
        <div class="icon-3ICDZz" style="background-image: url(&quot;../images/editPlaylistName.svg&quot;);"></div>
        <div class="label-HtH0tJ">Changer le nom</div>
      </div>
      <div class="separator-1hpa3S"></div>
      <div class="item-rK1j5B leave-2bjeRM">
        <div class="icon-3ICDZz" style="background-image: url(&quot;../images/leavePlaylist.svg&quot;);"></div>
        <div class="label-HtH0tJ">Quitter la playlist</div>
      </div>
    </div>
  </div>

  <script>

  this.playlistName = opts.param.currentPlaylist.name;

  this.on('mount', function(e) {
    console.log('this.menubar: ', this);
  });

  showPlaylistOptions(e) {
    this.refs.popout.style.visibility = this.refs.popout.style.visibility
                                      == "visible" ? "hidden" : "visible";
  }

  </script>

  <style>

:scope {
  height: 100%;
  width: 100%;
}

.header-1tSljs {
  cursor:pointer;
  position:relative
}

.header-1tSljs {
  -ms-flex-align:center;
  -webkit-box-align:center;
  -webkit-box-shadow:0 1px 0 rgba(0,0,0,.2),0 2px 0 rgba(0,0,0,.06);
  -webkit-box-sizing:border-box;
  -webkit-transition:background-color .15s ease;
  align-items:center;
  box-shadow:0 1px 0 rgba(0,0,0,.2),0 2px 0 rgba(0,0,0,.06);
  box-sizing:border-box;
  color:#fff;
  display:-webkit-box;
  display:-ms-flexbox;
  display:flex;
  font-family:Whitney,Helvetica Neue,Helvetica,Arial,sans-serif;
  font-weight:500;height:48px;
  padding:0 12px 0 16px;
  transition:background-color .15s ease;z-index:3
}

  .header-1tSljs:hover {
    background-color:rgba(0,0,0,.1)
  }

  .name-3gtcmp {
    -ms-flex:1;
    -webkit-box-flex:1;
    flex:1;
    font-size:16px;
    line-height:48px;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap
  }

.popout-open .header-1tSljs{background-color:rgba(0,0,0,.1)}

.button-2ZR58H {
  -webkit-transform:translate3d(0,3px,0);
  -webkit-transition:-webkit-transform .2s ease;
  margin-left:4px;opacity:.6;
  transform:translate3d(0,3px,0);
  transition:-webkit-transform .2s ease;
  transition:transform .2s ease;
  transition:transform .2s ease,-webkit-transform .2s ease
}

.button-2ZR58H.open-3KjR1l {
  -webkit-transform:rotate(-90deg);
  transform:rotate(-90deg)
}

.button-2ZR58H.open-3KjR1l path {
  stroke-dasharray:14
}

.button-2ZR58H path {
  -webkit-transition:stroke-dasharray .2s ease;
  stroke-dasharray:7;
  stroke-dashoffset:1;
  stroke-width:2px;
  transition:stroke-dasharray .2s ease
}

  </style>

</menubar>
