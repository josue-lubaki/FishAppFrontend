/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalstorageService, User, UsersService } from '@ghost/users';
import {
    AchatService,
    CartService,
    Order,
    OrderItem,
    OrdersService
} from '@ghost/orders';
import { Reservation } from '../../models/reservation';
import { ReservationService } from '@ghost/reservation';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'orders-checkout-page',
    templateUrl: './checkout-page.component.html',
    styles: [],
    providers: [MessageService]
})
export class CheckoutPageComponent implements OnInit {
    checkoutFormGroup!: FormGroup;
    isSubmitted = false;
    orderItems: OrderItem[] = [];
    countries: unknown[] = [];
    user: any;
    disabled = false;

    constructor(
        private router: Router,
        private userService: UsersService,
        private formBuilder: FormBuilder,
        private cartService: CartService,
        private achatService: AchatService,
        private orderService: OrdersService,
        private reservationService: ReservationService,
        private localstorage: LocalstorageService,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        this.initCheckoutForm();
        this._bindUser();
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
            quartier: ['', Validators.required],
            commune: ['', Validators.required],
            apartment: ['', Validators.required],
            avenue: ['', Validators.required],
            notes: ['', Validators.maxLength(250)]
        });
    }

    private _bindUser() {
        const idUser = this.localstorage.getUserCurrent();
        this.userService.existUser(idUser).subscribe(() => {});
        if (idUser && idUser !== null) {
            this.userService.getUser(idUser).subscribe((user: User) => {
                this.user = user;
                this._autoComplete();
            });
        }
    }

    private _autoComplete() {
        if (this.localstorage.getUserCurrent() && this.user) {
            this.checkoutForm.name.setValue(this.user.name);
            this.checkoutForm.email.setValue(this.user.email);
            this.checkoutForm.phone.setValue(this.user.phone);
            this.checkoutForm.avenue.setValue(this.user.avenue);
            this.checkoutForm.apartment.setValue(this.user.apartment);
            this.checkoutForm.quartier.setValue(this.user.quartier);
            this.checkoutForm.commune.setValue(this.user.commune);
            this.checkoutForm.city.setValue(this.user.city);
            this.checkoutForm.country.setValue(this.user.country);
        }
    }

    private _getCartItems() {
        const cart = this.cartService.getCart();
        const cartClean = cart.items || [];
        if (cart.items?.length === 0) {
            this.disabled = true;
        } else {
            this.disabled = false;
        }

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
            avenue: this.checkoutForm.avenue.value,
            apartment: this.checkoutForm.apartment.value,
            city: this.checkoutForm.city.value,
            quartier: this.checkoutForm.quartier.value,
            commune: this.checkoutForm.commune.value,
            country: this.checkoutForm.country.value,
            phone: this.checkoutForm.phone.value,
            status: 0,
            notes: this.checkoutForm.notes.value,
            user: this.localstorage.getUserCurrent(),
            dateOrdered: `${Date.now()}`
        };

        this.achatService.setOrderItem(order);
        this.router.navigate(['/check-method']);
    }

    /**
     * Toast qui signale qui le panier est vide
     */
    showWarn() {
        this.messageService.add({
            severity: 'warn',
            summary: 'Attention',
            detail: 'Le Panier est Vide'
        });
    }

    /**
     * Methode qui permet de passer une reservation
     * @returns void
     */
    placeReservation() {
        this.isSubmitted = true;
        if (this.checkoutFormGroup.invalid) {
            return;
        }

        // Vérifier que le panier ait au moins un article de
        if (this.orderItems.length <= 0) {
            this.showWarn();
            return;
        }

        const reservation: Reservation = {
            orderItems: this.orderItems,
            avenue: this.checkoutForm.avenue.value,
            apartment: this.checkoutForm.apartment.value,
            city: this.checkoutForm.city.value,
            quartier: this.checkoutForm.quartier.value,
            commune: this.checkoutForm.commune.value,
            country: this.checkoutForm.country.value,
            notes: this.checkoutForm.notes.value,
            status: 0,
            user: this.localstorage.getUserCurrent(),
            dateReservated: `${Date.now()}`
        };

        this.reservationService.createReservation(reservation).subscribe(() => {
            // redirect to thank you page
            this.router.navigate(['/success']);
            this.cartService.emptyCart();
        });
    }

    /**
     * Getter du formulaire checkoutFormGroup
     * @returns FormGroup.Controls
     */
    get checkoutForm() {
        return this.checkoutFormGroup.controls;
    }
}
