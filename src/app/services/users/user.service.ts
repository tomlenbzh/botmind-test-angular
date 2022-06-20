import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '@auth/utils/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) {}

  fetchUser(id: number): Observable<IUser> {
    const url = `${this.baseUrl}/users/${id}`;
    return this.httpClient.get<IUser>(url);
  }

  updateUser(id: number, user: IUser): Observable<IUser> {
    const url = `${this.baseUrl}/users/${id}`;
    return this.httpClient.put<IUser>(url, user);
  }

  deletUser(id: number): Observable<IUser> {
    const url = `${this.baseUrl}/users/${id}`;
    return this.httpClient.delete<IUser>(url);
  }
}
