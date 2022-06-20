import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '@auth/utils/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.baseUrl;

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
