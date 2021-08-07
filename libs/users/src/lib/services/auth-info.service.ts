import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LocalstorageService } from './localstorage.service';

@Injectable({
    providedIn: 'root'
})
export class AuthInfo implements CanActivate {
    constructor(private router: Router, private localstorageToken: LocalstorageService) {}

    /**
     * methode qui permet de vérifier si l'utilisateur existe
     * @returns boolean
     */
    canActivate(): boolean {
        const token = this.localstorageToken.getToken();
        if (token && typeof token !== 'undefined') {
            // Décoder le token si existe
            const tokenDecode = JSON.parse(atob(token.split('.')[1]));
            if (tokenDecode.isAdmin && !this._tokenExpired(tokenDecode.exp)) {
                return true;
            }
        }

        this.router.navigate(['/compte']);
        return false;
    }

    /**
     * Methode qui permte de vérifier si la date d'expiration du token est toujours valide
     * @param expiration la date d'expiration du token (timestamp)
     * @returns boolean
     */
    private _tokenExpired(expiration: number): boolean {
        return Math.floor(new Date().getTime() / 1000) >= expiration;
    }
}
