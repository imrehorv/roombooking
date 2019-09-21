import { Component, OnInit } from '@angular/core';
import { MatDatepicker } from '@angular/material';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'rb-days',
  templateUrl: './days.component.html',
  styleUrls: ['./days.component.css']
})
export class DaysComponent implements OnInit {

  selecteddate: Date;
  date: FormControl;

  constructor() { }

  ngOnInit() {
    this.selecteddate = new Date();
    this.date = new FormControl(new Date());
    this.date.valueChanges.subscribe(
      data => {
        console.log(`date changed:${data}`);
        this.selecteddate = data;
      }
    );
  }

  back() {
    this.increasedate(-1);
  }

  forward() {
    this.increasedate(1);
  }

  increasedate(days: number) {
    this.selecteddate = new Date(this.selecteddate.getTime() + (days * 24 * 60 * 60 * 1000));
    this.date.setValue(this.selecteddate);
  }


}
