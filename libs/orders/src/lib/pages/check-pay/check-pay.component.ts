/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from '../../models/order';
import { AchatService } from '../../services/achat.service';
import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/orders.service';

@Component({
    selector: 'orders-check-pay',
    templateUrl: './check-pay.component.html',
    styles: []
})
export class CheckPayComponent implements OnInit {
    constructor(
        private achatService: AchatService,
        private orderService: OrdersService,
        private cartService: CartService,
        private router: Router
    ) {}

    ngOnInit(): void {}

    confirmationAchat() {
        const orderUser: Order = this.achatService.getOrder();
        this.orderService.createOrder(orderUser).subscribe(() => {
            // redirect to thank you page
            this.router.navigate(['/success']);
            this.cartService.emptyCart();
            this.achatService.deleteOrderItem();
        });
    }
}
