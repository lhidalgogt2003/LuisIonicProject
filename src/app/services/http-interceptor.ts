/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { mergeMap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { IonStorageService } from './storage.service';

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private storage: IonStorageService,
        public toastController: ToastController,
        private router: Router
    ) { }
    intercept(request: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {

        if (this.storage.getKeyAsObservable('token')) {
            return this.storage.getKeyAsObservable('token').pipe(
                mergeMap(token => {
                    const clonedReq = this.addToken(request, token);
                    return next.handle(clonedReq);
                }),
                catchError((response: HttpErrorResponse) => throwError(response))
            );

        }
    }
    private addToken(request: HttpRequest<any>, token: any) {
        if (token) {
            // console.log(token);
            const clone: HttpRequest<any> = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
            return clone;
        }
        if (!token) {
            this.router.navigateByUrl('login');
        }
        return request;
    }
}





// /* eslint-disable @typescript-eslint/naming-convention */
// /* eslint-disable @typescript-eslint/member-ordering */
// import {
//     HttpErrorResponse,
//     HttpEvent,
//     HttpHandler,
//     HttpInterceptor,
//     HttpRequest
// } from '@angular/common/http';
// import { Inject, Injectable, Injector } from '@angular/core';
// import { Router } from '@angular/router';
// import { Observable, throwError } from 'rxjs';
// import { catchError, tap } from 'rxjs/operators';
// import { environment } from 'src/environments/environment';
// import { AuthService } from './auth.service';
// // import { AuthService } from '../services/auth/auth.service';
// // import { ConfigServiceInjector } from '../services/config/config.service';
// // import { TokenService } from '../services/token/token.service';
// // import { IErrorRes } from '../types/responses/AuthError';
// // import { StrapiAuthConfig } from '../types/StrapiAuthConfig';
// import { IonStorageService } from './storage.serive';

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {

//     private AUTH_HEADER = 'Authorization';

//     private token: any;

//     constructor(
//         private injector: Injector,
//         private router: Router,
//         private ionStorage: IonStorageService,
//         private authService: AuthService
//     ) { }



//     intercept(
//         req: HttpRequest<any>,
//         next: HttpHandler
//     ): Observable<HttpEvent<any>> {

//         this.ionStorage.getKeyAsObservable('token')
//             .subscribe((token) => {
//                 this.token = token;
//             });

//         if (!req.headers.has('Content-Type')) {
//             req = req.clone({
//                 headers: req.headers.set('Content-Type', 'application/json')
//             });
//         }

//         req = this.addAuthenticationToken(req);

//         return next.handle(req).pipe(
//             catchError((error) => {
//                 const authError = error.error;

//                 switch (error.status) {
//                     // Intercept unauthorized request
//                     case 401:
//                         // Check if error response is caused by invalid token
//                         if (authError.error.name === 'UnauthorizedError') {
//                             return this.authService.logout().subscribe(() => {
//                                 this.router.navigateByUrl('/login');
//                             });
//                         } else {
//                             return throwError(() => error);
//                         }

//                     case 403:
//                         return throwError(() => error);

//                     case 404:
//                         return throwError(() => error);

//                     default:
//                         return throwError(() => error);
//                 }
//             })
//         ) as Observable<HttpEvent<any>>;



//     }

//     private addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {
//         // If we do not have a token yet then we should not set the header.
//         // Here we could first retrieve the token from where we store it.
//         if (!this.token) {
//             return request;
//         }
//         // If you are calling an outside domain then do not add the token.
//         if (!request.url.match(environment.apiUrl)) {
//             return request;
//         }

//         return request.clone({
//             headers: request.headers.set(this.AUTH_HEADER, 'Bearer ' + this.token)
//         });
//     }
// }

