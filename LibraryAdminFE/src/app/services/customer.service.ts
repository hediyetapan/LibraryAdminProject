import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Customer } from '../models/customer';
import { rentalHistory } from '../models/RentalHistory';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private customersSubject = new BehaviorSubject<Customer[]>([]);
  customers$ = this.customersSubject.asObservable();

  private getAllCustomersUrl = "Customer/GetCustomers";
  private rentBookUrl = "Customer/RentBook";
  private deliverBookUrl = "Customer/DeliverBook";
  private updateCustomerUrl = "Customer/UpdateBook";
  private deleteCustomerUrl = "Customer/DeleteCustomer";
  private addCustomerUrl = "Customer/AddCustomer";
  private getCustomerCurrentRentalsUrl = "Customer/GetCustomersCurrentRentals?CId=";
  private getCustomerPreviousRentalsUrl = "Customer/GetCustomersPreviousRentals?CId="

  constructor(private http: HttpClient) { }

  public getAllCustomers(): Observable<Customer[]>{
    this.http.get<Customer[]>(`${environment.apiUrl}/${this.getAllCustomersUrl}`)
      .subscribe(customers => this.customersSubject.next(customers));
    return this.customers$;
  }

  public rentBook(customerId: number, bookId: number): Observable<Customer[]>{
    
    return this.http.put<Customer[]>(`${environment.apiUrl}/${this.rentBookUrl}?CId=${customerId}&BId=${bookId}`,customerId)
      .pipe(
        switchMap(updatedCustomers => {
          this.customersSubject.next(updatedCustomers);
          return of(updatedCustomers);
        })
      );
  
  }

  public deliverBook(customerId: number, bookId: number): Observable<Customer[]>{
    return this.http.put<Customer[]>(`${environment.apiUrl}/${this.deliverBookUrl}?CId=${customerId}&BId=${bookId}`,customerId)
      .pipe(
        switchMap(updatedCustomers => {
          this.customersSubject.next(updatedCustomers);
          return of(updatedCustomers);
        })
      );
  }

  public updateCustomer(customer: Customer): Observable<Customer[]>{
    return this.http.put<Customer[]>(`${environment.apiUrl}/${this.updateCustomerUrl}`,customer);
  }
  
  public deleteCustomer(customerId: number): Observable<Customer[]>{
    return this.http.delete<Customer[]>(`${environment.apiUrl}/${this.deleteCustomerUrl}/${customerId}`);
  }

  public addCustomer(customer: Customer): Observable<Customer[]>{
    return this.http.post<Customer[]>(`${environment.apiUrl}/${this.addCustomerUrl}`,customer);
  }

  public getCustomerCurrentRentals(id: number): Observable<rentalHistory[]>{
    return this.http.get<rentalHistory[]>(`${environment.apiUrl}/${this.getCustomerCurrentRentalsUrl}${id}`);
  }

  public getCustomersPreviousRentals(id: number): Observable<rentalHistory[]>{
    return this.http.get<rentalHistory[]>(`${environment.apiUrl}/${this.getCustomerPreviousRentalsUrl}${id}`);
  }
}
