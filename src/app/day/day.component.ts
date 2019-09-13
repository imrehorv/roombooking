import { Component, OnInit, Input, SimpleChanges, SimpleChange, OnChanges } from '@angular/core';
import { Row } from '../irow';

@Component({
  selector: 'rb-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent implements OnChanges, OnInit {

  @Input()
  selecteddate: Date;
  rooms: String[];
  rows: Row[];

  constructor() { }

  ngOnInit() {
    console.log(`ngoninit called selecteddate:${this.selecteddate}`)
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('got selecteddate: ', changes.selecteddate.currentValue);
    this.initModel(changes.selecteddate.currentValue);
  }

  initModel(currentValue: Date) {
    this.rooms = ['Room1', 'Room2', 'Room3'];
    let date=this.getDate(this.selecteddate);
    this.rows=[];
    
    date.setHours(7);
    console.log(`date:${date}`);
    for (let i=0;i<10;i++)
    {
      let startdate:Date=date;
      let enddate:Date=this.getDatePlus30Min(date);
      let rooms=['','',''];
      let row:Row={startdate,enddate,rooms};
      date=this.getDatePlus30Min(date);
      console.log(`date:${date} row:${JSON.stringify(row)}`);
      this.rows.push(row);
    }
  }
  getDatePlus30Min(date: Date): Date {
    let hours=date.getHours();
    let minutes=date.getMinutes();
    let result=this.getDate(date);
    result.setHours(hours);
    result.setMinutes(minutes);
    result.setTime(result.getTime() + (30 * 60 * 1000));
    return result;
  }

  getDate(date: Date): Date {
    let result=new Date();
    result.setDate(date.getDate());
    result.setHours(0);
    result.setMinutes(0);
    result.setSeconds(0);
    result.setMinutes(0);
    return result;
  }


}
