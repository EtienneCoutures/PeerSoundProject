<riotPanel>

  <div id="panel">
    <div each={ elements } data-is={ element } param={ param }></div>
  </div>

<script>

  var self = this;

  this.name = opts.name;
  this.elements = opts.elements;
  this.color = opts.color || "#484a4c";
  this.borders = opts.borders;

  this.root.riot = false;

  this.on('mount', function() {
    console.log('this.root.style: ', this.root.style);
    console.log('this.elements; ', this.elements);
    this.root.style.backgroundColor = this.color;

    if (this.borders) {
      this.root.style.borderLeft = this.borders[0] || " ";
      this.root.style.borderTop = this.borders[1] || " ";
      this.root.style.borderRight = this.borders[2] || " ";
      this.root.style.borderBottom = this.borders[3] || " ";
    }
    else {
      this.root.style.border = "2px solid black";
    }

  })

</script>

<style scoped>
  :scope {
     height: 100%;
     width: 100%;
     display: flex;
     flex-direction: column;
     align-items: center;
  }
</style>

</riotPanel>
