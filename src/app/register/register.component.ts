import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import {UserExt} from '../iuserext';
import { Router } from '@angular/router';

@Component({
  selector: 'rb-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private fb: FormBuilder, private userService: UserService,private router: Router) { }

  registerform: FormGroup;

  ngOnInit() {
    this.registerform = this.fb.group(
      {
        id: ['',Validators.required],
        name: ['',Validators.required],
        email: ['',Validators.required],
        password1: ['',Validators.required],
        password2: ['',Validators.required]
      }
    );
 }

  register() {
    console.log(`value:${JSON.stringify(this.registerform.value)}`);
    if (!this.registerform.invalid && this.passwordsmatch())
    {
      console.log(`call register`);
      this.userService.register({
        id:this.registerform.get("id").value,
        name:this.registerform.get("name").value,
        email:this.registerform.get("email").value,
        password:this.registerform.get("password1").value
      }).subscribe(
        data => this.router.navigate([''])
      );
    }
  }

  passwordsmatch() {
    return this.registerform.get("password1").value===this.registerform.get("password2").value;
  }

}
