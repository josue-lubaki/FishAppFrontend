/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, UsersService } from '@ghost/users';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
    selector: 'admin-users-list',
    templateUrl: './users-list.component.html',
    styles: []
})
export class UsersListComponent implements OnInit, OnDestroy {
    users: User[] = [];
    endSubs$: Subject<any> = new Subject();

    constructor(
        private usersService: UsersService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private router: Router,
        private location: Location
    ) {}

    ngOnInit(): void {
        this._getUsers();
    }

    ngOnDestroy(): void {
        this.endSubs$.next();
        this.endSubs$.complete();
    }

    /**
     * Methode qui permet de supprimer un Utilisateur
     * @param user l'Utilisateur à Supprimer
     */
    deleteUser(user: User) {
        this.confirmationService.confirm({
            message: `Do you want to Delete
            <strong>
              ${user.name ? user.name : 'this user'}
            </strong> ?`,
            header: 'Delete User',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.usersService.deleteUser(user.id).subscribe(
                    () => {
                        this._getUsers();
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Success',
                            detail: 'User is deleted'
                        });
                    },
                    () => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'User is not deleted !'
                        });
                    }
                );
            },
            reject: () => {}
        });
    }

    /**
     * Methode qui permet de récupérer le full name d'un pays grâce à sa clé
     * @param countryKey la clé qui repésente un pays
     * @returns string
     */
    getCountryName(countryKey: string) {
        if (countryKey) {
            return this.usersService.getCountry(countryKey);
        } else return countryKey;
    }

    /**
     * Getter qui permet de récupérer toutes les Utilisateurs
     * @return User[]
     */
    private _getUsers() {
        this.usersService
            .getUsers()
            .pipe(takeUntil(this.endSubs$))
            .subscribe((users) => {
                this.users = users;
            });
    }

    /**
     * Methode qui permet la mise à jour d'un Utilisateur
     * @param userId : L'Id de la Utilisateur à mettre à jour
     * @returns void
     */
    updateUser(userId: string) {
        this.router.navigateByUrl(`users/form/${userId}`);
    }

    goBack() {
        this.location.back();
    }
}
