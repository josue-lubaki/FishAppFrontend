import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'ui-gallery',
    templateUrl: './gallery.component.html',
    styles: []
})
export class GalleryComponent implements OnInit {
    selectedImageUrl!: string;

    @Input()
    productSelect: any;

    ngOnInit(): void {
        if (this.hasImages) {
            this.selectedImageUrl = this.productSelect.images[0];
        } else {
            this.selectedImageUrl = this.productSelect.image;
        }
    }

    /**
     * Methode qui permet de selectionner une image
     * @param imageUrl l'image dont on veut voir comme principale
     * @returns void
     */
    changeSelectedImage(imageUrl: string) {
        this.selectedImageUrl = imageUrl;
    }

    /**
     * Methode qui permet de vérifier si la gallery contient les images
     * @returns boolean
     */
    get hasImages() {
        return this.productSelect.images?.length > 0;
    }
}
