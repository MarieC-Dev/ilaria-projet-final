import {CanActivateChildFn, Router} from '@angular/router';
import {IsLoggedInService} from '../services/isLoggedIn.service';
import {inject} from '@angular/core';
import {map, tap} from 'rxjs';

export const adminGuard: CanActivateChildFn = (
  childRoute,
  state
) => {
  const isLoggedIn: IsLoggedInService = inject(IsLoggedInService);
  const router = inject(Router);
  let childRouteId = Number(childRoute.paramMap.get('id'));

  return isLoggedIn.isLoggedIn().pipe(
    tap(result => {
      if(childRouteId !== 0 && childRouteId !== null) {
        if(!result.isAuthenticated || result.user.roleId !== 1 || result.user.id !== childRouteId) {
          router.navigate(['/unauthorized']);
        }
      }
    }),
    map(result => result.isAuthenticated && result.user.roleId === 1),
  )
};
