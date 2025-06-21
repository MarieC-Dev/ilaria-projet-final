import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountAccessService {
  private API_URL: string = 'http://localhost:3000';
  private authenticated = false;

  constructor(private http: HttpClient) { }

  isLoggedIn(): Observable<any> {
    return this.http.get(`${this.API_URL}/login/user`, { responseType: "json", withCredentials: true });
  }
}
