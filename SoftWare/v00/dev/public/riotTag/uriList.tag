<UriList>

  <ul>
    <li each={ uriList } > { uri } { Status } <button id={ rowid } onclick={ modif }>Modifier</button> <button id={ rowid } onclick={ delete }>Supprimer</button></li>
  </ul>

  <script>
    this.uriList = opts.rslt;

    var Uri = require('../../MVCR/uri/controler/uriControler.js');

    modif(e) {
      console.log("modif : ", e);
      console.log("this.id: ", e.target.id);
    }

    delete(e) {
      Uri.Delete(function (err, rslt) {
        console.log("delete complete!");
        window.location.reload();
      }, {rowID : e.target.id});
    }

  </script>

</UriList>
