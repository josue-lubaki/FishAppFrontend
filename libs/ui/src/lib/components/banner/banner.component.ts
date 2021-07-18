/* eslint-disable @nrwl/nx/enforce-module-boundaries */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { Banner, BannerService } from '@ghost/ui';

@Component({
    selector: 'ui-banner',
    templateUrl: './banner.component.html',
    styles: []
})
export class BannerComponent implements OnInit {
    imagesBanners: any;
    responsiveOptions: any[] = [
        {
            breakpoint: '1024px',
            numVisible: 5
        },
        {
            breakpoint: '768px',
            numVisible: 3
        },
        {
            breakpoint: '560px',
            numVisible: 1
        }
    ];
    constructor(private bannerService: BannerService) {}

    ngOnInit(): void {
        this._initBanners();
    }

    private _initBanners() {
        this.bannerService.getBanners().subscribe((banners) => {
            this.imagesBanners = banners;
        });
    }
}
