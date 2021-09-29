/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order, OrdersService, ORDER_STATUS } from '@ghost/orders';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
    selector: 'admin-orders-list',
    templateUrl: './orders-list.component.html',
    styles: []
})
export class OrdersListComponent implements OnInit, OnDestroy {
    orders: Order[] = [];
    orderStatus = ORDER_STATUS;
    endSubs$: Subject<any> = new Subject();

    constructor(
        private ordersService: OrdersService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private router: Router,
        private location: Location
    ) {}

    ngOnInit(): void {
        this._getOrders();
    }

    ngOnDestroy(): void {
        this.endSubs$.next();
        this.endSubs$.complete();
    }

    /**
     * Methode qui permet de supprimer une Categorie
     * @param orderId id de la order à Supprimer
     */
    deleteOrder(orderId: string) {
        this.confirmationService.confirm({
            message: 'Voulez-vous supprimer cette commande ?',
            header: 'Suppression commande',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.ordersService.deleteOrder(orderId).subscribe(
                    () => {
                        this._getOrders();
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Success',
                            detail: 'Commande supprimée'
                        });
                    },
                    () => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'Commande non supprimée !'
                        });
                    }
                );
            },
            reject: () => {}
        });
    }

    showOrder(orderId: string) {
        this.router.navigateByUrl(`orders/${orderId}`);
    }

    /**
     * Getter qui permet de récupérer toutes les order
     * @return void
     */
    private _getOrders() {
        this.ordersService
            .getOrders()
            .pipe(takeUntil(this.endSubs$))
            .subscribe((order) => {
                this.orders = order;
            });
    }

    /**
     * Methode qui permet la mise à jour d'une Categorie
     * @param orderId : L'Id de la categorie à mettre à jour
     * @returns void
     */
    updateOrders(orderId: string) {
        this.router.navigateByUrl(`order/form/${orderId}`);
    }

    goBack() {
        this.location.back();
    }
}
