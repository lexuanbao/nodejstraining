import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class UserPermissionGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) { }
  permission;

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.permission = this.userService.userPermission;
      if(this.permission){
        return true;
      } else {
        this.router.navigateByUrl('/login');
        window.alert("Login to view this page");
        return false;
      }
  }
  
}
