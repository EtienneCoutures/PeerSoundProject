import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from '../login/login.service';
import { userCredentials } from '../login/userCredentials';
import { ActivatedRoute, Router } from '@angular/router';
import { PlaylistService } from '../playlist/playlist.service'

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.scss']
})

export class NewAccountComponent implements OnInit {

  verifyPassword: string;
  userCred: userCredentials;
  error: string;
  sub: any;

  constructor(
    private loginService: LoginService,
    private router: Router,
    //private plService: PlaylistService
  ) { }

  ngOnInit() {
    this.userCred = new userCredentials();
  }

  ngOnDestroy() {}

  isEmail(myVar: string) {
  var regEmail = new RegExp('^[0-9a-z._-]+@{1}[0-9a-z.-]{2,}[.]{1}[a-z]{2,5}$'
    , 'i');
   return regEmail.test(myVar);
  }

  createAccount() {
    if (!this.isEmail(this.userCred.login)) {
      this.error = "Veuillez vérifier l'adresse mail.";
      return ;
    }


    if (this.verifyPassword === this.userCred.password) {
      this.sub = this.loginService.signup(this.userCred)
      .subscribe(res => {
        console.log('res: ', res);
        if (res.body.code === 0) {
          this.loginService.account = res.body.account;
          this.router.navigate(['home']);
        } else {
          this.error = "Cette adresse mail est déjà utilisée.";
        }
      }, error => console.log('error: ', error));
    }
    else {
      this.error = "Les mots de passe ne correspondent pas.";
    }
  }

  retour(){
    this.router.navigate(['']);
  }
}
