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
// Guardia para proteger las rutas
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
    //Validamos si el token ha expirado
    if (this.authSvc.hasAuth()) {
      const EXP_DATA: number = this.authSvc.getAuth()!.exp;
      const EXP_DATE = new Date(EXP_DATA * 1000);
      if (EXP_DATE < new Date()) this.authSvc.removeAuth();
    }
    // Obtenemos el tipo de seguridad que se le va aplicar a la ruta
    // 20: Solo usuarios autenticados
    // 25: Sin seguridad
    // 30: Solo usuarios no autenticados
    const IS_PROTECT: number = route.data['isProtect'];
    // Variable para saber si se puede pasar
    let pass: boolean = false;

    if (IS_PROTECT != 25) {
      // Verificamos si el usuario esta autenticado
      if (this.authSvc.hasAuth()) {
        // Verificamos si la ruta no esta limitada por roles
        if (route.data['roles'] == undefined) pass = IS_PROTECT == 20;
        else {
          // Verificamos si el usuario tiene los roles necesarios para pasar
          const roles = route.data['roles'] as string[];
          const userRoles = this.authSvc.getAuth()!.roles;
          pass = roles.some((r) => userRoles.includes(r));
          pass = pass && IS_PROTECT == 20;
        }
      } else {
        // Verificamos si la ruta es para usuarios no autenticados
        pass = IS_PROTECT == 30;
      }
    }
    // Si no se puede pasar redirigimos
    if (!pass) {
      // Redirigimos a la pagina de login
      if (IS_PROTECT == 20) this.router.navigate(['login']);
      // Redirigimos a la pagina de inicio
      else this.router.navigate(['/notice/home']);
    }
    return pass;
  }
}
