import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {TokenService} from "@services/token.service";
import {isValidDate} from "rxjs/internal/util/isDate";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private tokenService: TokenService,
    private router: Router
  ) {  }
  canActivate(): boolean {
    const isValidToken = this.tokenService.isValidRefreshToken();
    if (!isValidToken) {
      this.router.navigate(['/login']);
      return false;
    }
   return true;
  }

}
