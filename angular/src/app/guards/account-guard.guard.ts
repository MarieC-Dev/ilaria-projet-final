import {CanActivateChildFn, provideRouter, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AccountAccessService} from '../services/account-access.service';

export const accountGuardGuard: CanActivateChildFn = (
  childRoute,
  state
) => {
  const accountAccess: AccountAccessService = inject(AccountAccessService);
  let authenticated: boolean = false;
  const router = inject(Router);

  accountAccess.isLoggedIn().subscribe((result) => {
    if(result.isAuthenticated) {
      authenticated = true;
    } else {
      authenticated = false;
    }
  })

  if(!authenticated) router.navigate(['/unauthorized'])

  return authenticated;
};
