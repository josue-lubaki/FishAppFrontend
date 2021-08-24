import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@ghost/users';
import { ConfirmationService, MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
    selector: 'admin-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: []
})
export class SidebarComponent {
    constructor(
        private router: Router,
        private authService: AuthService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    /**
     * Methode qi permet de déconnecter un utilisateur
     */
    logoutUser() {
        this.confirmationService.confirm({
            message: 'Voulez-vous vraiment Quitter ?',
            header: 'Déconnexion',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.authService.logout();
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Déconnexion réussi'
                });
                timer(1500)
                    .toPromise()
                    .then(() => {
                        this.router.navigate(['/login']);
                    });
                () => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Impossible de se déconnecter'
                    });
                };
            },
            reject: () => {}
        });
    }
}
