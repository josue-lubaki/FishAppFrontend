import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import * as countriesLib from 'i18n-iso-countries';
import { map } from 'rxjs/operators';
import { LocalstorageService } from './localstorage.service';

declare const require: (arg0: string) => countriesLib.LocaleData;

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    apiURLUsers = environment.apiURL + 'users';

    constructor(private http: HttpClient, private localstorage: LocalstorageService) {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        countriesLib.registerLocale(require('i18n-iso-countries/langs/fr.json'));
    }

    /**
     * Methode qui permet la récupération de toutes les Utilisateurs depuis le Backend
     * @returns Observable<Users[]>
     */
    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.apiURLUsers);
    }

    /**
     * Methode qui permet la récupération un Utilisateur depuis le Backend via son ID
     * @param usersId l'ID de l'Utilisateur à récupérer
     * @returns Observable<Users>
     */
    getUser(usersId: any): Observable<User> {
        return this.http.get<User>(`${this.apiURLUsers}/${usersId}`);
    }

    /**
     * Methode qui permet de créer un Utilisateur
     * @param user la Utilisateur à créer
     * @returns void
     */
    createUser(user: User): Observable<User> {
        return this.http.post<User>(this.apiURLUsers, user);
    }

    /**
     * Methode qui permet de créer un Utilisateur
     * @param user l'Utilisateur à créer
     * @returns void
     */
    updateUser(user: User): Observable<User> {
        return this.http.put<User>(`${this.apiURLUsers}/${user.id}`, user);
    }

    /**
     * Methode qui permet de supprimer une Utilisateur
     * @param usersId id de la Utilisateur à supprimer
     */
    deleteUser(usersId: string): Observable<any> {
        return this.http.delete<any>(`${this.apiURLUsers}/${usersId}`);
    }

    /**
     * Methode qui permet la récupération du nombre total des Utilisateurs
     * @returns number
     */
    getUsersCount(): Observable<number> {
        return this.http
            .get<number>(`${this.apiURLUsers}/get/count`)
            .pipe(map((objectValue: any) => objectValue.userCount));
    }

    /**
     * Methode qui donne tous les noms de pays
     * @returns string[]
     */
    getCountries(): { id: string; name: string }[] {
        return Object.entries(countriesLib.getNames('fr', { select: 'official' })).map(
            (entry) => {
                return {
                    id: entry[0],
                    name: entry[1]
                };
            }
        );
    }

    /**
     * Methode qui donne le nom complet d'un pays grâce à la clé passée en paramètre
     * @param countryKey la clé du pays dont on veut connaitre le nom
     * @returns string
     */
    getCountry(countryKey: string): string {
        return countriesLib.getName(countryKey, 'fr');
    }

    /**
     * Methode qui permet de vérifier si l'utilisateur existe ou pas
     * @return boolean
     */
    existUser(usersId: any): Observable<boolean> {
        return this.http.get<any>(`${this.apiURLUsers}/exist/${usersId}`);
    }
}
