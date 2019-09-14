import { Injectable } from '@angular/core';
import { User } from './iuser';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  getUser(): User {
    return { id: 'user1', name: 'User1', email: 'user1@fff.hu' };
  }
}
