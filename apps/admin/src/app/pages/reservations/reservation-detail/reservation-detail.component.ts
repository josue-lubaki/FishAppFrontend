/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Reservation, ReservationService, RESERVATION_STATUS } from '@ghost/reservation';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'admin-reservation-detail',
    templateUrl: './reservation-detail.component.html',
    styles: []
})
export class ReservationDetailComponent implements OnInit {
    reservation?: Reservation;
    reservationStatuses: any = [];
    selectedStatus: any;
    formNotes!: FormGroup;
    isSubmitted = false;
    notesStarted?: string;

    constructor(
        private reservationService: ReservationService,
        private route: ActivatedRoute,
        private messageService: MessageService,
        private location: Location,
        private formBuilder: FormBuilder
    ) {}

    ngOnInit(): void {
        this._getReservation();
        this._mapReservationStatus();
        this.initFormNotes();
    }

    /**
     * Methode qui permet de trouver une reservation via l'id passé au URL
     * puis le binder à la variable correspondant
     * @return void
     */
    private _getReservation() {
        this.route.params.subscribe((params) => {
            if (params.id) {
                this.reservationService
                    .getReservation(params.id)
                    .subscribe((reservation) => {
                        this.reservation = reservation;
                        this.selectedStatus = reservation.status;
                        this.notesStarted = reservation.notes;
                    });
            }
        });
    }

    private _mapReservationStatus() {
        this.reservationStatuses = Object.keys(RESERVATION_STATUS).map((key: any) => {
            return {
                id: key,
                name: RESERVATION_STATUS[key].label,
                color: RESERVATION_STATUS[key].color
            };
        });
    }

    /**
     * Methode qui écoute les changements de la DropDown
     * @param event nouveau status choisi par l'Utilisateur
     */
    onStatusChange(event: any) {
        this.reservationService
            .updateReservation({ status: event.value }, this.reservation?.id || '')
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

    goBack() {
        this.location.back();
    }

    private initFormNotes() {
        this.formNotes = this.formBuilder.group({
            notes: ['', Validators.maxLength(250)]
        });
    }

    /**
     * Getter du formulaire form
     * @returns form.Controls
     */
    get formCheck() {
        return this.formNotes.controls;
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
                this.reservationService
                    .updateNotesReservation({ notes: notes }, params.id)
                    .subscribe((reservation) => {
                        this.notesStarted = reservation.notes;
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Success',
                            detail: `Message ajouté`
                        }),
                            () => {
                                this.messageService.add({
                                    severity: 'error',
                                    summary: 'Error',
                                    detail: 'Error message'
                                });
                            };
                    });
            }
        });
    }
}
