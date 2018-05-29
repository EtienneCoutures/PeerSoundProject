<list>
  <div each="{ item, index in this.playlists }" class="plList" >
    <a href="" style="text-decoration:none">
      <div  id="{item.playlist_id}" onclick="selectItem({item.playlist_id})">
        <p>{ item.playlist_name }</p>
      </div>
    </a>
  </div>
  <script>
    this.playlists = opts.elements
    var selected = ""
    selectItem = function(id) {
      if (selected) {
      document.getElementById(selected).classList.remove('selected'); }
      document.getElementById(id).classList.add('selected');
      selected = id;
    }
  </script>
</list>
