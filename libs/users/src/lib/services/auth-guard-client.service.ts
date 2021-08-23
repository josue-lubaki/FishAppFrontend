import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LocalstorageService } from './localstorage.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardClient implements CanActivate {
    constructor(private router: Router, private localstorageToken: LocalstorageService) {}

    /**
     * methode qui permet de vérifier la Véracité du token
     *  - Si l'utilisateur est un Administrateur
     *  - Si la date d'expiration du token n'est pas encore atteinte
     * @method JSON.Parse() transformer en object JSON
     * @returns boolean
     */
    canActivate(): boolean {
        // Vérifier si un token valide est disponible
        const token = this.localstorageToken.getToken();
        if (token && typeof token !== 'undefined') {
            // Décoder le token si existe
            const tokenDecode = JSON.parse(atob(token.split('.')[1]));
            if (!this._tokenExpired(tokenDecode.exp)) {
                return true;
            }
        }

        this.router.navigate(['/login']);
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
