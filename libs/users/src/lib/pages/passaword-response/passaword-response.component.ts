/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'users-passaword-response',
    templateUrl: './passaword-response.component.html',
    styles: []
})
export class PassawordResponseComponent implements OnInit {
    passwordFormGroup!: FormGroup;
    isSubmittedResponse = false;
    idUser: any;
    question: any;
    authErrorMessage = 'Mauvaise réponse';
    constructor(
        private auth: AuthService,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.isSubmittedResponse = false;
        this._initLoginForm();
    }

    private _initLoginForm() {
        // this.question = this.route.snapshot.paramMap.get('question');
        // this.idUser = this.route.snapshot.paramMap.get('id');
        this.route.params.subscribe((params) => {
            this.idUser = params.idUser;
            this.question = params.question;
        });
        this.passwordFormGroup = this.formBuilder.group({
            response: ['', Validators.required]
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
        this.isSubmittedResponse = false;
        if (this.passwordForm.response.valid) this._requestResponse();
        // if (this.passwordForm.newPassword.valid) this._changePassword();
    }

    private _requestResponse() {
        if (this.passwordForm.response.value === '') {
            this.isSubmittedResponse = false;
            return;
        }

        this.isSubmittedResponse = true;

        console.log(
            'Je suis sur le point de vérifier response, voici idUser',
            this.idUser
        );
        this.auth.verifyResponse(this.passwordForm.response.value, this.idUser).subscribe(
            () => {
                // this.router.navigate(['/password-reset', { id: this.idUser }]);
                this.router.navigate([`/password-reset/${this.idUser}`]);
            },
            (error) => {
                if (error.status !== 400)
                    this.authErrorMessage = 'Error in the server, please try again later';
                else this.authErrorMessage = error.error;
            }
        );
        this.passwordForm.response.reset();
    }
}
