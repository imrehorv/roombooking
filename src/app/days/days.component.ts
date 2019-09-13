import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rb-days',
  templateUrl: './days.component.html',
  styleUrls: ['./days.component.css']
})
export class DaysComponent implements OnInit {

  selecteddate:Date

  constructor() { }

  ngOnInit() {
    this.selecteddate=new Date();
  }


}
