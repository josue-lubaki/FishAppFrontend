/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { User } from '../../models/user';
import { UsersService } from '../../services/users.service';
import { AuthService } from '../../services/auth.service';
import { LocalstorageService } from '@ghost/users';

@Component({
    selector: 'users-register',
    templateUrl: './register.component.html',
    styles: []
})
export class RegisterComponent implements OnInit {
    form!: FormGroup;
    isSubmitted = false;
    currentUserId!: string;
    color!: string;
    countries: any = [];
    numeroPhone: any;

    constructor(
        private formBuilder: FormBuilder,
        private usersService: UsersService,
        private authService: AuthService,
        private messageService: MessageService,
        private location: Location,
        private router: Router,
        private localstorage: LocalstorageService
    ) {}

    ngOnInit(): void {
        this.initUserForm();
        this._getCountries();
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
            email: [''],
            password: ['', Validators.required],
            phone: ['', [Validators.required]],
            isAdmin: [false],
            avenue: [''],
            apartment: [''],
            quartier: [''],
            commune: [''],
            city: [''],
            country: [''],
            question: [''],
            reponse: ['']
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
            country: this.userForm.country.value,
            question: this.userForm.question.value,
            reponse: this.userForm.reponse.value
        };

        this._register(user);
    }

    /**
     * Methode qui permet d'inscrire un nouve Utilisateur
     * @param user : l'objet User à insérer
     * @method subscribe (fnCallbackSuccess, fnCallbackError, fnCallbackComplete)
     */
    private _register(user: User) {
        this.authService.registerUser(user).subscribe(
            (response: any) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: `Bienvenue ${response.name} !!!`
                });

                // Enregistrer le Token
                this.localstorage.setToken(response.token);

                // Enregister l'ID de l'Utilisateur
                this.localstorage.setUserCurrent(response.id);

                // Delai avant la rédirection vers la page précedente
                timer(1500)
                    .toPromise()
                    .then(() => {
                        this.router.navigate(['/']);
                    });
            },
            (error) => {
                console.log(error);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: ' Echec !'
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
