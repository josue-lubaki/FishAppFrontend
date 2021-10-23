import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { InputMaskModule } from 'primeng/inputmask';
import { PasswordModule } from 'primeng/password';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';
import { RegisterComponent } from './pages/register/register.component';
import { PasswordForgotComponent } from './pages/password-forgot/password-forgot.component';
import { PassawordResponseComponent } from './pages/passaword-response/passaword-response.component';
import { PassawordResetComponent } from './pages/passaword-reset/passaword-reset.component';

export const usersRoutes: Route[] = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'password-forgot',
        component: PasswordForgotComponent
    },
    {
        path: 'password-response/:idUser/:question',
        component: PassawordResponseComponent
    },
    {
        path: 'password-reset/:idUser',
        component: PassawordResetComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(usersRoutes),
        InputTextModule,
        ButtonModule,
        FormsModule,
        ReactiveFormsModule,
        ToastModule,
        InputMaskModule,
        PasswordModule,
        CardModule,
        ToolbarModule,
        DropdownModule,
        InputSwitchModule
    ],
    declarations: [
        LoginComponent,
        RegisterComponent,
        PasswordForgotComponent,
        PassawordResponseComponent,
        PassawordResetComponent
    ],
    exports: [
        RegisterComponent,
        PasswordForgotComponent,
        PassawordResponseComponent,
        PassawordResetComponent
    ]
})
export class UsersModule {}
