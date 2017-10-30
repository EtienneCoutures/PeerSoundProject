<optionList>

  <ul>
    <li>
      Nature : <input id="Nature" class="awesomplete" data-minchars="1" data-maxitems="20" data-list="WebService, Site Web" />
    </li>
    <li each={ option } > { name } : <input align="right" id={ id } list={ spec }/></li>
  </ul>

  <datalist id="natureList">
        <option value="Webservice">Webservice</option>
        <option value="SiteWeb">Site Web</option>
  </datalist>

  <script>

    this.option = [
        {id : "Hostid", name : "Host ID", spec : ""},
        {id : "HostLogin", name : "Host login", spec : ""},
        {id : "HostPass", name : "Host pass", spec : ""},
        {id : "Uri", name : "Uri", spec : ""},
        {id : "Login", name : "Login", spec : ""},
        {id : "Pass", name: "Password", spec : ""},
        {id : "Frequence", name : "Frequence", spec : ""},
        {id : "ErrorCode", name : "Code(s) d'erreur", spec : ""},
        {id : "ExpectedCode", name : "Code(s) attendu(s)", spec : ""},
        {id : "ExpectedRegexp", name : "Expression régulière", spec : ""}
    ];

  </script>

</optionList>
