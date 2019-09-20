import { Component, OnInit, Input } from '@angular/core';
import { User } from '../iuser';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'rb-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private userService : UserService,private route: ActivatedRoute,private location: Location,private fb:FormBuilder) { }

  userform=this.fb.group(
    {
      id:[''],
      name:[''],
      email:['']
    }
  );

  ngOnInit() {
    const id=this.route.snapshot.paramMap.get('id');
    console.log(`id from route:${id}`);
    this.userService.loadUser(id).subscribe(
      data=>{
        this.userform.patchValue(data);
      }
    );
  }

  save() {
    this.userService.save(this.userform.value).subscribe(
      data=>location.replace('users')
    );
  }

  delete() {
    this.userService.delete(this.userform.value).subscribe(
      ()=>location.replace('users')
    );
  }

}
