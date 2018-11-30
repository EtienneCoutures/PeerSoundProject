import { Component, OnInit, Input } from '@angular/core';
import { Account } from '../account'
import { PlaylistService } from '../playlist/playlist.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  private show: boolean = false;
  @Input() user: Account;

  constructor(
    private plService: PlaylistService
  ) { }

  ngOnInit() { }

  userOptions() {

  }

   public onToggle(): void {
     this.show = !this.show;
   }
}
