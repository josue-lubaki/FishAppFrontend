import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { ProductsComponent } from './pages/products/products.component';
import { UsersComponent } from './pages/users/users.component';
import { ReservationsComponent } from './pages/reservations/reservations.component';

@NgModule({
  declarations: [AppComponent, ShellComponent, SidebarComponent, CategoriesComponent, DashboardComponent, OrdersComponent, ProductsComponent, UsersComponent, ReservationsComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
  exports: [
    ShellComponent,
    SidebarComponent,
    CategoriesComponent,
    DashboardComponent,
    OrdersComponent,
    ProductsComponent,
    UsersComponent,
    ReservationsComponent
  ],
})
export class AppModule {}
