import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ORDER_STATUS } from '@ghost/orders';
import { ReservationService } from '@ghost/reservation';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'ngshop-user-reservations',
    templateUrl: './user-reservations.component.html',
    styles: []
})
export class UserReservationsComponent implements OnInit {
    reservation: any;
    reservationStatuses = ORDER_STATUS;
    selectedStatus: any;
    formNotes!: FormGroup;
    isSubmitted = false;
    notesRecues?: string;

    constructor(
        private route: ActivatedRoute,
        private messageService: MessageService,
        private reservationService: ReservationService,
        private formBuilder: FormBuilder
    ) {}

    ngOnInit(): void {
        this._getReservation();
        this.initFormNotes();
    }

    private initFormNotes() {
        this.formNotes = this.formBuilder.group({
            notes: ['', Validators.maxLength(250)]
        });
    }

    /**
     * Methode qui permet de récupérer une commande
     * Récuperation de l'ID depuis l'URL
     * @return Reservation
     */
    private _getReservation() {
        this.route.params.subscribe((params) => {
            if (params.id) {
                this.reservationService
                    .getReservation(params.id)
                    .subscribe((reservation) => {
                        this.reservation = reservation;
                        this.selectedStatus = reservation.status;
                        this.notesRecues = reservation.notes;
                    });
            }
        });
    }

    /**
     * Methode qui écoute les changements de la DropDown
     * @param event nouveau status choisi par l'Utilisateur
     */
    onStatusChange(event: any) {
        this.reservationService
            .updateReservation({ status: event.value }, this.reservation.id || '')
            .subscribe(
                () => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: `Reservation is update`
                    });
                },
                () => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Reservation is not Updated'
                    });
                }
            );
    }
}
