import { Component, OnInit, Input, Inject } from '@angular/core';
import {MAT_SNACK_BAR_DATA} from '@angular/material';

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss']
})
export class SnackBarComponent implements OnInit {

  private type: number;
  private message: string;

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
    console.log('data: ', this.data);
    this.type = this.data.type;
    this.message = this.data.message;
  }

  ngOnInit() {
  }

}
