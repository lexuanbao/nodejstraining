import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userURL = 'http://localhost:5000';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getUser(): Observable<User[]>{
    return this.http.get<User[]>(this.userURL + '/users');
  }

  updateUser(user: User){
    return this.http.put(this.userURL + '/users', user);
  }

  deleteUser(id: number){
    return this.http.delete(this.userURL + `/users/${id}`)
  }

  insertUser(user: User){
    return this.http.post(this.userURL + '/users', user);
  }

  getUserById(id: number){
    return this.http.get<User>(this.userURL + `/users/${id}`);
  }
}
