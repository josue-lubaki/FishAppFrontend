import { Component, OnInit } from '@angular/core';
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

    constructor(
        private route: ActivatedRoute,
      private messageService: MessageService,
        private reservationService: ReservationService
    ) {}

    ngOnInit(): void {
        this._getReservation();
    }

    /**
     * Methode qui permet de récupérer une commande
     * Récuperation de l'ID depuis l'URL
     * @return Reservation
     */
    private _getReservation() {
        this.route.params.subscribe((params) => {
            if (params.id) {;
              this.reservationService.getReservation(params.id).subscribe((reservation => {
                this.reservation = reservation
                this.selectedStatus = reservation.status;
              }));
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
