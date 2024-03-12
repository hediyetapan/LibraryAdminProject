import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BooksComponent } from './components/books/books.component';
import { CustomersComponent } from './components/customers/customers.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DeleteBookComponent } from './components/delete-book/delete-book.component';
import { FormsModule } from '@angular/forms';
import { RentBookComponent } from './components/rent-book/rent-book.component';
import { DeliverBookComponent } from './components/deliver-book/deliver-book.component';
import { DeleteCustomerComponent } from './components/delete-customer/delete-customer.component';
import { CustomerCurrentRentalsComponent } from './components/customer-current-rentals/customer-current-rentals.component';
import { CustomerRentalHistoryComponent } from './components/customer-rental-history/customer-rental-history.component';
import { RentedByComponent } from './components/rented-by/rented-by.component';
import { SearchBookComponent } from './components/search-book/search-book.component';
import { SearchCustomerComponent } from './components/search-customer/search-customer.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BooksComponent,
    CustomersComponent,
    DeleteBookComponent,
    RentBookComponent,
    DeliverBookComponent,
    DeleteCustomerComponent,
    CustomerCurrentRentalsComponent,
    CustomerRentalHistoryComponent,
    RentedByComponent,
    SearchBookComponent,
    SearchCustomerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
