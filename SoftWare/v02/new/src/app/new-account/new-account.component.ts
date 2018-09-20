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

  createAccount() {

    if (this.verifyPassword === this.userCred.password) {
      this.sub = this.loginService.signup(this.userCred)
      .subscribe(res => {
        if (res.body.code == 0) {
          this.loginService.account = res.body.account;
          this.router.navigate(['home']);
        }
      }, error => console.log('error: ', error));
    }
    else {
      this.error = "Passwords don't match.";
    }
  }

  retour(){
    //console.log("mamamama!!!!!!!");
    this.router.navigate(['']);
  }
}
