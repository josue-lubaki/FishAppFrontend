import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LocalstorageService, User, UsersService } from '@ghost/users';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { Buffer } from 'buffer';
@Component({
    selector: 'admin-users-form',
    templateUrl: './users-form.component.html',
    styles: []
})
export class UsersFormComponent implements OnInit {
    form!: FormGroup;
    isSubmitted = false;
    editMode = false;
    currentUserId!: string;
    color!: string;
    countries: any = [];

    constructor(
        private formBuilder: FormBuilder,
        private usersService: UsersService,
        private messageService: MessageService,
        private location: Location,
        private route: ActivatedRoute,
        private localstorageToken: LocalstorageService
    ) {}

    ngOnInit(): void {
        this.initUserForm();
        this._getCountries();
        this._checkEditMode();
    }

    /**
     * Methode qui permet de récupérer la liste de tous les pays
     * @see https://www.npmjs.com/package/i18n-iso-countries
     */
    private _getCountries() {
        this.countries = this.usersService.getCountries();
    }

    /**
     * Methode qui permet d'initialiser les contenus du formulaire dont on a besoin
     * @see Validators : permet de spécifier les validations de nos champs (required, email, etc...)
     * @return FormGroup
     */
    initUserForm() {
        this.form = this.formBuilder.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            phone: ['', [Validators.required]],
            isAdmin: [false],
            avenue: [''],
            apartment: [''],
            quartier: [''],
            commune: [''],
            city: [''],
            country: ['']
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
                this.currentUserId = params.id;
                const currentUserToken = this.localstorageToken.getToken();
                let tokenDecode: any;
                if (currentUserToken && typeof currentUserToken !== 'undefined') {
                    // Décoder le token si existe
                    tokenDecode = JSON.parse(atob(currentUserToken.split('.')[1]));
                }

                this.usersService.getUser(params.id).subscribe((user) => {
                    this.userForm.name.setValue(user.name);
                    this.userForm.email.setValue(user.email);
                    this.userForm.isAdmin.setValue(tokenDecode.isAdmin);
                    this.userForm.avenue.setValue(user.avenue);
                    this.userForm.apartment.setValue(user.apartment);
                    this.userForm.phone.setValue(user.phone);
                    this.userForm.quartier.setValue(user.quartier);
                    this.userForm.commune.setValue(user.commune);
                    this.userForm.city.setValue(user.city);
                    this.userForm.country.setValue(user.country);

                    /** Enlever l'obligation du password et phone donnée sur @method initUserForm */
                    this.userForm.password.setValidators([]);
                    this.userForm.password.updateValueAndValidity();
                    this.userForm.phone.setValidators([]);
                    this.userForm.phone.updateValueAndValidity();
                });
            }
        });
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

        const user: User = {
            id: this.currentUserId,
            name: this.userForm.name.value,
            email: this.userForm.email.value,
            password: this.userForm.password.value,
            phone: this.userForm.phone.value,
            isAdmin: this.userForm.isAdmin.value,
            avenue: this.userForm.avenue.value,
            apartment: this.userForm.apartment.value,
            quartier: this.userForm.quartier.value,
            commune: this.userForm.commune.value,
            city: this.userForm.city.value,
            country: this.userForm.country.value
        };

        if (this.editMode) {
            this._updateUser(user);
        } else {
            this._addUser(user);
        }
    }

    /**
     * Methode qui permet de faire la mise à jour d'un Utilisateur
     * @param user l'objet User à mettre à jour
     */
    private _updateUser(user: User) {
        this.usersService.updateUser(user).subscribe(
            (response: User) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: `Utilisateur ${response.name} a été modifier`
                });
                // Delai avant la rédirection vers la page précedente
                timer(1500)
                    .toPromise()
                    .then(() => {
                        this.onCancel();
                    });
            },
            () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: "L'Utilisateur n'a pas été modifier !"
                });
            }
        );
    }

    /**
     * Methode qui permet de créer un Utilisateur
     * @param user : l'objet User à insérer
     * @method subscribe (fnCallbackSuccess, fnCallbackError, fnCallbackComplete)
     */
    private _addUser(user: User) {
        this.usersService.createUser(user).subscribe(
            (response: User) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: `Category ${response.name} is created`
                });
                // Delai avant la rédirection vers la page précedente
                timer(1500)
                    .toPromise()
                    .then(() => {
                        this.onCancel();
                    });
            },
            (error) => {
                console.log(error);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Category is not created !'
                });
            }
        );
    }

    /**
     * Getter du formulaire
     * @returns FormGroup
     */
    get userForm() {
        return this.form.controls;
    }

    /**
     * Methode qui permet de retourner en arrière au click du button "Cancel"
     * @return void
     */
    onCancel() {
        this.location.back();
    }
}
