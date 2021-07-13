/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrdersService } from '@ghost/orders';
import { ProductsService } from '@ghost/products';
import { ReservationService } from '@ghost/reservation';
import { UsersService } from '@ghost/users';
import { combineLatest, Subject } from 'rxjs';
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
        private reservationService: ReservationService
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
}
