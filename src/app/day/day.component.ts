import { Component, OnInit, Input, SimpleChanges, SimpleChange, OnChanges } from '@angular/core';
import { Row } from '../irow';
import { Bookings } from '../ibookings';
import { UserService } from '../user.service';
import { BookingRecord } from '../ibookingrecord';
import { BookingService } from '../booking.service';
import { Room } from '../iroom';
import { User } from '../iuser';
import { RoomService } from '../room.service';

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


  constructor(private userService: UserService, private bookingService: BookingService, private roomService: RoomService) { }

  ngOnInit() {
    console.log(`ngoninit called selecteddate:${this.selecteddate}`)
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('got selecteddate: ', changes.selecteddate.currentValue);
    this.initModel(changes.selecteddate.currentValue);
  }

  onCellClicked(rowindex: number, columnindex: number) {
    console.log(`rowclicked ${rowindex} ${columnindex}`);
    let row: Row = this.bookings.rows[rowindex];
    let user: User = row.bookedbyuser[columnindex];
    if (!row.bookedbyuser[columnindex]) { //booking
      user = this.userService.getUser();
    }
    else if (user.id === this.userService.getUser().id) { //own booking can be cancelled
      user = null;
    }
    row.bookedbyuser[columnindex] = user;
    this.bookingService.save({ startDate: row.startdate, endDate: row.startdate, userid: user == null ? null : user.id, username: user == null ? null : user.name, roomid: this.rooms[columnindex].id });
  }

  initModel(currentValue: Date) {
    this.rooms = this.roomService.list();
    this.initBookingModel();
    this.updateBookingModelFromBackend();
  }

  initBookingModel() {
    let date = this.getDate(this.selecteddate);
    let version = 0;
    let rows: Row[] = [];
    this.bookings = { version, rows };

    date.setHours(7);
    console.log(`date:${date}`);
    for (let i = 0; i < 10; i++) {
      let startdate: Date = date;
      let enddate: Date = this.getDatePlus30Min(date);
      let bookedbyuser: User[] = [];
      this.rooms.forEach(
        (data) => { bookedbyuser.push(null) }
      );
      let row: Row = { startdate, enddate, bookedbyuser };
      date = this.getDatePlus30Min(date);
      //console.log(`date:${date} row:${JSON.stringify(row)}`);
      rows.push(row);
    }
  }

  updateBookingModelFromBackend() {
    let records: BookingRecord[] = this.bookingService.load(this.getDate(this.selecteddate));
    console.log(`records after load:${JSON.stringify(records)}`);
    records.forEach(
      (record) => {
        this.bookings.rows.forEach(
          (row) => {
            //console.log(`${record.startDate}  *** ${row.startdate} ==? ${record.startDate.getMinutes()===row.startdate.getMinutes()}`);
            if (record.startDate.getHours() === row.startdate.getHours() && record.startDate.getMinutes() === row.startdate.getMinutes()) {
              for (let i = 0; i < this.rooms.length; i++) {
                if (this.rooms[i].id === record.roomid) {
                  row.bookedbyuser[i] = { id: record.userid, name: record.username };
                }
              }
            }
          }
        )
      }
    );
    //console.log(`updated model:${JSON.stringify(this.bookings)}`);
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

  isCellEmpty(rowindex: number, columnindex: number): boolean {
    let user:User=this.bookings.rows[rowindex].bookedbyuser[columnindex];
    return (user==null || user.id==null);
  }

}
