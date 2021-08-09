/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { LocalstorageService, UsersService } from '@ghost/users';

/* Fonction qui permet à l'icône "Hamburger" d'afficher la barre de menu */
declare function showMenu(navId: any): void;

@Component({
    selector: 'ngshop-header',
    templateUrl: './header.component.html',
    styleUrls: []
})
export class HeaderComponent implements OnInit {
    myName?: string;
    constructor(
        private localstorageService: LocalstorageService,
        private usersService: UsersService
    ) {}

    ngOnInit(): void {
        const idUser = this.localstorageService.getUserCurrent();
        this.usersService.getUser(idUser).subscribe((user) => {
            this.myName = user.name;
        });
    }

    openMenuBar() {
        showMenu('blocMenu');
    }
}
