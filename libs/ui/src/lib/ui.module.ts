import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './components/banner/banner.component';
import { ButtonModule } from 'primeng/button';
import { GalleryComponent } from './components/gallery/gallery.component';
import { GalleriaModule } from 'primeng/galleria';
import { CardModule } from 'primeng/card';
import { AboutComponent } from './components/about/about.component';

@NgModule({
    imports: [CommonModule, ButtonModule, GalleriaModule, CardModule],
    declarations: [BannerComponent, GalleryComponent, AboutComponent],
    exports: [BannerComponent, GalleryComponent, GalleriaModule, AboutComponent]
})
export class UiModule {}
