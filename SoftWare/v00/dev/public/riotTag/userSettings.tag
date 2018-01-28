<usersettings>

  <user param={ user }></user>

    <div onclick={ handler } id={ id } style="width: 18px; height: 18px;background-image: url(&quot;../images/userSettings.svg&quot;)">
    </div>

<script>

  console.log('opts: ', opts);

  this.on('mount', function(e) {
    console.log('User Settings mounted');
  })

  handler(e) {
    console.log('salamalikoum salam');
  }

  this.user = opts.param;

</script>

<style>

:scope {
  margin-top: 5px;
  margin-left: 10px;
}

</style>

</usersettings>
