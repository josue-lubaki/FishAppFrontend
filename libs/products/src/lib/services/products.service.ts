import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Product } from '../models/product';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {
    apiURLProducts = environment.apiURL + 'products';

    constructor(private http: HttpClient) {}

    /**
     * Methode qui permet la récupération de toutes les Produits depuis le Backend
     * @returns Observable<Product[]>
     */
    getProducts(categoriesFilter?: string[]): Observable<Product[]> {
        let params = new HttpParams();
        if (categoriesFilter) {
            params = params.append('categories', categoriesFilter.join(','));
        }
        return this.http.get<Product[]>(this.apiURLProducts, { params: params });
    }

    /**
     * Methode qui permet de récupérer le nombre total des Products dans la base de données
     * @returns {-  productCount : value }
     */
    getProductsCount(): Observable<number> {
        return this.http
            .get<number>(`${this.apiURLProducts}/get/count`)
            .pipe(map((objectValue: any) => objectValue.productCount));
    }

    /**
     * Methode qui permet la récupération du nombre de Produit en stock depuis le Backend via son ID
     * @param productID l'ID du Produit à récupérer
     * @returns Observable<Product>
     */
    getProductCount(productId: string): Observable<number> {
        return this.http
            .get<number>(`${this.apiURLProducts}/get/count/${productId}`)
            .pipe(map((objectValue: any) => objectValue.productCount));
    }

    /**
     * Methode qui permet la récupération un Produit depuis le Backend via son ID
     * @param productID l'ID du Produit à récupérer
     * @returns Observable<Product>
     */
    getProduct(productID: string): Observable<Product> {
        return this.http.get<Product>(`${this.apiURLProducts}/${productID}`);
    }

    /**
     * Methode qui permet de créer un produit
     * @param productData le Produit à créer
     * @returns void
     */
    createProduct(productData: FormData): Observable<Product> {
        return this.http.post<Product>(this.apiURLProducts, productData);
    }

    /**
     * Methode qui permet de mettre à jour un Produit
     * @param productData la Produit à créer
     * @returns void
     */
    updateProduct(productData: FormData): Observable<Product> {
        return this.http.put<Product>(
            `${this.apiURLProducts}/${productData.get('id')}`,
            productData
        );
    }

    /**
     * Methode qui permet de supprimer une categorie
     * @param productId id du produit à supprimer
     */
    deleteProduct(productId: string): Observable<any> {
        return this.http.delete<any>(`${this.apiURLProducts}/${productId}`);
    }

    /**
     * Methode qui permet de récupérer tous les products dont la proprité "featured == true"
     * @param count nombre de products à récupérer
     * @returns Product[]
     */
    getFeaturedProducts(count: number): Observable<Product[]> {
        return this.http.get<Product[]>(`${this.apiURLProducts}/get/featured/${count}`);
    }
}
