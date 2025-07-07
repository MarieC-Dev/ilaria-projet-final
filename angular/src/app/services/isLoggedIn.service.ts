import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, map, Observable, take, tap} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class IsLoggedInService {
  private API_URL: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  isLoggedIn(): Observable<any> {
    return this.http.get(`${this.API_URL}/login/user`,
      { responseType: "json", withCredentials: true });
  }
}
