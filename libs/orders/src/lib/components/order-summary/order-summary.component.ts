/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '@ghost/products';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { CartService } from '../../services/cart.service';

@Component({
    selector: 'orders-order-summary',
    templateUrl: './order-summary.component.html',
    styles: []
})
export class OrderSummaryComponent implements OnInit, OnDestroy {
    endSubs$: Subject<any> = new Subject();
    totalPrice!: number;
    isCheckoutPage = false;

    @Input() countItem: any;
    disabled = true;

    constructor(
        private cartService: CartService,
        private productsService: ProductsService,
        private router: Router
    ) {
        // Vérifier le nom de l'Url actuelle contient 'checkout'
        this.router.url.includes('checkout')
            ? (this.isCheckoutPage = true)
            : (this.isCheckoutPage = false);
    }

    ngOnInit(): void {
        this._getOrderSummary();
        this._initDisabled();
    }

    ngOnDestroy(): void {
        this.endSubs$.next();
        this.endSubs$.complete();
    }

    _initDisabled() {
        if (this.countItem > 0) {
            this.disabled = false;
        }
    }

    /**
     * Methode qui permet de calculer le montant total de la commande
     */
    _getOrderSummary() {
        this.cartService.cart$.pipe(takeUntil(this.endSubs$)).subscribe((cart) => {
            this.totalPrice = 0;
            if (cart) {
                cart.items.map((item: { productId: string; quantity: number }) => {
                    this.productsService
                        .getProduct(item.productId)
                        .pipe(take(1))
                        .subscribe((product: any) => {
                            this.totalPrice += product.price * item.quantity;
                            if (this.totalPrice === 0) {
                                this.disabled = true;
                            }
                        });
                });
            }
        });
    }

    /**
     * Methode qui permet de naviguer vers la page Checkout
     */
    navigateToCheckout() {
        this.router.navigate(['/checkout']);
    }
}
