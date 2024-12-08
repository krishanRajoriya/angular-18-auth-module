import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isBrowser = typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  const token = isBrowser ? localStorage.getItem('authToken') : null;

  const publicRoutes = ['/login', '/register'];

  const isPublicRoute = publicRoutes.includes(state.url);

  if (token) {
    if (isPublicRoute) {
      router.navigate(['/home']); 
      return false;
    }
    return true; 
  } else {
    if (!isPublicRoute) {
      router.navigate(['/login']); 
      return false;
    }
    return true; 
  }
};
