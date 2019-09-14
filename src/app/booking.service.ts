import { Injectable } from '@angular/core';
import { BookingRecord } from './ibookingrecord';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor() { }

  save(input: BookingRecord) {
    console.log(`save called, input:${JSON.stringify(input)}`);
  }

}
