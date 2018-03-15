<hideshowusers>
  <!--<svg class="iconActive-3K4uxh icon-mr9wAc iconMargin-2Js7V9" name="People" width="16" height="16" viewBox="0 0 24 24">
    <g fill="none" fill-rule="evenodd">
      <polygon points="0 0 24 0 24 24 0 24"></polygon>
      <path class="iconForeground-2c7s3m" fill="currentColor" d="M19 19L23 19 23 16.5C23 14.17 18.33 13 16 13 15.71 13 15.38 13.02 15.03 13.05 15.2979181 13.2440097 15.5471657 13.4534892 15.7720754 13.6791778 17.5922944 14.6769857 19 16.1183086 19 18L19 19zM14.3335577 10.4967128C14.8098529 10.8147627 15.3828086 11 16 11 17.66 11 18.99 9.66 18.99 8 18.99 6.34 17.66 5 16 5 15.3827845 5 14.8098082 5.18525173 14.3335019 5.5033244 14.7574619 6.23791814 15 7.09053797 15 8.00006693 15 8.90955601 14.7574832 9.76214095 14.3335577 10.4967128zM9 12C6.79 12 5 10.21 5 8 5 5.79 6.79 4 9 4 11.21 4 13 5.79 13 8 13 10.21 11.21 12 9 12zM9 14C11.67 14 17 15.34 17 18L17 20 1 20 1 18C1 15.34 6.33 14 9 14z"></path>
    </g>
  </svg>-->

  <div onclick={hideShowUsers}>
    <i class="fa fa-user-o" style="font-size:36px;color: white;"></i>
  </div>

  <script>

  this.hide = false;

  this.on('mount', function(e) {
    console.log('hideshowusers mounted');
  })

  hideShowUsers(e) {
    if (this.hide == false) {
      $('#users').hide();
      this.hide = true;
      $('#middlePanel').removeClass('col-md-7');
      $('#middlePanel').addClass('col-md-9');
    } else {
      $('#users').show();
      this.hide = false;
      $('#middlePanel').removeClass('col-md-9');
      $('#middlePanel').addClass('col-md-7');
    }
  }

  </script>

  <style>

  :scope {
    margin-left: 1000px;
    margin-top: 10px;
  }

  </style>

</hideshowusers>