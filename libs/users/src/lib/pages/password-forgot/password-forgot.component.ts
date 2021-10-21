/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'users-password-forgot',
    templateUrl: './password-forgot.component.html',
    styles: []
})
export class PasswordForgotComponent implements OnInit {
    passwordFormGroup!: FormGroup;
    isSubmitted = false;
    isSubmittedResponse = false;
    isSubmittedPassword = false;
    authErrorMessage = 'Email or Phone number are wrong';
    goToAnotherPage: any;
    question: any;
    idUser: any;
    isValidResponseSecure = false;
    messageFinale = '';

    constructor(
        private formBuilder: FormBuilder,
        private auth: AuthService,
        private route: ActivatedRoute,
    ) {}

    ngOnInit(): void {
        this._initLoginForm();
        this.route.queryParamMap.subscribe((params) => {
            this.goToAnotherPage = params || false;
        });
    }

    private _initLoginForm() {
        this.passwordFormGroup = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            response: ['', Validators.required],
            newPassword: ['', Validators.required]
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
        if (this.passwordForm.email.valid) this._requestQuestion();
        if (this.passwordForm.response.valid) this._requestResponse();
        if (this.passwordForm.newPassword.valid) this._changePassword();
    }

    private _requestQuestion() {
        this.isSubmitted = true;
        if (this.passwordForm.email.value === '') return;
        this.auth
            .retrieveSecureQuestion(this.passwordForm.email.value.toLowerCase())
            .subscribe(
                (response) => {
                    this.idUser = response.id;
                    this.question = response;
                },
                (error) => {
                    if (error.status !== 400)
                        this.authErrorMessage =
                            'Error in the server, please try again later';
                    else this.authErrorMessage = error.error;
                }
            );
        this.passwordForm.email.reset();
    }

    private _requestResponse() {
        this.isSubmittedResponse = true;
        if (this.passwordForm.response.value === '') return;
        this.auth.verifyResponse(this.passwordForm.response.value, this.idUser).subscribe(
            (response) => {
                this.isValidResponseSecure = response.success;
            },
            (error) => {
                if (error.status !== 400)
                    this.authErrorMessage = 'Error in the server, please try again later';
                else this.authErrorMessage = error.error;
            }
        );
        this.passwordForm.response.reset();
    }

    private _changePassword() {
        this.isSubmittedPassword = true;
        if (this.passwordForm.newPassword.value === '') return;

        this.auth
            .resetPassword(this.passwordForm.newPassword.value, this.idUser)
            .subscribe(
                (message) => {
                    this.messageFinale = message;
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
