<musics>
  <h3 class="main-title">{actual.selected.playlist_name}'s Playlist</h3>
  <div style="width:90%">
    <div class="scrollable" style="border-right: 1px solid #23272a;border-radius:15px;background-color:#2c2f33">
      <div class="col-md-4 information">Name</div>
      <div class="col-md-2 information" style="text-align:center;border-right: 1px solid #23272a">Artist</div>
      <div class="col-md-2 information" style="text-align:center;border-right: 1px solid #23272a">Album</div>
      <div class="col-md-2 information" style="text-align:center;border-right: 1px solid #23272a">Lenght</div>
      <div class="col-md-2 information last">Source</div>
      <hr style="border-color:#23272a">
      <div class="col-md-12">
        <div each="{music, index in actual.selected.MusicLink}">
          <div class="col-md-4 content"><span>{ music.Music.music_name }</span></div>
          <div class="col-md-2 content"><span>{ music.Music.music_group }</span></div>
          <div class="col-md-2 content"><span>{ music.Music.music_album }</span></div>
          <div class="col-md-2 content"><span>{ music.Music.music_duration }</span></div>
          <div class="col-md-2"><img class="source" src="./img/{music.Music.music_source}.png"></img></div>
        </div>
      </div>
    </div>
  </div>
</musics>
