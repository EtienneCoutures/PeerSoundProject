import { Component, OnInit, Input } from '@angular/core';
import { Account } from '../account'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  private show: boolean = false;
  @Input() user: Account;

  constructor() { }

  ngOnInit() {
    console.log('User initiated: ', this.user);
  }

  userOptions() {
    
  }

   public onToggle(): void {
     this.show = !this.show;
   }
}
