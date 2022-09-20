import { Injectable } from '@angular/core';
import {
    CanActivate,
    CanActivateChild,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    UrlTree,
    Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { IonStorageService } from './storage.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

    isLoggedIn: boolean;

    constructor(
        // private authService: AuthService,
        private ionStorage: IonStorageService,
        private router: Router
    ) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        return this.checkAuthState();
    }
    canActivateChild(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        return this.checkAuthState();
    }

    checkAuthState(): any {
        this.ionStorage.getKeyAsObservable('token').subscribe((token) => {
            this.isLoggedIn = token != null ? true : false;
            if (!this.isLoggedIn) {
                this.router.navigateByUrl('/login');
                return false;
            }

            return true;
        });

        console.log(this.isLoggedIn);

    }
}
