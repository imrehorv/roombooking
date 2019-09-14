import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rb-days',
  templateUrl: './days.component.html',
  styleUrls: ['./days.component.css']
})
export class DaysComponent implements OnInit {

  selecteddate: Date

  constructor() { }

  ngOnInit() {
    this.selecteddate = new Date();
  }

  back() {
    this.increasedate(-1);
  }

  forward() {
    this.increasedate(1);
  }

  increasedate(days: number) {
    this.selecteddate = new Date(this.selecteddate.getTime() + (days * 24 * 60 * 60 * 1000));
  }


}
