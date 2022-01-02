import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalstorageService } from '@ghost/users';
import { ConfirmationService } from 'primeng/api';

@Component({
    selector: 'ngshop-root',
    templateUrl: './app.component.html',
    styleUrls: []
})
export class AppComponent implements OnInit {
    title = 'Poisson-Kin';

    constructor(
        private confirmationService: ConfirmationService,
        private router: Router,
        private localStorage: LocalstorageService
    ) {}

    ngOnInit(): void {
        this.initTerms();
    }

    initTerms() {
        const terms = this.localStorage.getVariable('termsAccepted');

        if (!terms || terms === 'false') {
            this.printTerms();
        }
    }

    /**
     * Methode qi permet de demander la confirmation de l'utilisateur à propos de lecture l'utilisation des termes et conditions
     */
    printTerms() {
        this.confirmationService.confirm({
            header: 'Termes et Confidentialité',
            message: `Veuillez prendre connaissance des termes et conditions d'utilisation de notre site`,
            icon: 'pi pi-bell',
            accept: () => {
                // naviguer vers la page terms
                this.router.navigate(['/terms-confidentiality']);

                // enregistrer l'etat du termsAccepted
                this.localStorage.setVariable('termsAccepted', 'true');
            },
            reject: () => {
                // enregistrer l'etat du termsAccepted
                this.localStorage.setVariable('termsAccepted', 'true');
            }
        });
    }
}
