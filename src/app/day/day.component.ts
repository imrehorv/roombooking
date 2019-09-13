import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'rb-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent implements OnInit {

  @Input()
  selecteddate: Date;

  constructor() { }

  ngOnInit() {
  }

}
