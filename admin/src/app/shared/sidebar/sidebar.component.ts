import { Component } from '@angular/core';
import { AuthService } from '@ghost/users';

@Component({
    selector: 'admin-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: []
})
export class SidebarComponent {
    constructor(private authService: AuthService) {}

    /**
     * Methode qi permet de déconnecter un utilisateur
     */
    logoutUser() {
        this.authService.logout();
    }
}
