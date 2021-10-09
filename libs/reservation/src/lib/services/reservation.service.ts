import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reservation } from '../models/reservation';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ReservationService {
    apiURLReservation = environment.apiURL + 'reservations';

    constructor(private http: HttpClient) {}

    /**
     * Methode qui permet la récupération de toutes les Reservation depuis le Backend
     * @returns Observable<Reservation[]>
     */
    getReservations(): Observable<Reservation[]> {
        return this.http.get<Reservation[]>(this.apiURLReservation);
    }

    /**
     * Methode qui permet la récupération une reservation depuis le Backend via son ID
     * @param reservationId l'ID de la reservation à récupérer
     * @returns Observable<Reservation>
     */
    getReservation(reservationId: string): Observable<Reservation> {
        return this.http.get<Reservation>(`${this.apiURLReservation}/${reservationId}`);
    }

    /**
     * Methode qui permet la récupération de la liste des reservations faites par un utilisateur depuis le Backend via son ID
     * @param userId l'ID de l'Utilisateur
     * @returns Observable<Reservations>
     */
    getReservationsUserById(userId: string): Observable<Reservation[]> {
        return this.http.get<Reservation[]>(
            `${this.apiURLReservation}/get/user/${userId}`
        );
    }

    /**
     * methode qui permet de récuper la somme totale des commandes vendues
     * @returns number
     */
    getReservationTotalReserved(): Observable<number> {
        return this.http
            .get<number>(`${this.apiURLReservation}/get/totalreserved`)
            .pipe(map((objectValue: any) => objectValue.totalReserved));
    }

    /**
     * methode qui permet de récuper la somme totale des commandes vendues
     * @returns number
     */
    getReservationCount(): Observable<number> {
        return this.http
            .get<number>(`${this.apiURLReservation}/get/count`)
            .pipe(map((objectValue: any) => objectValue.reservationCount));
    }

    /**
     * Methode qui permet de créer une Commande
     * @param reservation la reservation à créer
     * @returns void
     */
    createReservation(reservation: Reservation): Observable<Reservation> {
        return this.http.post<Reservation>(this.apiURLReservation, reservation);
    }

    /**
     * Methode qui permet de créer une Commande
     * @param reservationStatus la mise à jour su status de la commande
     * @param reservationId ID de la commande à mettre à jour
     * @returns void
     */
    updateReservation(
        reservationStatus: { status: string },
        reservationId: string
    ): Observable<Reservation> {
        return this.http.put<Reservation>(
            `${this.apiURLReservation}/${reservationId}`,
            reservationStatus
        );
    }

    /**
     * Methode qui permet de créer une Commande
     * @param orderNotes la mise à jour de la note de la commande
     * @param orderId ID de la commande à mettre à jour
     * @returns void
     */
    updateNotesReservation(
        reservationNotes: { notes: string },
        reservationId: string
    ): Observable<Reservation> {
        return this.http.put<Reservation>(
            `${this.apiURLReservation}/notes/${reservationId}`,
            reservationNotes
        );
    }

    /**
     * Methode qui permet de supprimer une reservation
     * @param reservationId id de la reservation à supprimer
     */
    deleteReservation(reservationId: string): Observable<any> {
        return this.http.delete<any>(`${this.apiURLReservation}/${reservationId}`);
    }
}
