import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/authentication/utils/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) {}

  fetchProfile(id: number): Observable<IUser> {
    const url = `${this.baseUrl}/users/${id}`;
    return this.httpClient.get<IUser>(url);
  }

  updateProfile(id: number, user: IUser): Observable<IUser> {
    const url = `${this.baseUrl}/users/${id}`;
    return this.httpClient.put<IUser>(url, user);
  }

  deletProfile(id: number): Observable<IUser> {
    const url = `${this.baseUrl}/users/${id}`;
    return this.httpClient.delete<IUser>(url);
  }
}
