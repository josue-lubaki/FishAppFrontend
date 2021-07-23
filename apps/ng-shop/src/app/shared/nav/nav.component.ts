/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from '@angular/core';

/* Fonction qui permet à l'icône "Hamburger" d'afficher la barre de menu */
declare function toggleMenu(event: any): void;
declare function linkAction(event: any): void;

@Component({
    selector: 'ngshop-nav',
    templateUrl: './nav.component.html',
    styles: []
})
export class NavComponent {
    openMenuBar(event: any) {
        toggleMenu(event);
    }

    // closeMenuBar(event: any) {
    //     linkAction(event);
    // }
}
