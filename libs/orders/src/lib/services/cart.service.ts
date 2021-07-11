/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from '../models/cart';
export const CART_KEY = 'cart';
@Injectable({
    providedIn: 'root'
})
export class CartService {
    /**
     * @see BehaviorSubject : initialise un Subject en emmettant (emit) une valeur
     */
    cart$: BehaviorSubject<any> = new BehaviorSubject(this.getCart());

    constructor() {}

    /**
     * Methode qui permet d'initialiser les contenus de la Cart dans le LocalStorage
     */
    initCartLocalStorage() {
        const cart: Cart = this.getCart();
        if (!cart) {
            this.emptyCart();
        }
    }

    /**
     * Methode qui permet réinitialiser le panier
     * @return void
     */
    emptyCart() {
        const initialCart = {
            items: []
        };
        const initialCartJSON = JSON.stringify(initialCart);
        localStorage.setItem(CART_KEY, initialCartJSON);
        // notifier tous les changements au subject cart$ à chaque modification
        this.cart$.next(initialCart);
    }

    /**
     * Methode qui permet de lire les informations se trouvant dans le localStorage
     * @returns Cart
     */
    getCart(): Cart {
        const cartJSONString = localStorage.getItem(CART_KEY);
        const cart: Cart = cartJSONString !== null ? JSON.parse(cartJSONString) : null;
        return cart;
    }

    /**
     * Methode qui permet d'ajouter le cartItem dans le LocalStorage
     * @param cartItem Item à enregistrer
     * @param updateCartItem true si on désire mettre à jour la quantité d'un article
     * @returns Cart
     */
    setCartItem(cartItem: CartItem, updateCartItem?: boolean): Cart {
        const cart = this.getCart();
        const cartItemExist = cart.items?.find(
            (item) => item.productId === cartItem.productId
        );

        if (cartItemExist) {
            cart.items?.map((item) => {
                if (
                    item.quantity &&
                    cartItem.quantity &&
                    item.productId === cartItem.productId
                ) {
                    if (updateCartItem) {
                        item.quantity = cartItem.quantity;
                    } else {
                        item.quantity = item.quantity + cartItem.quantity;
                    }
                }
                return item;
            });
        } else {
            cart.items?.push(cartItem);
        }

        const initialCartJSON = JSON.stringify(cart);
        localStorage.setItem(CART_KEY, initialCartJSON);

        // notifier tous les changements au subject cart$ à chaque modification
        this.cart$.next(cart);
        return cart;
    }

    /**
     * Methode qui permet de supprimer un article du panier via son ID
     * @param productiId identifiant du product à supprimer du panier
     */
    deleteCartItem(productiId: string) {
        const cart = this.getCart();
        const newCart = cart.items?.filter((item) => item.productId !== productiId);

        cart.items = newCart;

        const cartJsonString = JSON.stringify(cart);
        localStorage.setItem(CART_KEY, cartJsonString);

        // notifier tous les changements au subject cart$ à chaque modification
        this.cart$.next(cart);
    }
}
