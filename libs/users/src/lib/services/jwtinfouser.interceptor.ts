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
        const isAPIUrl = request.url.startsWith(environment.infoUser);
        console.log('request url', isAPIUrl);

        if (!idUser && isAPIUrl) {
            this.router.navigate(['login']);
        }

        return next.handle(request);
    }
}
