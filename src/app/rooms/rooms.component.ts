import { Component, OnInit } from '@angular/core';
import { RoomService } from '../room.service';
import { Room } from '../iroom';
import { Router } from '@angular/router';

@Component({
  selector: 'rb-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  constructor(private roomService: RoomService, private router: Router) { }

  rooms: Room[];

  ngOnInit() {
    this.roomService.list().subscribe(
      data => { this.rooms = data }
    );
  }

  new() {
    this.router.navigate(['roomdetail']);
  }

}
