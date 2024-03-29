import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalstorageService } from './localstorage.service';
import { environment } from '@env/environment';
import { Router } from '@angular/router';

@Injectable()
export class JwtInfoUser implements HttpInterceptor {
    constructor(private localstorage: LocalstorageService, private router: Router) {}

    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
        // Récupérer l'ID
        const idUser = this.localstorage.getUserCurrent();

        // Aller chercher l'addresse de base de l'API dans l'environnement
        // Intercepte toutes les requêtes qui commencent par 'http://localhost:3000/api/v1/users/exist'
        const isInfoUser = request.url.startsWith(environment.infoUser);

        if (!idUser && isInfoUser) {
            switch (this.router.url) {
                case '/compte':
                    this.router.navigate(['login'], { queryParams: { compte: true } });
                    break;
                case '/checkout':
                    this.router.navigate(['login'], { queryParams: { checkout: true } });
                    break;

                default:
                    this.router.navigate(['/']);
                    break;
            }
        }

        return next.handle(request);
    }
}
