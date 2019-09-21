import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../iuser';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'rb-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private userService: UserService,private router:Router) { }

  users: User[];

  ngOnInit() {
    this.userService.list().subscribe(
      data => { this.users = data }
    );
  }

  new() {
    this.router.navigate(['userdetail']);
  }

}
