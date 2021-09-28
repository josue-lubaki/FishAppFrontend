/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrdersService } from '@ghost/orders';
import { ProductsService } from '@ghost/products';
import { ReservationService } from '@ghost/reservation';
import { AuthService, UsersService } from '@ghost/users';
import { ConfirmationService, MessageService } from 'primeng/api';
import { combineLatest, Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'admin-dashboard',
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit, OnDestroy {
    statistics: any = [];
    endSubs$: Subject<any> = new Subject();

    constructor(
        private usersService: UsersService,
        private orderService: OrdersService,
        private productService: ProductsService,
        private reservationService: ReservationService,
        private router: Router,
        private messageService: MessageService,
        private authService: AuthService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit(): void {
        combineLatest([
            this.orderService.getOrdersCount(),
            this.productService.getProductsCount(),
            this.usersService.getUsersCount(),
            this.orderService.getOrdersTotalSales(),
            this.reservationService.getReservationCount(),
            this.reservationService.getReservationTotalReserved()
        ])
            .pipe(takeUntil(this.endSubs$))
            .subscribe((values) => {
                this.statistics = values;
            });
    }

    ngOnDestroy(): void {
        this.endSubs$.next();
        this.endSubs$.complete();
    }

    goTo(route: string) {
        this.router.navigate([`/${route}`]);
    }
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
