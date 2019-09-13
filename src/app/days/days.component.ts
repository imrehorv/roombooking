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

  increasedate(amount:number)
  {
    let tmp=new Date();
    tmp.setDate(this.selecteddate.getDate() + amount);
    this.selecteddate=tmp;
  }


}
