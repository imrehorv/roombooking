import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../iuser';

@Component({
  selector: 'rb-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private userService: UserService) { }

  users: User[];

  ngOnInit() {
    this.userService.list().subscribe(
      data => { this.users = data }
    );
  }

  new() {
    location.replace('userdetail')
  }

}
