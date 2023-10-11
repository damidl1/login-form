import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';

export const authGuard: CanActivateFn = (route, state) => {
  const storage = inject(LocalStorageService);
  const router = inject(Router);
  const isUserLogged = storage.checkLogin();

  if (isUserLogged) {
    return true;
  } else {
    router.navigateByUrl('/login');
    return false;
  }

};
