export class Cart {
    items?: CartItem[];
}

export class CartItem {
    productId?: string;
    quantity?: number;
}

export class CartItemDetails {
    product?: any;
    quantity?: number;
}
