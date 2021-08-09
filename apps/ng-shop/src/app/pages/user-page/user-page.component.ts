/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { User, UsersService, LocalstorageService } from '@ghost/users';

@Component({
    selector: 'ngshop-user-page',
    templateUrl: './user-page.component.html',
    styles: []
})
export class UserPageComponent implements OnInit {
    constructor(
        private userService: UsersService,
        private localstorage: LocalstorageService
    ) {}
    user!: User;

    ngOnInit(): void {
        this._bindUser();
    }

    _bindUser() {
        const idUser = this.localstorage.getUserCurrent();
        // Vérifier si l'Utilisateur existe
        this.userService.existUser(idUser).subscribe(() => {});
        this.userService.getUser(idUser).subscribe((user: User) => {
            this.user = user;
        });
    }

    /**
     * Methode qui permet de récupérer le full name d'un pays grâce à sa clé
     * @param countryKey la clé qui repésente un pays
     * @returns string
     */
    getCountryName(countryKey: string) {
        if (countryKey) {
            return this.userService.getCountry(countryKey);
        } else return countryKey;
    }
}
