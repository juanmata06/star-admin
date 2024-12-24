import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router";
import { Observable, map, tap } from "rxjs";
import { AuthService } from "../../logic/services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private _router: Router,
    private _authService: AuthService
  ) { }

  public canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this._authService.isAuth().pipe(
      map(isAuthenticated => {
        const isAuthRoute = route.routeConfig?.path?.startsWith('auth');
        console.log(isAuthenticated, isAuthRoute);
        
        if (isAuthenticated && isAuthRoute) {
          this._router.navigate(['/']);
          return false;
        }

        if (!isAuthenticated && !isAuthRoute) {
          this._router.navigate(['/auth/login']);
          return false;
        }
        return true;
      })
    );
  }
}