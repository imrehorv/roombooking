import { Injectable } from '@angular/core';
import { User } from './iuser';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUser(): User {
    return { id: 'user1', name: 'User1', email: 'user1@fff.hu' };
  }

  list():Observable<User[]> {
     return this.http.get<User[]>(`${environment.baseUrl}/api/user`);
  }  
}
