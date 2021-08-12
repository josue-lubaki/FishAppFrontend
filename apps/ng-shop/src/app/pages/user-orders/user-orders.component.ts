/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrdersService, ORDER_STATUS } from '@ghost/orders';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'ngshop-user-orders',
    templateUrl: './user-orders.component.html',
    styles: []
})
export class UserOrdersComponent implements OnInit {
    order: any;
    orderStatuses = ORDER_STATUS;
    selectedStatus: any;

    constructor(
        private orderService: OrdersService,
        private route: ActivatedRoute,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        this._getOrder();
    }

    /**
     * Methode qui permet de récupérer une commande
     * Récuperation de l'ID depuis l'URL
     * @return Order
     */
    private _getOrder() {
        this.route.params.subscribe((params) => {
            if (params.id) {
                this.orderService.getOrder(params.id).subscribe((order) => {
                    this.order = order;
                    this.selectedStatus = order.status;
                });
            }
        });
    }

    /**
     * Methode qui écoute les changements de la DropDown
     * @param event nouveau status choisi par l'Utilisateur
     */
    onStatusChange(event: any) {
        this.orderService
            .updateOrder({ status: event.value }, this.order.id || '')
            .subscribe(
                () => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: `Order is update`
                    });
                },
                () => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Order is not Updated'
                    });
                }
            );
    }
}
