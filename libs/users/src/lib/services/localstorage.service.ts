import { Injectable } from '@angular/core';

const TOKEN = 'jwt-token-fishApp';
const IDUSER = 'id-user-current-fishApp';

@Injectable({
    providedIn: 'root'
})
export class LocalstorageService {
    constructor() {}

    /**
     * methode qui permet de sauvergarder le token de l'utilisateur authentifié
     * @param data le token de l'Utilisateur reçu lors d'une success connexion
     * @return void
     */
    setToken(data: any) {
        localStorage.setItem(TOKEN, data);
    }

    /**
     * Methode qui permet de récupérer le token de l'utilsateur current
     * @returns string
     */
    getToken() {
        return localStorage.getItem(TOKEN);
    }

    /**
     * Methode qui permet de récupèrer l'Id de l'utilisateur courant
     */
    getUserCurrent() {
        return localStorage.getItem(IDUSER);
    }

    setUserCurrent(userId: any) {
        localStorage.setItem(IDUSER, userId);
    }

    /**
     * Methode qui permet de supprimer le token de l'utilisateur current
     */
    removeToken() {
        localStorage.removeItem(TOKEN);
    }

    /**
     * Methode qui permet de supprimer l'ID de l'utilisateur current
     */
    removeUserCurrent() {
        localStorage.removeItem(IDUSER);
    }

    /**
     * Methode qui permet de supprimer tous les tokens dans le localStorage de l'utilisateur
     */
    clearToken() {
        localStorage.clear();
    }
}
