/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService, Product, ProductsService } from '@ghost/products';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
    selector: 'admin-products-list',
    templateUrl: './products-list.component.html',
    styles: []
})
export class ProductsListComponent implements OnInit, OnDestroy {
    products: Product[] = [];
    endSubs$: Subject<any> = new Subject();
    constructor(
        private productService: ProductsService,
        private categoriesService: CategoriesService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private router: Router,
        private location: Location
    ) {}

    ngOnInit(): void {
        this._getProducts();
    }

    ngOnDestroy(): void {
        this.endSubs$.next();
        this.endSubs$.complete();
    }

    /**
     * Getter qui permet de récupérer toutes les produits
     * @return Product[]
     */
    private _getProducts() {
        this.productService
            .getProducts()
            .pipe(takeUntil(this.endSubs$))
            .subscribe((product) => {
                this.products = product;
            });
    }

    deleteProduct(productId: string) {
        this.confirmationService.confirm({
            message: 'Do you want to Delete this product ?',
            header: 'Delete Product',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.productService.deleteProduct(productId).subscribe(
                    () => {
                        this._getProducts();
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Success',
                            detail: 'Product is deleted'
                        });
                    },
                    () => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'Product is not deleted !'
                        });
                    }
                );
            },
            reject: () => {}
        });
    }

    /**
     * Methode qui permet la mise à jour d'un produit
     * @param productId ID du produit dont on souhaite mettre à jour
     */
    updateProduct(productId: string) {
        this.router.navigateByUrl(`products/form/${productId}`);
    }

    goBack() {
        this.location.back();
    }
}
