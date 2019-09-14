import { Injectable } from '@angular/core';
import { Room } from './iroom';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor() { }

  list():Room[] {
    return [{ id: 'room1', name: 'Room1' }, { id: 'room2', name: 'Room2' }, { id: 'room3', name: 'Room3' }];
  }
}
