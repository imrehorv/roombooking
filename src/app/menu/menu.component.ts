import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rb-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor() { }

  selected: string;

  ngOnInit() {
    this.selected= 'bookings';
  }

}
