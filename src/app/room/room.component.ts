import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RoomService } from '../room.service';

@Component({
  selector: 'rb-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  constructor(private roomService: RoomService, private route: ActivatedRoute,private router:Router, private fb: FormBuilder) { }

  newroom = false;
  roomform: FormGroup;
  roomid:string;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(`id from route:${id}`);
    if (id == null) {
      this.newroom = true;
    } else {
      this.roomService.loadRoom(id).subscribe(
        data => {
          this.roomform.patchValue(data);
          this.roomid=data.id;
        }
      );
    }
    this.roomform = this.fb.group(
      {
        id: [{ value: '', disabled: !this.newroom }],
        name: [''],
      }
    );

  }

  save() {
    let room=this.roomform.value;
    if (!this.newroom)
    {
      room.id=this.roomid;
    }
    this.roomService.save(room).subscribe(
      data => this.router.navigate(['rooms'])
    );
  }

  delete() {
    this.roomService.delete(this.roomform.value).subscribe(
      () => this.router.navigate(['rooms'])
    );
  }

}
