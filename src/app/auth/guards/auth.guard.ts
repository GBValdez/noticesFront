import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authSvc: AuthService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const IS_PROTECT: number = route.data['isProtect'];
    let pass: boolean = false;

    if (IS_PROTECT != 25) {
      if (this.authSvc.hasAuth()) {
        if (route.data['roles'] == undefined) pass = IS_PROTECT == 20;
        else {
          const roles = route.data['roles'] as string[];
          const userRoles = this.authSvc.getAuth()!.roles;
          pass = roles.some((r) => userRoles.includes(r));
          pass = pass && IS_PROTECT == 20;
        }
      } else {
        pass = IS_PROTECT == 30;
      }
    }
    if (!pass) {
      if (IS_PROTECT == 20) this.router.navigate(['login']);
      else this.router.navigate(['home']);
    }
    return pass;
  }
}
