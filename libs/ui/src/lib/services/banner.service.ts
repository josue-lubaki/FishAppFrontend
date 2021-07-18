import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Banner } from '../models/banner';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class BannerService {
    apiURLBanners = environment.apiURL + 'banners';
    constructor(private http: HttpClient) {}

    /**
     * Methode qui permet la récupération de toutes les images Banners depuis le Backend
     * @returns Observable<Banner[]>
     */
    getBanners(): Observable<Banner[]> {
        return this.http.get<Banner[]>(this.apiURLBanners);
    }

    /**
     * Methode qui permet la récupération une image Banner depuis le Backend via son ID
     * @param bannerID l'ID de l'image Banner à récupérer
     * @returns Observable<Banner>
     */
    getProduct(bannerID: string): Observable<Banner> {
        return this.http.get<Banner>(`${this.apiURLBanners}/${bannerID}`);
    }

    /**
     * Methode qui permet d'ajouter une image Banner
     * @param productData le Banner à créer
     * @returns void
     */
    createProduct(productData: FormData): Observable<Banner> {
        return this.http.post<Banner>(this.apiURLBanners, productData);
    }

    /**
     * Methode qui permet de supprimer une image Banner via son ID
     * @param bannerID id de l'image banner à supprimer
     */
    deleteProduct(bannerID: string): Observable<any> {
        return this.http.delete<any>(`${this.apiURLBanners}/${bannerID}`);
    }
}
