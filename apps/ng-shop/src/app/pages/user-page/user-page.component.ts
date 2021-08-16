/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order, OrdersService, ORDER_STATUS } from '@ghost/orders';
import { ReservationService, Reservation } from '@ghost/reservation';
import { User, UsersService, LocalstorageService, AuthService } from '@ghost/users';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'ngshop-user-page',
    templateUrl: './user-page.component.html',
    styles: [],
    providers: [ConfirmationService]
})
export class UserPageComponent implements OnInit, OnDestroy {
    commandes: Order[] = [];
    reservations: Reservation[] = [];
    commandeStatus = ORDER_STATUS;
    reservationStatus = ORDER_STATUS;
    endSubs$: Subject<any> = new Subject();
    user!: User;
    constructor(
        private authService: AuthService,
        private ordersService: OrdersService,
        private reservationService: ReservationService,
        private userService: UsersService,
        private localstorage: LocalstorageService,
        private router: Router,
        private confirmationService: ConfirmationService,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        this._bindUser();
        this._getOrdersCurrentUser();
        this._getReservationsCurrentUser();
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

    /**
     * Methode qui récupère toutes les commandes de l'Utilisateur
     */
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

    /**
     * Methode qui récupère toutes les reservations de l'Utilisateur
     */
    private _getReservationsCurrentUser() {
        const idUser = this.localstorage.getUserCurrent();

        if (idUser && idUser !== null) {
            this.reservationService
                .getReservationsUserById(idUser)
                .pipe(takeUntil(this.endSubs$))
                .subscribe((reservation) => {
                    this.reservations = reservation;
                });
        }
    }

    /**
     * Methode qui permet d'aller vers la page contenant les details d'une commande
     * @param orderId : identifiant de la commande à visionner
     */
    showOrder(orderId: string) {
        this.router.navigateByUrl(`compte/orders/${orderId}`);
    }

    /**
     * Methode qui permet d'aller vers la page contenant les details d'une reservation
     * @param reserrvationId : identifiant de la reservation à visionner
     */
    showReservation(reserrvationId: string) {
        this.router.navigateByUrl(`compte/reservation/${reserrvationId}`);
    }

    /**
     * Methode qi permet de déconnecter un utilisateur
     */
    logoutUser() {
        this.confirmationService.confirm({
            message: `<b>${this.user.name}</b>, Voulez-vous vraiment Quitter ?`,
            header: 'Déconnexion',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.authService.logout();
                this.messageService.add({
                    severity: 'success',
                    summary: 'Déconnexion',
                    detail: `Bye ${this.user.name}`
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
            },
            reject: () => {}
        });
    }
}
