/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { ProductsService } from '@ghost/products';
import { CartItemDetails } from '../../models/cart';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
    selector: 'orders-cart-page',
    templateUrl: './cart-page.component.html',
    styles: []
})
export class CartPageComponent implements OnInit, OnDestroy {
    cartItemdetails: CartItemDetails[] = [];
    cartCount = 0;
    endSubs$: Subject<unknown> = new Subject();

    constructor(
        private router: Router,
        private cartService: CartService,
        private productsService: ProductsService
    ) {}

    ngOnInit(): void {
        this._getCartDetails();
    }

    ngOnDestroy(): void {
        this.endSubs$.next();
        this.endSubs$.complete();
    }

    /**
     * Methode qui donne le nombre d'article mise au panier et récupère toutes les informations d'un produit à partir de son ID
     * pour ensuite le push dans le tableau des articles prêt à l'achat
     */
    private _getCartDetails() {
        this.cartService.cart$
            .pipe(takeUntil(this.endSubs$))
            .subscribe((responseCart) => {
                this.cartItemdetails = [];
                this.cartCount = responseCart?.items?.length ?? 0;

                responseCart.items.forEach((cartItem: any) => {
                    this.productsService
                        .getProduct(cartItem.productId)
                        .subscribe((responseProduct) => {
                            this.cartItemdetails.push({
                                product: responseProduct,
                                quantity: cartItem.quantity
                            });
                        });
                });
            });
    }

    /**
     * Methode qui permet de retourner en arrière ('/products') via le boutton "continue shopping"
     */
    backToShop() {
        this.router.navigate(['/products']);
    }

    /**
     * Methode qui permet de supprimer un article de ls liste des articles prêt à l'achat
     * @param cartItem la cartItem à supprimer
     */
    deleteCartItem(cartItem: CartItemDetails) {
        this.cartService.deleteCartItem(cartItem.product.id);
    }

    /**
     * Methode qui permet de mettre à jour la quantité d'un article sélectionné
     * @param event fait reference au ngModel pour l'affichage ne temps réel de la quantité
     * @param cartItem fait réference au CartItem à mettre à jour
     */
    updateCartItemQuantity(event: any, cartItem: CartItemDetails) {
        this.cartService.setCartItem(
            {
                productId: cartItem.product.id,
                quantity: event.value
            },
            true
        );
    }
}
