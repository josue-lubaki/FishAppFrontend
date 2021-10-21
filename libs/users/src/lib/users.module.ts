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
    declarations: [LoginComponent, RegisterComponent, PasswordForgotComponent],
    exports: [RegisterComponent, PasswordForgotComponent]
})
export class UsersModule {}
