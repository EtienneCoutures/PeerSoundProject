<musics>
  <h3 class="main-title">Musics of {actual.selected.playlist_name} </h3>
  <div class="scrollable">
    <div each="{music, index in actual.selected.MusicLink}">
      <span>{ music.Music.music_name } by { music.Music.music_group }</span>
    </div>
  </div>
</musics>
