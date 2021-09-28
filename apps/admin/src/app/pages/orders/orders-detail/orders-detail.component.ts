/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order, OrdersService, ORDER_STATUS } from '@ghost/orders';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'admin-orders-detail',
    templateUrl: './orders-detail.component.html',
    styles: []
})
export class OrdersDetailComponent implements OnInit {
    order!: Order;
    formNotes!: FormGroup;
    isSubmitted = false;
    orderStatuses: any = [];
    selectedStatus: any;
    notesStarted?: string;

    constructor(
        private orderService: OrdersService,
        private route: ActivatedRoute,
        private messageService: MessageService,
        private location: Location,
        private formBuilder: FormBuilder
    ) {}

    ngOnInit(): void {
        this._mapOrderStatus();
        this._getOrder();
        this.initFormNotes();
    }

    private initFormNotes() {
        this.formNotes = this.formBuilder.group({
            notes: ['', Validators.maxLength(250)]
        });
    }

    sendNotes() {
        this.isSubmitted = true;
        if (this.formNotes.invalid) {
            return;
        }

        const notes: string = this.formCheck.notes.value;

        // envoyer la note via le service
        this.route.params.subscribe((params) => {
            if (params.id) {
                this.orderService
                    .updateNotesOrder({ notes: notes }, params.id)
                    .subscribe((order) => {
                        this.notesStarted = order.notes;
                    });
            }
        });
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
                    this.notesStarted = order.notes;
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
    goBack() {
        this.location.back();
    }

    /**
     * Getter du formulaire form
     * @returns form.Controls
     */
    get formCheck() {
        return this.formNotes.controls;
    }
}
