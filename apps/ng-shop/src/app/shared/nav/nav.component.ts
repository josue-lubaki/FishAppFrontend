/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from '@angular/core';

/* Fonction qui permet à l'icône "Hamburger" d'afficher la barre de menu */
declare function showMenu(navId: any): void;
declare function linkAction(): void;

@Component({
    selector: 'ngshop-nav',
    templateUrl: './nav.component.html',
    styles: []
})
export class NavComponent {
    openMenuBar() {
        showMenu('blocMenu');
    }

    closeMenuBar() {
        const navLink = document.querySelectorAll('.nav__link');
        navLink.forEach((n) => n.addEventListener('click', linkAction));
    }
}
