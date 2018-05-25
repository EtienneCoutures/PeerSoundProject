<changeplaylistname>

  <div id="backgound" onclick={close} class="backdrop-2ohBEd" style="z-index:4 !important; opacity: 0.85; background-color: rgb(0, 0, 0); transform: translateZ(0px);"></div>

  <div class="changeName">
    <form class="modal-3HOjGZ sizeSmall-1sh0-r">
      <div class="flex-lFgbSz flex-3B1Tl4 horizontal-2BEEBe horizontal-2VE-Fw flex-3B1Tl4 directionRow-yNbSvJ justifyStart-2yIZo0 alignCenter-3VxkQP noWrap-v6g9vO header-3sp3cE" style="flex: 0 0 auto;">
        <h4 class="h4-2IXpeI title-1pmpPr size16-3IvaX_ height20-165WbF weightSemiBold-T8sxWH defaultColor-v22dK1 defaultMarginh4-jAopYe marginReset-3hwONl">Changer la playlist de nom</h4>
      </div>
      <div class="scrollerWrap-2uBjct content-1Cut5s scrollerThemed-19vinI themeGhostHairline-2H8SiW">
        <div class="scroller-fzNley inner-tqJwAU">
          <div class="input-3VBhvk marginBottom8-1mABJ4">
            <h5 class="h5-3KssQU title-1pmpPr size12-1IGJl9 height16-1qXrGy weightSemiBold-T8sxWH defaultMarginh5-2UwwFY marginBottom8-1mABJ4">Nom playlist</h5>
            <div class="inputWrapper-3xoRWR vertical-3X17r5 flex-3B1Tl4 directionColumn-2h-LPR">
              <input type="text" class="inputDefault-Y_U37D input-2YozMi size16-3IvaX_" value="" placeholder={playlistName} name="" maxlength="999">
              </div>
            </div>
            <div class="reset-folylf marginBottom20-2Ifj-2 small-3-03j1 size12-1IGJl9 height16-1qXrGy primary-2giqSn weightSemiBold-T8sxWH">Réinitialiser le nom</div>
          </div>
        </div>
        <div class="flex-lFgbSz flex-3B1Tl4 horizontalReverse-2LanvO horizontalReverse-k5PqxT flex-3B1Tl4 directionRowReverse-2eZTxP justifyStart-2yIZo0 alignStretch-1hwxMa noWrap-v6g9vO footer-1PYmcw" style="flex: 0 0 auto;">
          <button type="submit" class="button-2t3of8 lookFilled-luDKDo colorBrand-3PmwCE sizeMedium-2VGNaF grow-25YQ8u">
            <div class="contents-4L4hQM">Enregistrer</div>
          </button>
          <button type="button" class="button-2t3of8 lookLink-3VWONr colorPrimary-2KuK5O sizeMedium-2VGNaF grow-25YQ8u">
            <div class="contents-4L4hQM">Annuler</div>
          </button>
        </div>
      </form>
    </div>

    <script>

    var self = this;

    this.playlistName = (opts.playlistName || "playlist1");

    close(e) {
      this.unmount(true);
    }
    </script>

    <style>

        .changeName {
          background-color: white;
          border: 2px solid black;
          z-index:5 !important;
          width: 60%;
          position: relative !important;
        }

    </style>

</changeplaylistname>
