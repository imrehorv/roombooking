import { Component, OnInit, Input, SimpleChanges, SimpleChange, OnChanges } from '@angular/core';
import { Row } from '../irow';
import { Bookings } from '../ibookings';
import { UserService } from '../user.service';
import { BookingRecord } from '../ibookingrecord';
import { BookingService } from '../booking.service';
import { Room } from '../iroom';
import { User } from '../iuser';

@Component({
  selector: 'rb-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent implements OnChanges, OnInit {

  @Input()
  selecteddate: Date;
  rooms: Room[];
  bookings: Bookings;


  constructor(private userService:UserService,private bookingService:BookingService) { }

  ngOnInit() {
    console.log(`ngoninit called selecteddate:${this.selecteddate}`)
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('got selecteddate: ', changes.selecteddate.currentValue);
    this.initModel(changes.selecteddate.currentValue);
  }

  onCellClicked(rowindex:number,columnindex:number) {
    console.log(`rowclicked ${rowindex} ${columnindex}`);
    let row:Row=this.bookings.rows[rowindex];
    let user:User=row.bookedbyuser[columnindex];
    if (!row.bookedbyuser[columnindex]) { //booking
      user=this.userService.getUser();
    }
    else if (user.id===this.userService.getUser().id) { //own booking can be cancelled
      user=null;
    }
    row.bookedbyuser[columnindex]=user;
    this.bookingService.save({startDate:row.startdate,endDate:row.startdate,userid:user==null?null:user.id,roomid:this.rooms[columnindex].id});
  }

  initModel(currentValue: Date) {
    this.rooms = [{id:'room1',name:'Room1'},{id:'room2',name:'Room2'},{id:'room3',name:'Room3'}];
    let date = this.getDate(this.selecteddate);
    let version=0;
    let rows:Row[]=[];
    this.bookings = {version,rows};

    date.setHours(7);
    console.log(`date:${date}`);
    for (let i = 0; i < 10; i++) {
      let startdate: Date = date;
      let enddate: Date = this.getDatePlus30Min(date);
      let bookedbyuser:User[] = [null, null, null];
      let row: Row = { startdate, enddate, bookedbyuser };
      date = this.getDatePlus30Min(date);
      console.log(`date:${date} row:${JSON.stringify(row)}`);
      rows.push(row);
    }
  }
  getDatePlus30Min(date: Date): Date {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let result = this.getDate(date);
    result.setHours(hours);
    result.setMinutes(minutes);
    result.setTime(result.getTime() + (30 * 60 * 1000));
    return result;
  }

  getDate(date: Date): Date {
    let result = new Date();
    result.setDate(date.getDate());
    result.setHours(0);
    result.setMinutes(0);
    result.setSeconds(0);
    result.setMinutes(0);
    return result;
  }


}
