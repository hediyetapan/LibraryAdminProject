import { Routes } from '@angular/router';
 
import { BooksComponent } from './components/books/books.component';
import { CustomersComponent } from './components/customers/customers.component';
 
export const appRoutes: Routes = [
  { path: 'books', component: BooksComponent },
  { path: 'customers', component: CustomersComponent },
  { path: '', redirectTo: 'books', pathMatch: 'full' }
];