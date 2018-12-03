import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from './login.service';
import { userCredentials } from './userCredentials';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { loginResponse } from './LoginResponse';
import { Account } from '../account';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit, OnDestroy {

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  private userCred: userCredentials = new userCredentials();
  private error: string;
  private sub: any;
  private data: loginResponse;

  ngOnInit() {
    // this.userCred = new userCredentials();
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  isEmail(myVar: string) {
  var regEmail = new RegExp('^[0-9a-z._-]+@{1}[0-9a-z.-]{2,}[.]{1}[a-z]{2,5}$'
    , 'i');
    return regEmail.test(myVar);
  }

  submit() {
    if (!this.isEmail(this.userCred.login)) {
      this.error = "Adresse mail invalide.";
      return ;
    }

    this.sub = this.loginService.login(this.userCred).subscribe(res => {
      this.data = res.body;
      if (this.data.code != 0) {
        this.error = this.data.errors[0] ? this.data.errors[0].message
                                         : this.data.info.message;
      } else {
        this.loginService.account = this.data.account;
        this.loginService.account.authorization = res.headers.get('authorization');
        console.log('account: ', this.loginService.account);
        this.router.navigate(['home']);
      }
    }, error => console.log('Login request error: ', error));
  }

}
