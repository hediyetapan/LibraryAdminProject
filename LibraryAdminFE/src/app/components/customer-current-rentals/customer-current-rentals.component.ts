import {  Component, ElementRef, ViewChild } from '@angular/core';
import { rentalHistory } from 'src/app/models/RentalHistory';
import { Book } from 'src/app/models/book';
import { Customer } from 'src/app/models/customer';
import { BookService } from 'src/app/services/book.service';
import { CustomerService } from 'src/app/services/customer.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable, fromEvent, of } from 'rxjs';


@Component({
  selector: 'app-customer-current-rentals',
  templateUrl: './customer-current-rentals.component.html',
  styleUrls: ['./customer-current-rentals.component.css']
})
export class CustomerCurrentRentalsComponent {
  @ViewChild("customerName") customerName!: ElementRef<HTMLInputElement>;
  customers: Customer[] = [];
  rentals: rentalHistory[] = [];
  books: Book[] = [];
  filteredCustomers: Customer[] = [];


  constructor(private customerService: CustomerService,
    private bookService: BookService) { }

  ngOnInit() {
    this.customerService.getAllCustomers()
      .subscribe((result) => {
        this.customers = result;
      });
    this.bookService.getAllBooks()
      .subscribe(result => this.books = result);
  }
  ngAfterViewInit() {
    if (this.customerName) {
      fromEvent(this.customerName.nativeElement, 'input')
        .pipe(
          debounceTime(300),
          distinctUntilChanged(),
          switchMap(() => this.filterCustomers())
        )
        .subscribe((filteredCustomers) => {
          console.log(filteredCustomers);
        });
    }
  }

  

  filterCustomers(): Observable<Customer[]> {
    const inputValue = this.customerName.nativeElement.value.toLowerCase();

    // Use the most recent value of customers
    const filteredCustomers = this.customers.filter((customer) =>
      `${customer.firstName} ${customer.lastName}`.toLowerCase().includes(inputValue)
    );

    this.filteredCustomers = filteredCustomers;
    return of(this.filteredCustomers);
  }

  //this function only works for one name customers
  customerExists() {
    const customerNameValue = this.customerName.nativeElement.value;
    if (!customerNameValue) {
      return -1; // If the input is empty, consider it as not existing
    }

    const customerInitials = customerNameValue.split(" ", 2);
    const foundCustomer = this.customers.find(customer =>
      customer.firstName === customerInitials[0] && customer.lastName === customerInitials[1]
    );

    return foundCustomer ? foundCustomer.id : -1;
  }

  onSearch() {
    this.filterCustomers()
      .subscribe(filteredCustomers => {
        // Handle the filtered customers as needed
        console.log(filteredCustomers);
        this.fetchRentals(this.customerExists());
      });
  }

  fetchRentals(customerId: number) {
    // Assuming you have a method in your service to fetch rentals for a given customer
    this.customerService.getCustomerCurrentRentals(customerId)
      .subscribe(result => {
        this.rentals = result;
        console.log(this.rentals);
      });
  }

  onSearchCheck(): string {

    if (this.customerExists() != -1) {
      console.log("customer exists");
      return "Customer Exists";
    } else {
      console.log("customer does not exist");
      return "Customer Does not Exist";
    }

  }

  dateRegulator(date: Date): string {
    let day = "";
    let month = "";
    let year = "";
    let splittedDate = date.toLocaleString().substring(0, 10);
    return splittedDate;
  }

  getBookName(bookId: number | undefined,
    rentDate: Date): string {
    let returnString: string = "";
    //let bookIndexInBooks:number = -1;
    for (let i = 0; this.books.length; i++) {
      if (this.books[i].id == bookId) {
        returnString = this.books[i].name + " - ";
        returnString += this.dateRegulator(rentDate);
        return returnString;
      }
    }

    return "Have an issue with fetching data of book:id=" + bookId;
  }
}
