/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Order } from '../models/order';
export const ORDER_KEY = 'achat-fishApp';
@Injectable({
    providedIn: 'root'
})
export class AchatService {
    /**
     * @see BehaviorSubject : initialise un Subject en emmettant (emit) une valeur
     */
    order$: BehaviorSubject<any> = new BehaviorSubject(this.getOrder());

    constructor() {}

    /**
     * Methode qui permet d'initialiser les contenus de la Order dans le LocalStorage
     */
    initOrderLocalStorage() {
        const order: Order = this.getOrder();
        if (!order) {
            this.emptyOrder();
        }
    }

    /**
     * Methode qui permet réinitialiser le panier
     * @return void
     */
    emptyOrder() {
        const initialOrder = {
            orders: []
        };
        const initialOrderJSON = JSON.stringify(initialOrder);
        localStorage.setItem(ORDER_KEY, initialOrderJSON);
    }

    getOrder(): Order {
        const cartJSONString = localStorage.getItem(ORDER_KEY);
        const order: Order = cartJSONString !== null ? JSON.parse(cartJSONString) : null;
        return order;
    }

    setOrderItem(achat: Order) {
        const initialOrderJSON = JSON.stringify(achat);
        localStorage.setItem(ORDER_KEY, initialOrderJSON);
    }

    deleteOrderItem() {
        this.emptyOrder();
    }
}
