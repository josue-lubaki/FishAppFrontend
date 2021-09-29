/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Reservation, ReservationService, RESERVATION_STATUS } from '@ghost/reservation';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Location } from '@angular/common';
@Component({
    selector: 'admin-reservation-list',
    templateUrl: './reservation-list.component.html',
    styles: []
})
export class ReservationListComponent implements OnInit, OnDestroy {
    reservationStatus = RESERVATION_STATUS;
    reservations: Reservation[] = [];
    endSubs$: Subject<any> = new Subject();

    constructor(
        private reservationService: ReservationService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private router: Router,
        private location: Location
    ) {}

    ngOnInit(): void {
        this._getReservations();
    }

    ngOnDestroy(): void {
        this.endSubs$.next();
        this.endSubs$.complete();
    }

    /**
     * Getter qui permet de récupérer toutes les reservations
     * @return void
     */
    private _getReservations(): void {
        this.reservationService
            .getReservations()
            .pipe(takeUntil(this.endSubs$))
            .subscribe((reservations) => {
                this.reservations = reservations;
            });
    }

    /**
     * Methode qui permet la mise à jour d'une reservation
     * @param reservationID : L'Id de la reservation à mettre à jour
     * @returns void
     */
    updateReservation(reservationID: string) {
        this.router.navigateByUrl(`reservation/form/${reservationID}`);
    }

    /**
     * Methode qui permet de diriger vers une reservation
     * @param reservationID : L'Id de la reservation dont on veut voir le detail
     */
    showReservation(reservationID: string) {
        this.router.navigateByUrl(`reservations/${reservationID}`);
    }

    /**
     * Methode qui permet de supprimer une reservation
     * @param reservationID id de la reservation à Supprimer
     */
    deleteReservation(reservationID: string) {
        this.confirmationService.confirm({
            message: 'Voulez-vous supprimer cette réservation ?',
            header: 'Suppression Reservation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.reservationService.deleteReservation(reservationID).subscribe(
                    () => {
                        this._getReservations();
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Success',
                            detail: 'Reservation supprimée'
                        });
                    },
                    () => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'Reservation non supprimée !'
                        });
                    }
                );
            },
            reject: () => {}
        });
    }

    goBack() {
        this.location.back();
    }
}
