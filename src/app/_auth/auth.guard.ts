// import { Injectable } from '@angular/core';
// import {
//   CanActivate,
//   ActivatedRouteSnapshot,
//   RouterStateSnapshot,
//   UrlTree,
//   Router,
// } from '@angular/router';
// import { Observable } from 'rxjs';
// import { UserAuthService } from '../_services/user-auth.service';
// import { UserService } from '../_services/user.service';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthGuard implements CanActivate {
//   constructor(
//     private userAuthService: UserAuthService,
//     private router: Router,
//     private userService: UserService
//   ) {}

//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ):
//     | Observable<boolean | UrlTree>
//     | Promise<boolean | UrlTree>
//     | boolean
//     | UrlTree {
//     if (this.userAuthService.getToken() !== null) {
//       const role = route.data['roles'] as Array<string>;
//       console.log(`Role from AuthGuard is `);
//       if (role) {
//         const match = this.userService.roleMatch(role);

//         if (match) {
//           return true;
//         } else {
//           this.router.navigate(['/forbidden']);
//           return false;
//         }
//       }
//     }

//     this.router.navigate(['/login']);
//     return false;
//   }
// }
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserAuthService } from '../_services/user-auth.service';
import { UserService } from '../_services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private userAuthService: UserAuthService,
    private router: Router,
    private userService: UserService
  ) {}

  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot
  // ):
  //   | Observable<boolean | UrlTree>
  //   | Promise<boolean | UrlTree>
  //   | boolean
  //   | UrlTree {
  //   if (this.userAuthService.getToken() !== null) {
  //     const role = route.data['roles'] as Array<string>;
  //     console.log(`Role from AuthGuard is `);
  //     if (role) {
  //       const match = this.userService.roleMatch(role);

  //       if (match) {
  //         return true;
  //       } else {
  //         this.router.navigate(['/forbidden']);
  //         return false;
  //       }
  //     }
  //   }

  //   this.router.navigate(['/login']);
  //   return false;
  // }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('Token:', this.userAuthService.getToken()); // Check if token is present
    if (this.userAuthService.getToken()) {
        const requiredRoles = route.data['roles'] as Array<string>;
        console.log('Required roles for route:', requiredRoles);

        const userRoles = this.userAuthService.getRoles();
        console.log('User roles:', userRoles);

        const match = this.userService.roleMatch(requiredRoles);
        console.log('Role match result:', match);

        if (match) {
            return true;
        } else {
            this.router.navigate(['/forbidden']);
            return false;
        }
    }

    this.router.navigate(['/login']);
    return false;
}
}
