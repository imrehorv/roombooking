import { Injectable } from '@angular/core';
import { User } from './iuser';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { UserExt } from './iuserext';

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

  loadUser(id:string): Observable<User> {
    return this.http.get<User>(`${environment.baseUrl}/api/user/${id}`);
  }

  save(user:User): Observable<User>  {
    return this.http.post<User>(`${environment.baseUrl}/api/user/`,user);
  }

  delete(user:User): Observable<void>  {
    return this.http.delete<void>(`${environment.baseUrl}/api/user/${user.id}`);
  }

  register(user:UserExt): Observable<User> {
    return this.http.post<User>(`${environment.baseUrl}/api/user/register`,user);
  }
}
