/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '@ghost/users';
import { CartService, Order, OrderItem, OrdersService } from '@ghost/orders';

@Component({
    selector: 'orders-checkout-page',
    templateUrl: './checkout-page.component.html',
    styles: []
})
export class CheckoutPageComponent implements OnInit {
    checkoutFormGroup!: FormGroup;
    isSubmitted = false;
    orderItems: OrderItem[] = [];
    userId = '60d4755efdb5caaf845f15a3';
    countries: unknown[] = [];

    constructor(
        private router: Router,
        private userService: UsersService,
        private formBuilder: FormBuilder,
        private cartService: CartService,
        private orderService: OrdersService
    ) {}

    ngOnInit(): void {
        this.initCheckoutForm();
        this._getCartItems();
        this._getCountries();
    }

    private initCheckoutForm() {
        this.checkoutFormGroup = this.formBuilder.group({
            name: ['', Validators.required],
            email: ['', [Validators.email, Validators.required]],
            phone: ['', Validators.required],
            city: ['', Validators.required],
            country: ['', Validators.required],
            zip: ['', Validators.required],
            apartment: ['', Validators.required],
            street: ['', Validators.required]
        });
    }

    private _getCartItems() {
        const cart = this.cartService.getCart();
        const cartClean = cart.items || [];
        this.orderItems = cartClean.map((item) => {
            return {
                product: item.productId,
                quantity: item.quantity
            };
        });
    }

    /**
     * Methode qui permet de récupérer tous les noms de pays
     * @returns string[]
     */
    private _getCountries() {
        this.countries = this.userService.getCountries();
    }

    /**
     * Methode qui permet de revenir au panier
     * @return void
     */
    backToCart() {
        this.router.navigate(['/cart']);
    }

    /**
     * Methode qui permet de procéder à l'achat des articles
     * @returns void
     */
    placeOrder() {
        this.isSubmitted = true;
        if (this.checkoutFormGroup.invalid) {
            return;
        }

        const order: Order = {
            orderItems: this.orderItems,
            shippingAddress1: this.checkoutForm.street.value,
            shippingAddress2: this.checkoutForm.apartment.value,
            city: this.checkoutForm.city.value,
            zip: this.checkoutForm.zip.value,
            country: this.checkoutForm.country.value,
            phone: this.checkoutForm.phone.value,
            status: 0,
            user: this.userId,
            dateOrdered: `${Date.now()}`
        };

        this.orderService.createOrder(order).subscribe(
            () => {
                // redirect to thank you page
                this.router.navigate(['/success']);
                this.cartService.emptyCart();
            },
            () => {
                // display some message to user
            }
        );
    }

    /**
     * Getter du formulaire checkoutFormGroup
     * @returns FormGroup.Controls
     */
    get checkoutForm() {
        return this.checkoutFormGroup.controls;
    }
}
