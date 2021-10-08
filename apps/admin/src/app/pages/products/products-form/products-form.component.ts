import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, Category, Product, ProductsService } from '@ghost/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
    selector: 'admin-products-form',
    templateUrl: './products-form.component.html',
    styles: []
})
export class ProductsFormComponent implements OnInit {
    form!: FormGroup;
    isSubmitted = false;
    editMode = false;
    currentProductId!: string;
    imageDisplay: string | ArrayBuffer | null | undefined;
    categories: Category[] = [];

    constructor(
        private formBuilder: FormBuilder,
        private productsService: ProductsService,
        private categoriesService: CategoriesService,
        private messageService: MessageService,
        private location: Location,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.initForm();
        this._getCategories();
        this._checkEditMode();
    }

    /**
     * Methode qui permet d'initialiser les contenus du formulaire dont on a besoin
     * @see Validators : permet de spécifier les validations de nos champs (required, email, etc...)
     * @return FormGroup
     */
    initForm() {
        this.form = this.formBuilder.group({
            name: ['', Validators.required],
            price: ['', Validators.required],
            category: ['', Validators.required],
            countInStock: ['', Validators.required],
            description: ['', Validators.required],
            richDescription: [''],
            image: ['', Validators.required],
            isFeatured: [false]
        });
    }

    /**
     * Methode qui permet de récupérer toutes les categories
     * @return Category[]
     */
    private _getCategories() {
        this.categoriesService.getCategories().subscribe((categories) => {
            this.categories = categories;
        });
    }

    /**
     * Observable [subscribe()] qui permet de switcher la variable @code{editMode} à true si l'Utilisateur
     * clique (Active) le router en cliquant sur le button edit.
     * Récupère les informations de la categorie pour le binder sur le formulaire
     * @method getCategory(categoryId) permet de recupérer les informations de la categorie
     * @return void
     */
    private _checkEditMode() {
        this.route.params.subscribe((params) => {
            if (params.id) {
                this.editMode = true;
                this.currentProductId = params.id;
                this.productsService.getProduct(params.id).subscribe((product) => {
                    this.productForm.name.setValue(product.name);
                    this.productForm.description.setValue(product.description);
                    this.productForm.price.setValue(product.price);
                    this.productForm.category.setValue(product.category?.id);
                    this.productForm.countInStock.setValue(product.countInStock);
                    this.productForm.isFeatured.setValue(product.isFeatured);
                    this.productForm.richDescription.setValue(product.richDescription);
                    this.imageDisplay = product.image;
                    this.productForm.image.setValue(product.image);
                    this.productForm.image.setValidators([]);
                    this.productForm.image.updateValueAndValidity();
                });
            }
        });
    }

    /**
     * Getter du formulaire
     * @returns FormGroup
     */
    get productForm() {
        return this.form.controls;
    }

    /**
     * Methode qui permet de retourner en arrière au click du button "Cancel"
     * @return void
     */
    goBack() {
        this.location.back();
    }

    /**
     * methode declenché au click du button "Create" ou "Update"
     * vérifie la validité des champs du formulaire
     * @returns void
     */
    onSubmit() {
        this.isSubmitted = true;
        if (this.form.invalid) {
            return;
        }

        const productFormData = new FormData();

        Object.keys(this.productForm).map((key) => {
            productFormData.append(key, this.productForm[key].value);
        });

        if (this.editMode) {
            productFormData.append('id', this.currentProductId);
            this._updateCategory(productFormData);
        } else {
            this._addCategory(productFormData);
        }
    }

    /**
     * Methode qui permet de faire la mise à jour d'une Categorie
     * @param product l'objet categorie à mettre à jour
     */
    private _updateCategory(productData: FormData) {
        this.productsService.updateProduct(productData).subscribe(
            (response: Product) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: `product ${response.name} is update`
                });
                // Delai avant la rédirection vers la page précedente
                timer(1500)
                    .toPromise()
                    .then(() => {
                        this.goBack();
                    });
            },
            () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'product is not update !'
                });
            }
        );
    }

    /**
     * Methode qui permet de créer une categorie
     * @param product : l'objet categorie à insérer
     * @method subscribe (fnCallbackSuccess, fnCallbackError, fnCallbackComplete)
     */
    private _addCategory(productData: FormData) {
        this.productsService.createProduct(productData).subscribe(
            (response: Product) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: `product ${response.name} is created`
                });
                // Delai avant la rédirection vers la page précedente
                timer(1500)
                    .toPromise()
                    .then(() => {
                        this.goBack();
                    });
            },
            () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'product is not created !'
                });
            }
        );
    }

    /**
     * Methode qui pemet de uploader une image
     * @method patchValue() ajouter un champ une valeur dans un FormGroup
     * @method updateValueAndValidity notifie s'il y a eu changement dans le formulaire
     * @param event : le fichier image to upload
     */
    onImageUpdload(event: any) {
        const file = event.target.files[0];
        if (file) {
            this.form.patchValue({ image: file });
            this.form.get('image')?.updateValueAndValidity();
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                this.imageDisplay = fileReader.result;
            };
        }
    }
}
