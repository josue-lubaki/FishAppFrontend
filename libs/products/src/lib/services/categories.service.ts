import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CategoriesService {
    apiURLCategories = environment.apiURL + 'categories';

    constructor(private http: HttpClient) {}

    /**
     * Methode qui permet la récupération de toutes les categories depuis le Backend
     * @returns Observable<Category[]>
     */
    getCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(this.apiURLCategories);
    }

    /**
     * Methode qui permet la récupération du nombre de categories en stock depuis le Backend via son ID
     * @param productID l'ID du Categorie à récupérer
     * @returns Observable<Categorie>
     */
    getCategoriesCount(): Observable<number> {
        return this.http
            .get<number>(`${this.apiURLCategories}/get/count/`)
            .pipe(map((objectValue: any) => objectValue.categorieCount));
    }

    /**
     * Methode qui permet la récupération une categorie depuis le Backend via son ID
     * @param categoryId l'ID de la categorie à récupérer
     * @returns Observable<Category>
     */
    getCategory(categoryId: string): Observable<Category> {
        return this.http.get<Category>(`${this.apiURLCategories}/${categoryId}`);
    }

    /**
     * Methode qui permet de créer une Categorie
     * @param category la categorie à créer
     * @returns void
     */
    createCategory(category: Category): Observable<Category> {
        return this.http.post<Category>(this.apiURLCategories, category);
    }

    /**
     * Methode qui permet de créer une Categorie
     * @param category la categorie à créer
     * @returns void
     */
    updateCategory(category: Category): Observable<Category> {
        return this.http.put<Category>(
            `${this.apiURLCategories}/${category.id}`,
            category
        );
    }

    /**
     * Methode qui permet de supprimer une categorie
     * @param categoryId id de la categorie à supprimer
     */
    deleteCategory(categoryId: string): Observable<any> {
        return this.http.delete<any>(`${this.apiURLCategories}/${categoryId}`);
    }
}
