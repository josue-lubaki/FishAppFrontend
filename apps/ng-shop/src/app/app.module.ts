import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { UsersModule, JwtInfoUser } from '@ghost/users';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuardClient } from '@ghost/users';

import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ProductsModule } from '@ghost/products';
import { UiModule } from '@ghost/ui';
import { AccordionModule } from 'primeng/accordion';
import { FieldsetModule } from 'primeng/fieldset';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './shared/nav/nav.component';
import { FormBuilder, NgModel } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { OrdersModule } from '@ghost/orders';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessagesComponent } from './shared/messages/messages.component';
import { GalleriaModule } from 'primeng/galleria';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { UserOrdersComponent } from './pages/user-orders/user-orders.component';
import { UserReservationsComponent } from './pages/user-reservations/user-reservations.component';
import { TermsComponent } from './pages/terms/terms.component';

const routes: Routes = [
    {
        path: '',
        component: HomePageComponent
    },
    {
        path: 'compte',
        component: UserPageComponent,
        canActivate: [AuthGuardClient]
    },
    {
        path: 'compte/orders',
        redirectTo: 'compte'
    },
    {
        path: 'compte/orders/:id',
        component: UserOrdersComponent,
        canActivate: [AuthGuardClient]
    },
    {
        path: 'compte/reservation/:id',
        component: UserReservationsComponent,
        canActivate: [AuthGuardClient]
    },
    {
        path: 'terms-confidentiality',
        component: TermsComponent
    },
    { path: '**', redirectTo: '' }
];

// register plugins
gsap.registerPlugin(ScrollTrigger);

@NgModule({
    declarations: [
        AppComponent,
        HomePageComponent,
        HeaderComponent,
        FooterComponent,
        NavComponent,
        MessagesComponent,
        UserPageComponent,
        UserOrdersComponent,
        UserReservationsComponent,
        TermsComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes),
        AccordionModule,
        HttpClientModule,
        BrowserAnimationsModule,
        ProductsModule,
        UiModule,
        OrdersModule,
        ToastModule,
        GalleriaModule,
        UsersModule,
        FieldsetModule,
        DividerModule,
        TableModule,
        CardModule,
        ButtonModule,
        TagModule,
        DropdownModule,
        FormsModule,
        ReactiveFormsModule,
        ConfirmDialogModule,
        InputTextareaModule
    ],
    providers: [
        FormBuilder,
        NgbModal,
        NgModel,
        MessageService,
        GalleriaModule,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInfoUser,
            multi: true // Token utilisé pour toutes les requêtes
        },
        ConfirmationService
    ],
    bootstrap: [AppComponent],
    exports: [
        MessagesComponent,
        UserPageComponent,
        UserOrdersComponent,
        UserReservationsComponent,
        TermsComponent
    ]
})
export class AppModule {}
