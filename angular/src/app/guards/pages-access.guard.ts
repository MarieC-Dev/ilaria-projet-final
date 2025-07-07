import {CanActivateFn, Router} from '@angular/router';
import {map, tap} from 'rxjs';
import {IsLoggedInService} from '../services/isLoggedIn.service';
import {inject} from '@angular/core';

export const pagesAccessGuard: CanActivateFn = (route, state) => {
  const isLoggedIn: IsLoggedInService = inject(IsLoggedInService);
  const router = inject(Router);

  return isLoggedIn.isLoggedIn().pipe(
    tap(result => {
      if(!result.isAuthenticated) {
        router.navigate(['/unauthorized']);
      }
    }),
    map(result => result.isAuthenticated)
  )
};
