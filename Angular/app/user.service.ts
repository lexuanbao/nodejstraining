import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { Observable, of, throwError } from 'rxjs';
import { User } from './user';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userURL = 'http://localhost:5000';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.userURL + '/users');
  }

  updateUser(user: User): Observable<any>{
    return this.http.put(this.userURL + '/users', user)
  }

  deleteUser(id: number){
    return this.http.delete(this.userURL + `/users/${id}`)
  }

  insertUser(user: User){
    return this.http.post(this.userURL + '/users', user).pipe(
      tap(),
      catchError(this.handleError<any>('insert')));
  }

  getUserById(id: number): Observable<User>{
    return this.http.get<User>(this.userURL + `/users/${id}`);
  }

  // handleError(error: HttpErrorResponse) {
  //   return throwError(error);
  // }

/**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
 private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
