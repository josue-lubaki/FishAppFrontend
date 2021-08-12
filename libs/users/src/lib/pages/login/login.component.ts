/* eslint-disable prefer-const */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../services/auth.service';
import { LocalstorageService } from '../../services/localstorage.service';

declare const FB: any;

@Component({
    selector: 'users-login',
    templateUrl: './login.component.html',
    styles: []
})
export class LoginComponent implements OnInit {
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
        private route: ActivatedRoute,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        this._initLoginForm();
        this.route.queryParamMap.subscribe((params) => {
            this.goToAnotherPage = params || false;
        });

        (window as any).fbAsyncInit = function () {
            FB.init({
                appId: '4611219792244176',
                cookie: true,
                xfbml: true,
                version: 'v11.0'
            });

            FB.AppEvents.logPageView();
        };

        (function (d, s, id) {
            let js: any,
                fjs: any = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement(s);
            js.id = id;
            js.src = 'https://connect.facebook.net/en_US/sdk.js';
            fjs.parentNode.insertBefore(js, fjs);
        })(document, 'script', 'facebook-jssdk');
    }

    submitLogin() {
        console.log('Submit login to Facebook');
        FB.login((response: any) => {
            console.log('SubmitLogin', response);
            if (response.authResponse) {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'En développement'
                });
            } else {
                this.messageService.add({
                    severity: 'danger',
                    summary: 'Success',
                    detail: 'Login failed'
                });
            }
        });
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
