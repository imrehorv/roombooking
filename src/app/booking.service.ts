import { Injectable } from '@angular/core';
import { BookingRecord } from './ibookingrecord';
import { Bookings } from './ibookings';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  records: BookingRecord[] = [];

  constructor() { }

  save(input: BookingRecord) {
    console.log(`save called, input:${JSON.stringify(input)}`);
    let rec = this.records.find(
      arec => {
        return input.startDate === arec.startDate && input.roomid === arec.roomid;
      }
    );
    if (rec) {
      console.log(`found:${JSON.stringify(rec)}, updating or deleting`);
      if (input.userid==null)
      {
        console.log("delete");
        this.records=this.records.filter(
          (rec2)=>{
            return !(input.startDate === rec2.startDate && input.roomid === rec2.roomid);
          }
        );
      }
      else
      {
        console.log("update");
        rec.userid=input.userid;
        rec.username=input.username;
      }
    }
    else {
      console.log(`not found, inserting`);
      this.records.push(input);
    }
    console.log(`records after save:${JSON.stringify(this.records)}`);
  }

  load(date: Date): BookingRecord[] {
    return this.records.filter(
      (record) => {
        console.log(`${record.startDate.getUTCDay()} >>> ${date.getUTCDay()}`);
        return (record.startDate.getFullYear() === date.getFullYear() 
                && record.startDate.getMonth() === date.getMonth()
                && record.startDate.getDate() === date.getDate());
      }
    );
  }

}
