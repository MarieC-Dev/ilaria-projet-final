import {CanActivateChildFn, provideRouter, Router} from '@angular/router';
import {inject} from '@angular/core';
import {IsLoggedInService} from '../services/isLoggedIn.service';
import {tap, map} from "rxjs";

export const accountGuardGuard: CanActivateChildFn = (
  childRoute,
  state
) => {
  const isLoggedIn: IsLoggedInService = inject(IsLoggedInService);
  const router = inject(Router);
  let childRouteId = Number(childRoute.paramMap.get('id'));

  return isLoggedIn.isLoggedIn().pipe(
    tap(result => {
      if(childRouteId !== 0 && childRouteId !== null) {
        if(!result.isAuthenticated || result.user.id !== childRouteId) {
          router.navigate(['/unauthorized']);
        }
      }
    }),
    map(result => result.isAuthenticated)
  )
};
