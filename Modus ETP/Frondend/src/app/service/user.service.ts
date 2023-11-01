import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { UserModel } from '../Model/UserModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private http: HttpClient) { }

  apiUrl:string = "http://localhost:5000"

  userCreate(userData: UserModel): Observable<UserModel>{
    return this.http.post<UserModel>(`${this.apiUrl}/userCreate`, userData)
  }

  userLoad(): Observable<UserModel[]>{
    return this.http.get<UserModel[]>(`${this.apiUrl}/userLoad`)
  }

  deleteUser(email:string): Observable<UserModel[]>{    
    return this.http.post<UserModel[]>(`${this.apiUrl}/deleteUser`, {email})
  }

  getUser(email:string|null): Observable<UserModel>{
    return this.http.get<UserModel>(`${this.apiUrl}/getUser?email=${email}`)
  }

  updateUser(email:string|null,userData:UserModel): Observable<string>{
    return this.http.post<string>(`${this.apiUrl}/updateUser`, {email,userData})
  }
}
