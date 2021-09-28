import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../models/order';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class OrdersService {
    apiURLOrders = environment.apiURL + 'orders';

    constructor(private http: HttpClient) {}

    /**
     * Methode qui permet la récupération de toutes les Orders depuis le Backend
     * @returns Observable<Order[]>
     */
    getOrders(): Observable<Order[]> {
        return this.http.get<Order[]>(this.apiURLOrders);
    }

    /**
     * methode qui permet de récuper la somme totale des commandes vendues
     * @returns number
     */
    getOrdersTotalSales(): Observable<number> {
        return this.http
            .get<number>(`${this.apiURLOrders}/get/totalsales`)
            .pipe(map((objectValue: any) => objectValue.totalSales));
    }

    /**
     * methode qui permet de récuper la somme totale des commandes vendues
     * @returns number
     */
    getOrdersCount(): Observable<number> {
        return this.http
            .get<number>(`${this.apiURLOrders}/get/count`)
            .pipe(map((objectValue: any) => objectValue.orderCount));
    }

    /**
     * Methode qui permet la récupération une order depuis le Backend via son ID
     * @param orderId l'ID de la order à récupérer
     * @returns Observable<Order>
     */
    getOrder(orderId: string): Observable<Order> {
        return this.http.get<Order>(`${this.apiURLOrders}/${orderId}`);
    }

    /**
     * Methode qui permet la récupération une order depuis le Backend via son ID
     * @param orderId l'ID de la order à récupérer
     * @returns Observable<Order>
     */
    getOrdersUser(userId: string): Observable<Order[]> {
        return this.http.get<Order[]>(`${this.apiURLOrders}/get/userorder/${userId}`);
    }

    /**
     * Methode qui permet de créer une Commande
     * @param order la order à créer
     * @returns void
     */
    createOrder(order: Order): Observable<Order> {
        return this.http.post<Order>(this.apiURLOrders, order);
    }

    /**
     * Methode qui permet de mettre à jour le status d'une commande
     * @param orderStatus la mise à jour su status de la commande
     * @param orderId ID de la commande à mettre à jour
     * @returns void
     */
    updateOrder(orderStatus: { status: string }, orderId: string): Observable<Order> {
        return this.http.put<Order>(`${this.apiURLOrders}/${orderId}`, orderStatus);
    }

    /**
     * Methode qui permet de créer une Commande
     * @param orderNotes la mise à jour de la note de la commande
     * @param orderId ID de la commande à mettre à jour
     * @returns void
     */
    updateNotesOrder(orderNotes: { notes: string }, orderId: string): Observable<Order> {
        console.log('le service reçoit notes : ', orderNotes);
        return this.http.put<Order>(`${this.apiURLOrders}/notes/${orderId}`, orderNotes);
    }

    /**
     * Methode qui permet de supprimer une order
     * @param orderId id de l'order à supprimer
     */
    deleteOrder(orderId: string): Observable<any> {
        return this.http.delete<any>(`${this.apiURLOrders}/${orderId}`);
    }
}
