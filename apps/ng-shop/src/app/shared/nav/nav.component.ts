/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '@ghost/orders';
import { AuthService, LocalstorageService, User, UsersService } from '@ghost/users';
import { timer } from 'rxjs';
import { ConfirmationService, MessageService } from 'primeng/api';

/* Fonction qui permet à l'icône "Hamburger" d'afficher la barre de menu */
declare function showMenu(navId: any): void;
declare function linkAction(): void;

@Component({
    selector: 'ngshop-nav',
    templateUrl: './nav.component.html',
    styles: []
})
export class NavComponent implements OnInit {
    confirmationService: any;
    existUser = false;
    constructor(
        private router: Router,
        private localStorage: LocalstorageService,
        private cartService: CartService,
        private authService: AuthService,
        private messageService: MessageService,
        private userService: UsersService
    ) {}

    ngOnInit(): void {
        const idUser = this.localStorage.getUserCurrent();
        // Vérifier si l'Utilisateur existe
        this.userService.existUser(idUser).subscribe((exist: any) => {
            this.existUser = exist.success;
        });
    }

    openMenuBar() {
        showMenu('blocMenu');
    }

    closeMenuBar() {
        const navLink = document.querySelectorAll('.nav__link');
        navLink.forEach((n) => n.addEventListener('click', linkAction));
    }

    closeMenuBarAndDeconnexion() {
        this.closeMenuBar();
        this.localStorage.removeToken();
        this.localStorage.removeUserCurrent();
        this.router.navigate(['/']);
    }

    /**
     * Methode qi permet de déconnecter un utilisateur
     */
    logoutUser() {
        this.authService.logout();
        this.messageService.add({
            severity: 'success',
            summary: 'Déconnexion',
            detail: `Bye`
        });
        timer(1500)
            .toPromise()
            .then(() => {
                location.reload();
            });
        () => {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Impossible de se déconnecter'
            });
        };
    }
}
