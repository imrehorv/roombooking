import { Component, OnInit, Input } from '@angular/core';
import { User } from '../iuser';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'rb-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private userService: UserService, private route: ActivatedRoute, private location: Location, private fb: FormBuilder) { }

  newuser = false;
  userform: FormGroup;
  userid:string;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(`id from route:${id}`);
    if (id == null) {
      this.newuser = true;
    } else {
      this.userService.loadUser(id).subscribe(
        data => {
          this.userform.patchValue(data);
          this.userid=data.id;
        }
      );
    }
    this.userform = this.fb.group(
      {
        id: [{ value: '', disabled: !this.newuser }],
        name: [''],
        email: ['']
      }
    );

  }

  save() {
    let user=this.userform.value;
    if (!this.newuser)
    {
      user.id=this.userid;
    }
    this.userService.save(user).subscribe(
      data => location.replace('users')
    );
  }

  delete() {
    this.userService.delete(this.userform.value).subscribe(
      () => location.replace('users')
    );
  }

}
