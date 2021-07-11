/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from '@angular/core';

/* Fonction qui permet à l'icône "Hamburger" d'afficher la barre de menu */
declare function toggleMenu(event: any): void;

@Component({
    selector: 'ngshop-header',
    templateUrl: './header.component.html',
    styleUrls: []
})
export class HeaderComponent {
    openMenuBar(event: any) {
        toggleMenu(event);
    }
}
