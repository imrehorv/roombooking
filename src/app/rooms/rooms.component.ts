import { Component, OnInit } from '@angular/core';
import { RoomService } from '../room.service';
import { Room } from '../iroom';

@Component({
  selector: 'rb-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  constructor(private roomService : RoomService) { }

  rooms:Room[];

  ngOnInit() {
    this.roomService.list().subscribe(
      data => { this.rooms = data }
    );
  }

  new() {
    location.replace('roomdetail')
  }

}
