import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@ghost/users';

@Component({
    selector: 'admin-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: []
})
export class SidebarComponent {
    constructor(private router: Router, private authService: AuthService) {}

    /**
     * Methode qi permet de déconnecter un utilisateur
     */
    logoutUser() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }
}
