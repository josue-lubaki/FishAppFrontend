export class Reservation {
    id?: string;
    user?: any;
    orderItems?: any;
    status?: number;
    notes?: string;
    totalPrice?: string;
    dateReservated?: string;
    avenue!: string;
    quartier!: string;
    commune!: string;
    apartment!: string;
    city!: string;
    country!: string;
}
