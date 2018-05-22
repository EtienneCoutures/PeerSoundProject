SC.initialize({
    client_id: 'nYw8DGbKym7Ph6LR1EaSxD8Dmj5rkCwa'
  });

  /*jQuery.get('https://api.soundcloud.com/resolve.json?url=https%3A%2F%2Fsoundcloud.com%2F' + 'neptuneprog' + '%2F' + 'monsters' + '&client_id=' + 'nYw8DGbKym7Ph6LR1EaSxD8Dmj5rkCwa',
  function (data){
      if (data){
        console.log(data);
    }
  });
  */
 SC.stream('/tracks/337026490').then(function(player){
  $(document).ready(function(){
    $("#Continue").click(function(){
        player.play().then(function(){
          console.log('Playback started!' + player.playState);
        }).catch(function(e){
          console.error('Playback rejected. Try calling play() from a user interaction.', e);
        });
      });
      $("#Pause").click(function(){
        player.pause().then(function(){
          console.log('Playback pause!' + player.playState);
        }).catch(function(e){
          console.error('Playback rejected. Try calling play() from a user interaction.', e);
        });
      });
      
    });
});
/*
  function playTrack(event) {
    e.preventDefault();
    if(!stream) {
      SC.stream("/tracks/90787841", function(sound){
          stream = sound;
          stream.play();
      });
    }
    else {
     stream.play();
    }
  }
  function pauseTrack(event) {
    if(stream) {
      stream.pause();
    }
  }

  playTrack();*/