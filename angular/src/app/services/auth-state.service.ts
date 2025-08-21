import {Injectable, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';
import {IsLoggedInService} from './isLoggedIn.service';

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {
  private loggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn = this.loggedIn$.asObservable();

  constructor(
    private router: Router,
    private isLoggedInService: IsLoggedInService
  ) {
    this.isLoggedInService.isLoggedIn().subscribe((res) => {
      if(res.isAuthenticated) {
        this.loggedIn$.next(true);
      } else {
        this.loggedIn$.next(false);
      }
    })
  }

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
