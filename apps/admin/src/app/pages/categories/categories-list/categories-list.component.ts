import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService, Category } from '@ghost/products';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
    selector: 'admin-categories-list',
    templateUrl: './categories-list.component.html',
    styles: []
})
export class CategoriesListComponent implements OnInit, OnDestroy {
    categories: Category[] = [];
    endSubs$: Subject<any> = new Subject();

    constructor(
        private categoriesService: CategoriesService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private router: Router,
        private location: Location
    ) {}

    ngOnDestroy(): void {
        this.endSubs$.next();
        this.endSubs$.complete();
    }

    ngOnInit(): void {
        this._getCategories();
    }

    /**
     * Methode qui permet de supprimer une Categorie
     * @param categoryId id de la category à Supprimer
     */
    deleteCategory(categoryId: string) {
        this.confirmationService.confirm({
            message: 'Voulez-vous supprimer cette categorie ?',
            header: 'Suppression Categorie',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.categoriesService.deleteCategory(categoryId).subscribe(
                    () => {
                        this._getCategories();
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Success',
                            detail: 'Categorie supprimée'
                        });
                    },
                    () => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Erreur',
                            detail: 'Categorie non supprimée !'
                        });
                    }
                );
            },
            reject: () => {}
        });
    }

    /**
     * Getter qui permet de reécupérer toutes les categories
     * @return Category[]
     */
    private _getCategories() {
        this.categoriesService
            .getCategories()
            .pipe(takeUntil(this.endSubs$))
            .subscribe((category) => {
                this.categories = category;
            });
    }

    /**
     * Methode qui permet la mise à jour d'une Categorie
     * @param categoryId : L'Id de la categorie à mettre à jour
     * @returns void
     */
    updateCategory(categoryId: string) {
        this.router.navigateByUrl(`categories/form/${categoryId}`);
    }
    goBack() {
        this.location.back();
    }
}
