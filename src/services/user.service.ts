import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/common/user';
import { API_PATH } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private httpClient: HttpClient) { }

  getUsers():Observable<User[]>{
    return this.httpClient.get<User[]>(`${API_PATH}/users`)
  }
}
