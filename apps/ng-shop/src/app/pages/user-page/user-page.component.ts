/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order, OrdersService, ORDER_STATUS } from '@ghost/orders';
import { User, UsersService, LocalstorageService, AuthService } from '@ghost/users';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'ngshop-user-page',
    templateUrl: './user-page.component.html',
    styles: []
})
export class UserPageComponent implements OnInit, OnDestroy {
    commandes: Order[] = [];
    commandeStatus = ORDER_STATUS;
    endSubs$: Subject<any> = new Subject();
    user!: User;
    constructor(
        private authService: AuthService,
        private ordersService: OrdersService,
        private userService: UsersService,
        private localstorage: LocalstorageService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this._bindUser();
        this._getOrdersCurrentUser();
    }

    ngOnDestroy(): void {
        this.endSubs$.next();
        this.endSubs$.complete();
    }

    _bindUser() {
        const idUser = this.localstorage.getUserCurrent();
        // Vérifier si l'Utilisateur existe
        this.userService.existUser(idUser).subscribe(() => {});
        if (idUser && idUser !== null) {
            this.userService.getUser(idUser).subscribe((user: User) => {
                this.user = user;
            });
        }
    }

    /**
     * Methode qui permet de récupérer le full name d'un pays grâce à sa clé
     * @param countryKey la clé qui repésente un pays
     * @returns string
     */
    getCountryName(countryKey: string) {
        if (countryKey) {
            return this.userService.getCountry(countryKey);
        } else return countryKey;
    }

    private _getOrdersCurrentUser() {
        const idUser = this.localstorage.getUserCurrent();

        if (idUser && idUser !== null) {
            this.ordersService
                .getOrdersUser(idUser)
                .pipe(takeUntil(this.endSubs$))
                .subscribe((order) => {
                    this.commandes = order;
                });
        }
    }

    showOrder(orderId: string) {
        this.router.navigateByUrl(`orders/${orderId}`);
    }

    /**
     * Methode qi permet de déconnecter un utilisateur
     */
    logoutUser() {
        this.authService.logout();
        location.reload();
    }
}
