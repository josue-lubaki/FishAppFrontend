import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { LocalstorageService } from './localstorage.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    apiURLUsers = environment.apiURL + 'users';

    constructor(
        private http: HttpClient,
        private localstorage: LocalstorageService,
        private router: Router
    ) {}

    /**
     * methode qui permet à l'Utilisateur de se connecter via son email et password
     * @param email email de l'utilisateur
     * @param password passeword de l'utilisateur
     * @returns Observable<User>
     */
    login(email: string, password: string): Observable<User> {
        return this.http.post<User>(`${this.apiURLUsers}/login`, { email, password });
    }

    /**
     * Methode qui permet d'enregistrer un nouvel Utilisateur
     * @param user l'Utilisateur à enregistrer
     * @returns void
     */
    registerUser(user: User): Observable<User> {
        return this.http.post<User>(`${this.apiURLUsers}/register`, user);
    }

    /**
     * Methode qui permet de déconnecter un Utilisateur, en supprimant également son token et ID
     * @return void
     */
    logout() {
        this.localstorage.removeToken();
        this.localstorage.removeUserCurrent();
    }
}
