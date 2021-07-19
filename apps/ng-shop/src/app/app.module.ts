import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ProductsModule } from '@ghost/products';
import { UiModule } from '@ghost/ui';
import { AccordionModule } from 'primeng/accordion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './shared/nav/nav.component';
import { FormBuilder, NgModel } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { OrdersModule } from '@ghost/orders';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { MessagesComponent } from './shared/messages/messages.component';
import { GalleriaModule } from 'primeng/galleria';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const routes: Routes = [{ path: '', component: HomePageComponent }];

// register plugins
gsap.registerPlugin(ScrollTrigger);

@NgModule({
    declarations: [
        AppComponent,
        HomePageComponent,
        HeaderComponent,
        FooterComponent,
        NavComponent,
        MessagesComponent
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
        GalleriaModule
    ],
    providers: [FormBuilder, NgbModal, NgModel, MessageService, GalleriaModule],
    bootstrap: [AppComponent],
    exports: [MessagesComponent]
})
export class AppModule {}
