import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { Observable, debounceTime, distinctUntilChanged, fromEvent, of, switchMap } from 'rxjs';
import { rentalHistory } from 'src/app/models/RentalHistory';
import { Book } from 'src/app/models/book';
import { Customer } from 'src/app/models/customer';
import { BookService } from 'src/app/services/book.service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-rental-history',
  templateUrl: './customer-rental-history.component.html',
  styleUrls: ['./customer-rental-history.component.css']
})
export class CustomerRentalHistoryComponent {
  @ViewChild("customerName") customerName!: ElementRef<HTMLInputElement>;
  customers: Customer[] = [];
  rentals: rentalHistory[] = [];
  books: Book[] = [];
  

  constructor(private customerService: CustomerService,
    private bookService: BookService) { }

  ngOnInit() {
    this.customerService.getAllCustomers()
      .subscribe((result) => {
        this.customers = result;
        this.filterCustomers()
          .subscribe(filteredCustomers => {
            console.log(filteredCustomers);
          });
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

  filteredCustomers: Customer[] = [];

  filterCustomers(): Observable<Customer[]> {
    if (this.customerName && this.customerName.nativeElement) {
      const inputValue = this.customerName.nativeElement.value.toLowerCase();

      
      this.filteredCustomers = this.customers.filter((customer) =>
        `${customer.firstName} ${customer.lastName}`.toLowerCase().includes(inputValue)
      );

      return of(this.filteredCustomers);
    }

    this.filteredCustomers = [];
    return of([]);
  }

  customerExists() {
    let customerInitials = [];
    for (let i = 0; i < this.customers.length; i++) {
      customerInitials = this.customerName.nativeElement.value.split(" ", 2);
      if (customerInitials[0] == this.customers[i].firstName &&
        customerInitials[1] == this.customers[i].lastName) {
        return this.customers[i].id;
      }
    }
    return -1;
  }

  onSearch() {
    if (this.onSearchCheck() == "Customer Exists") {
      this.customerService.getCustomersPreviousRentals(this.customerExists()).subscribe(result => {
        this.rentals = result;
        //this.cdRef.detectChanges();
        console.log(this.rentals);
      });
      console.log(this.rentals);
    } else if (this.onSearchCheck() == "Customer Does not Exist") {

    }
  }

  onSearchCheck(): string {
    let idOfCustomer: number = -1;

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
    return "undefined date";
  }

  getBookName(bookId: number | undefined,
    rentDate: Date,
    deliverDate: Date): string {
    let returnString: string = "";
    let bookIndexInBooks: number = -1;
    for (let i = 0; this.books.length; i++) {
      if (this.books[i].id == bookId) {
        returnString = this.books[i].name + " - ";
        returnString += this.dateRegulator(rentDate) + " - ";
        returnString += this.dateRegulator(deliverDate);
        return returnString;
      }
    }

    return "Have an issue with fetching data of book:id=" + bookId;
  }

}
