import { Injectable } from '@angular/core';
import { Room } from './iroom';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private http: HttpClient) { }

  list():Observable<Room[]> {
    console.log(`list called, environment.production:${environment.production}, environment.inmemory:${environment.inmemory}`);
    if (environment.inmemory)
    {
      return new Observable(
        (observer)=>{
          const result=[{ id: 'room1', name: 'Room1' }, { id: 'room2', name: 'Room2' }, { id: 'room3', name: 'Room3' }];
          observer.next(result);
          observer.complete();
        }
      );
    }
    else
    {
      console.log('call http');
      return this.http.get<Room[]>(`${environment.baseUrl}/api/rooms`);
    }
  }
}
