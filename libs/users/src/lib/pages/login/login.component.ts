import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LocalstorageService } from '../../services/localstorage.service';

@Component({
    selector: 'users-login',
    templateUrl: './login.component.html',
    styles: []
})
export class LoginComponent implements OnInit, OnDestroy {
    loginFormGroup!: FormGroup;
    isSubmitted = false;
    authError = false;
    authErrorMessage = 'Email or Password are wrong';
    goToAnotherPage: any;

    constructor(
        private formBuilder: FormBuilder,
        private auth: AuthService,
        private localstorageService: LocalstorageService,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this._initLoginForm();
        this.route.queryParamMap.subscribe((params) => {
            this.goToAnotherPage = params || false;
        });
    }

    @HostListener('unload')
    ngOnDestroy(): void {
        console.log('Login is destroy successful');
    }

    private _initLoginForm() {
        this.loginFormGroup = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }

    get loginForm() {
        return this.loginFormGroup.controls;
    }

    /**
     * Methode qui permet de vérifier la connexion de l'Utilisateur
     * @returns void
     */
    onSubmit() {
        this.isSubmitted = true;

        if (this.loginForm.email.value === '' || this.loginForm.password.value === '')
            return;

        this.auth
            .login(this.loginForm.email.value, this.loginForm.password.value)
            .subscribe(
                (user) => {
                    this.authError = false;
                    // save the token in my Local stockage
                    this.localstorageService.setToken(user.token);
                    this.localstorageService.setUserCurrent(user.id);

                    if (this.goToAnotherPage.params.compte) {
                        this.router.navigate(['compte']);
                    } else if (this.goToAnotherPage.params.checkout) {
                        this.router.navigate(['checkout']);
                    } else {
                        this.router.navigate(['/']);
                    }
                },
                (error) => {
                    this.authError = true;
                    console.log(error);
                    if (error.status !== 400)
                        this.authErrorMessage =
                            'Error in the server, please try again later';
                    else this.authErrorMessage = error.error;
                }
            );
    }
}
