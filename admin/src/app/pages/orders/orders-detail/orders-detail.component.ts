/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order, OrdersService, ORDER_STATUS } from '@ghost/orders';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'admin-orders-detail',
    templateUrl: './orders-detail.component.html',
    styles: []
})
export class OrdersDetailComponent implements OnInit {
    order!: Order;
    orderStatuses: any = [];
    selectedStatus: any;

    constructor(
        private orderService: OrdersService,
        private route: ActivatedRoute,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        this._mapOrderStatus();
        this._getOrder();
    }

    /**
     * Methode qui permet de recupérer tous états du status d'une commande
     */
    private _mapOrderStatus() {
        this.orderStatuses = Object.keys(ORDER_STATUS).map((key: any) => {
            return {
                id: key,
                name: ORDER_STATUS[key].label,
                color: ORDER_STATUS[key].color
            };
        });
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
