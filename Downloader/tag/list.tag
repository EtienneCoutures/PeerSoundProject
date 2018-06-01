<list>
  <div class="listPl">
  <div each="{ item, index in this.playlists }" class="plList" >
    <a href="#" class="cliquable" style="text-decoration: none;">
      <div id="{item.playlist_id}" onclick="{selectItem}">
        <p class="pl-name">{ item.playlist_name }</p>
      </div>
    </a>
  </div>
</div>
  <script>
  this.playlists = opts.elements
  selectItem = function(param) {
    if (actual.selected) {
      document.getElementById(actual.selected.playlist_id).classList.remove('selected');
    }
    document.getElementById(param.item.item.playlist_id).classList.add('selected');
    actual.selected = param.item.item;
    riot.mount("musics")
  }
  </script>
</list>
