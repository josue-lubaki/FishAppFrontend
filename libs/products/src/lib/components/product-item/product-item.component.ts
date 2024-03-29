/* eslint-disable @nrwl/nx/enforce-module-boundaries */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, Input, OnInit } from '@angular/core';
import { CartItem, CartService } from '@ghost/orders';
import { Product } from '../../models/product';

@Component({
    selector: 'products-product-item',
    templateUrl: './product-item.component.html',
    styles: []
})
export class ProductItemComponent implements OnInit {
    @Input()
    product!: Product;
    skeletonNumber?: number[];
    isRupture = false;

    constructor(private cartService: CartService) {}

    ngOnInit(): void {
        this.skeletonNumber = Array(4)
            .fill(0)
            .map((x, i) => i);

        if (this.product.countInStock <= 0) {
            this.isRupture = true;
        } else {
            this.isRupture = false;
        }
    }

    addProductToCart() {
        if (!this.isRupture) {
            const cartItem: CartItem = {
                productId: this.product.id,
                quantity: 1
            };
            this.cartService.setCartItem(cartItem);
        }
    }
}
