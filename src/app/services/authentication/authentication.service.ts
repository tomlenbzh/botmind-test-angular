import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/authentication/utils/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private baseUrl = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) {}

  login(credentials: IUser): Observable<any> {
    const url = `${this.baseUrl}/users/login`;
    return this.httpClient.post<any>(url, credentials);
  }

  signUp(credentials: IUser): Observable<any> {
    const url = `${this.baseUrl}/users`;
    return this.httpClient.post<any>(url, credentials);
  }
}
