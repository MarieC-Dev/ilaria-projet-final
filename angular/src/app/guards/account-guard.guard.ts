import {CanActivateChildFn, provideRouter, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AccountAccessService} from '../services/account-access.service';
import {tap, map} from "rxjs";

export const accountGuardGuard: CanActivateChildFn = (
  childRoute,
  state
) => {
  const accountAccess: AccountAccessService = inject(AccountAccessService);
  let authenticated: boolean = false;
  const router = inject(Router);

  return accountAccess.isLoggedIn().pipe(
    tap(result => {
      if(!result.isAuthenticated) {
        router.navigate(['/unauthorized']);
      }
    }),
    map(result => result.isAuthenticated)
  )
};
