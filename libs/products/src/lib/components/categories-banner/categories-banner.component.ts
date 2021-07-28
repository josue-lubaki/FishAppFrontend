import { Component, OnDestroy, OnInit } from '@angular/core';
import { Category } from '../../models/category';
import { CategoriesService } from '../../services/categories.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'products-categories-banner',
    templateUrl: './categories-banner.component.html',
    styles: []
})
export class CategoriesBannerComponent implements OnInit, OnDestroy {
    categories: Category[] = [];
    endSubs$: Subject<any> = new Subject();
    countdown?: number;
    value = 20;
    constructor(private categoriesService: CategoriesService) {}

    ngOnInit(): void {  
        this.categoriesService
            .getCategories()
            .pipe(takeUntil(this.endSubs$))
            .subscribe((categories) => {
                this.categories = categories;
            });

        console.log('Taille : ' + this.categories.length);

        if (this.categories.length <= 0) {
            setInterval(() => {
                if (this.value > 0) this.value--;
                else if (this.value === 0) {
                    location.reload();
                }
            }, 1000);
        }
    }

    ngOnDestroy(): void {
        this.endSubs$.next();
        this.endSubs$.complete();
    }
}
