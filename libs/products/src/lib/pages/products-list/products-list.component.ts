/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Category } from '../../models/category';
import { Product } from '../../models/product';
import { CategoriesService } from '../../services/categories.service';
import { ProductsService } from '../../services/products.service';

@Component({
    selector: 'products-list',
    templateUrl: './products-list.component.html',
    styles: []
})
export class ProductsListComponent implements OnInit, OnDestroy {
    products: Product[] = [];
    categories: Category[] = [];
    iscategoryPage!: boolean;
    subs$: Subject<any> = new Subject();

    constructor(
        private productsService: ProductsService,
        private categoriesService: CategoriesService,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            params.categoryId
                ? this._getProducts([params.categoryId])
                : this._getProducts();

            params.categoryId
                ? (this.iscategoryPage = true)
                : (this.iscategoryPage = false);
        });
        this._getCategories();
    }

    ngOnDestroy(): void {
        this.subs$.next();
        this.subs$.complete();
    }

    /**
     * Methode qui permet de récupérer tous les produits de la BD
     * @returns Product[]
     */
    private _getProducts(categoriesFilter?: string[]) {
        this.productsService
            .getProducts(categoriesFilter)
            .pipe(takeUntil(this.subs$))
            .subscribe((products) => {
                this.products = products;
            });
    }

    /**
     * Methode qui permet de récupérer toutes les categories comprises dans la BD
     * @returns Category[]
     */
    private _getCategories() {
        this.categoriesService
            .getCategories()
            .pipe(takeUntil(this.subs$))
            .subscribe((categories) => {
                this.categories = categories;
            });
    }

    /**
     * Methode qui permet de filter les categories
     */
    categoryFilter() {
        // Récupérer les ID des categories selectionnés
        const selectedCategories = this.categories
            .filter((category) => category.checked)
            .map((category) => category.id);

        this._getProducts(selectedCategories);

        console.log(selectedCategories);
    }
}
