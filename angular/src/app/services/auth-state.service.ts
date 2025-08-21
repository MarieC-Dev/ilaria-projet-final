import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {
  private loggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn = this.loggedIn$.asObservable();

  constructor(private router: Router) { }

  login(isAuth: boolean) {
    if(isAuth) {
      this.loggedIn$.next(true);
      this.router.navigate(['/']);
      return true;
    } else {
      return false;
    }
  }

  logout() {
    this.loggedIn$.next(false);
    this.router.navigate(['/connexion']);
  }

}
