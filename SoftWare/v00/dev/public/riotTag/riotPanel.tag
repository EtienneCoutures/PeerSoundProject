<riotPanel>

  <div id="panel">

      <div each={ elements } data-is={ element } param={ param }></div>

  </div>

<script>

  var self = this;

  this.name = opts.name;
  this.elements = opts.elements;
  this.color = opts.color;

  this.root.riot = false;

  this.on('mount', function() {
    console.log('mounted');
    console.log('this: ', this);
  })

  console.log('this.elements: ', this.elements);

</script>

<style scoped>
  :scope {
     border: 2px solid;
     height: 100%;
     width: 100%;
     display: flex;
     flex-direction: column;
     align-items: center;
     background-color: #484a4c;
  }
</style>

</riotPanel>
