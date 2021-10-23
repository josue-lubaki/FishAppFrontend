/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'users-passaword-reset',
    templateUrl: './passaword-reset.component.html',
    styles: []
})
export class PassawordResetComponent implements OnInit {
    passwordFormGroup!: FormGroup;
    isSubmittedPassword = false;
    idUser: any;
    isValidResponseSecure = false;
    messageFinale = '';
    authErrorMessage = 'Email or Phone number are wrong';
    constructor(
        private auth: AuthService,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit(): void {
        this._initLoginForm();
    }

    private _initLoginForm() {
        // this.idUser = this.route.snapshot.paramMap.get('id');
        // console.log('idUser - reset', this.idUser);
        this.route.params.subscribe((params) => {
            this.idUser = params.idUser;
        });

        this.passwordFormGroup = this.formBuilder.group({
            newPassword: [{ value: '', disabled: false }, Validators.required]
        });
    }

    get passwordForm() {
        return this.passwordFormGroup.controls;
    }

    /**
     * Methode qui permet de vérifier la connexion de l'Utilisateur
     * @returns void
     */
    onSubmit() {
        if (this.passwordForm.newPassword.valid) this._changePassword();
    }

    private _changePassword() {
        this.isSubmittedPassword = true;
        if (this.passwordForm.newPassword.value === '') return;
        this.auth
            .resetPassword(this.passwordForm.newPassword.value, this.idUser)
            .subscribe(
                (message) => {
                    this.messageFinale = message;

                    //  setInterval 1 seconde
                    setTimeout(() => {
                        this.router.navigate(['/login']);
                    }, 1500);
                },
                (error) => {
                    if (error.status !== 400)
                        this.authErrorMessage =
                            'Error in the server, please try again later';
                    else this.authErrorMessage = error.error;
                }
            );

        this.passwordForm.newPassword.reset();
    }
}
