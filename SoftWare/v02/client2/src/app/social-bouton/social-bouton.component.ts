import { Component, OnInit, Input } from '@angular/core';
import {MatDividerModule} from '@angular/material/divider';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { Event } from '../events/events.component';

@Component({
  selector: 'app-social-bouton',
  templateUrl: './social-bouton.component.html',
  styleUrls: ['./social-bouton.component.scss']
})
export class SocialBoutonComponent implements OnInit {

  @Input() nbNotif: number;

  constructor(
    private router: Router,
    private userService: UserService
  ) {

  }

  ngOnInit() {}

}
