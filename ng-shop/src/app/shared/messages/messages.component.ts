import { Component, OnInit } from '@angular/core';
import { CartService } from '@ghost/orders';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'ngshop-messages',
    templateUrl: './messages.component.html',
    styles: []
})
export class MessagesComponent implements OnInit {
    constructor(
        private cartService: CartService,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        this.cartService.cart$.subscribe(() => {
            this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Article Updated'
            });
        });
    }
}
