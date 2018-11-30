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

  private userCred: userCredentials = {login: 'gogo@gmail.com', password: '345poule'}; // !!!!!!!!!!!!!!!
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

  submit() {
    this.sub = this.loginService.login(this.userCred).subscribe(res => {
      this.data = res.body;
      if (this.data.code != 0) {
        this.error = this.data.errors[0] ? this.data.errors[0].message
                                         : this.data.info.message;
      } else {
        this.loginService.account = this.data.account;
        this.loginService.account.authorization = res.headers.get('authorization');
        this.router.navigate(['home']);
      }
    }, error => console.log('Login request error: ', error));
  }

}
