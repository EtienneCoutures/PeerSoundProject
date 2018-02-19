<research>

  <div class="search" style="margin-top:15px; width: 100%;z-index:3 !important;">
    <div class="search-bar">
      <input class="DraftEditor-root" id="input_{type}" ref="input" placeholder="Rechercher">
        <div class="public-DraftEditorPlaceholder-root">
          <div class="public-DraftEditorPlaceholder-inner"></div>
        </div>
        <div class="DraftEditor-editorContainer">
          <div aria-describedby="placeholder-2sg9v" class="public-DraftEditor-content" contenteditable="true" role="textbox" spellcheck="false" style="outline: none; white-space: pre-wrap; word-wrap: break-word;">
            <div data-contents="true">
              <div class="" data-block="true" data-editor="2sg9v" data-offset-key="fpis5-0-0">
                <div data-offset-key="fpis5-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr">
                  <span data-offset-key="fpis5-0-0"><br data-text="true"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </input>
      <div class="search-bar-icon">
        <i class="icon icon-search-bar-eye-glass visible"></i>
        <i class="icon icon-search-bar-clear"></i>
      </div>
    </div>
  </div>

<script>

var self = this;
this.researchField = opts.param.researchField;
this.researchAlgo = opts.param.researchAlgo;
this.type = opts.param.type;
this.input = "";

this.on('mount', function(e) {
  $(function() {
    console.log("set focus to input div");
     $('#input_' + self.type).focus();
  });

  $('#input_' + self.type).bind('keyup', function(event) {
       /*if (event.keyCode > 64 && event.keyCode < 123) {
          self.input += String.fromCharCode(event.keyCode + 32);
       }
       else if (event.keyCode == 8) {
         console.log('SLICING INPUT');
         self.input = self.input.slice(0, -1);
       }*/
     self.researchAlgo(self.refs.input.value, self.researchField);
  });

})

</script>

<style>

  :scope {
    display : flex;
    justify-content: center; /* align horizontal */
    align-items: center;
  }

</style>

</research>
