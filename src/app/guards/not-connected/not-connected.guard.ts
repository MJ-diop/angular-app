import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationsService } from 'src/app/services/authentications/authentications.service';

@Injectable({
  providedIn: 'root',
})
export class NotConnectedGuard implements CanActivate {
  constructor(private authService: AuthenticationsService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authService.currentUserValue;
    if (!currentUser) {
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/'], {
      queryParams: { returnUrl: state.url },
    });
    return false;
  }
}
