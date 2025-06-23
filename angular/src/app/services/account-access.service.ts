import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, map, Observable, take, tap} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountAccessService {
  private API_URL: string = 'http://localhost:3000';
  private loginStatus = new BehaviorSubject<boolean>(false);
  isConnected = this.loginStatus.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  isLoggedIn(): Observable<any> {
    return this.http.get(`${this.API_URL}/login/user`, { responseType: "json", withCredentials: true });
  }
}
