<login>

  <div>
		<div class="top">
			<h1 id="title" class="hidden"><span id="logo"> PeerSoundProject<span></span></span></h1>
		</div>
		<div class="login-box animated fadeInUp">
			<div class="box-header">
				<h2>Log In</h2>
			</div>
      <span style="color:red; size-font:15px" id="error"></span>
      <br>
			<label for="username">Email</label>
			<br/>
			<input type="text" id="username">
			<br/>
			<label for="password">Password</label>
			<br/>
			<input type="password" id="password">
			<br/>
			<button id="submit" onclick={submit}>Sign In</button>
			<br/>
			<a href="#"><p class="small">Forgot your password?</p></a>
		</div>
	</div>
</body>

<script>

var fs = require('fs');
var baseURL = "localhost";
const {ipcRenderer} = require('electron');
var requestManager = require(__dirname + '/../js/utils/requestManager.js')

console.log('ipcRenderer : ', ipcRenderer);

	$(document).ready(function () {
    	$('#logo').addClass('animated fadeInDown');
    	$("input:text:visible:first").focus();
	});
	$('#username').focus(function() {
		$('label[for="username"]').addClass('selected');
	});
	$('#username').blur(function() {
		$('label[for="username"]').removeClass('selected');
	});
	$('#password').focus(function() {
		$('label[for="password"]').addClass('selected');
	});
	$('#password').blur(function() {
		$('label[for="password"]').removeClass('selected');
	});

  submit(e) {
    var email = $('#username').val();
    var password = $('#password').val();

    console.log("email : ", email);
    console.log("password : ", password);

    var data = {login : email, password : password};

    var options = {
      'method': 'POST',
      'hostname': baseURL,
      'port': 8000,
      'path': "/api/auth/login",
      'ca': fs.readFileSync(process.cwd() + '/hacksparrow-cert.pem'),
      'rejectUnauthorized':false,
      'headers': {
         'Content-Type': 'application/json',
       }
    };

    var dataJSON = JSON.stringify(data);

    requestManager.request(baseURL, options, dataJSON
      , function (rslt, req, err) {

        console.log('rslt: ', rslt);


        if (rslt.rslt.code != 0) {
          console.log('erreur : ', rslt.rslt);
          $('#error').text(rslt.rslt.errors[0].message);
        } else if (rslt.rslt.code == 0) {

          //var options =

          rslt.rslt.account.authorization = rslt.res.headers.authorization;
          ipcRenderer.send('connection', rslt.rslt.account);
          console.log('next ; ', __dirname + "/index.html");
          window.location = __dirname + "/index.html";
        }
    })
  }

</script>
<style>
</style>

</login>
