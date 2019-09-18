import { Injectable } from '@angular/core';
import { BookingRecord } from './ibookingrecord';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import {HttpClient} from '@angular/common/http';
import * as moment from 'moment';


@Injectable({
  providedIn: 'root'
})
export class BookingService {

  records: BookingRecord[] = [];

  constructor(private http: HttpClient) { }


  save(input: BookingRecord): Observable<void> {
    console.log(`save called, input:${JSON.stringify(input)}`);
    if (environment.inmemory)
    {
      return this.inmemorysave(input);
    }
    return this.http.post<void>(`${environment.baseUrl}/api/booking`,this.recordToBackend(input));
  }

  recordToBackend(input: BookingRecord) {
    const clone:any={...input};
    const dateformat='YYYY-MM-DD HH:mm';
    clone['startDate']=moment(input.startDate).format(dateformat);
    clone['endDate']=moment(input.endDate).format(dateformat);
    
    return clone;
  }

  backendToRecord(input: BookingRecord) {
    const clone:any={...input};
    const dateformat='YYYY-MM-DD HH:mm';
    clone['startDate']=moment(input.startDate, dateformat).toDate();
    clone['endDate']=moment(input.endDate, dateformat).toDate();
    
    return clone;
  }

  load(date: Date): Observable<BookingRecord[]> {
    if (environment.inmemory)
    {
      return this.inmemoryload(date);
    }
    else {
      return this.http.get<BookingRecord[]>(`${environment.baseUrl}/api/booking/${this.formatDate(date)}`).pipe(
          map(
            (data)=> {
              return data.map(
                (rec)=>this.backendToRecord(rec)
              )
            }
          )
      )
      ;
    }
  }
  formatDate(date: Date) {
    return moment(date).format('YYYY-MM-DD');
  }

  inmemorysave(input: BookingRecord): Observable<void> {
    let rec = this.records.find(
      arec => {
        return input.startDate === arec.startDate && input.roomid === arec.roomid;
      }
    );
    if (rec) {
      console.log(`found:${JSON.stringify(rec)}, updating or deleting`);
      if (input.userid == null) {
        console.log("delete");
        this.records = this.records.filter(
          (rec2) => {
            return !(input.startDate === rec2.startDate && input.roomid === rec2.roomid);
          }
        );
      }
      else {
        console.log("update");
        rec.userid = input.userid;
        rec.username = input.username;
      }
    }
    else {
      console.log(`not found, inserting`);
      this.records.push(input);
    }
    //console.log(`records after save:${JSON.stringify(this.records)}`);
    return new Observable((subscriber) => subscriber.complete);
  }

  inmemoryload(date: Date): Observable<BookingRecord[]> {
    const result=this.records.filter(
      (record) => {
        //console.log(`${record.startDate.getUTCDay()} >>> ${date.getUTCDay()}`);
        return (record.startDate.getFullYear() === date.getFullYear()
          && record.startDate.getMonth() === date.getMonth()
          && record.startDate.getDate() === date.getDate());
      }
    );
    return new Observable((subscriber)=>{
      subscriber.next(result);
      subscriber.complete();
    })
  }


}
