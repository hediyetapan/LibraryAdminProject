import { Component, ElementRef, ViewChild } from '@angular/core';
import { fromEvent, debounceTime, distinctUntilChanged, switchMap, Observable, of } from 'rxjs';
import { rentalHistory } from 'src/app/models/RentalHistory';
import { Book } from 'src/app/models/book';
import { Customer } from 'src/app/models/customer';
import { BookService } from 'src/app/services/book.service';
import { CustomerService } from 'src/app/services/customer.service';
import { RentalHistoryService } from 'src/app/services/rental-history.service';

@Component({
  selector: 'app-rent-book',
  templateUrl: './rent-book.component.html',
  styleUrls: ['./rent-book.component.css']
})
export class RentBookComponent {
  @ViewChild("bookName") bookName!: ElementRef<HTMLInputElement>;
  @ViewChild("customerName") customerName!: ElementRef<HTMLInputElement>;

  books: Book[] = [];
  rentals: rentalHistory[] = [];
  customers: Customer[] = [];

  filteredBooks: Book[] = [];
  filteredCustomers: Customer[] = [];


  constructor(private bookService: BookService,
    private rentalService: RentalHistoryService,
    private customerService: CustomerService) { }

  ngOnInit() {
    this.bookService.getAllBooks()
      .subscribe((result: Book[]) => this.books = result);
    this.rentalService.getAllRentalHistories()
      .subscribe((result: any) => this.rentals = result);
    this.customerService.getAllCustomers()
      .subscribe((result: any) => this.customers = result)
  }

  ngAfterViewInit() {
    if (this.bookName) {
      fromEvent(this.bookName.nativeElement, 'input')
        .pipe(
          debounceTime(300),
          distinctUntilChanged(),
          switchMap(() => this.filterBooks())
        )
        .subscribe((filteredBooks) => {
          console.log(filteredBooks);
        });
    }

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

  filterBooks(): Observable<Book[]> {
    const inputValue = this.bookName.nativeElement.value.toLowerCase();

    // Use the most recent value of customers
    const filteredBooks = this.books.filter((book) =>
      `${book.name}`.toLowerCase().includes(inputValue)
    );

    this.filteredBooks = filteredBooks;
    return of(this.filteredBooks);
  }

  //returns id of the book or -1
  bookExists() {
    const bookNameValue = this.bookName.nativeElement.value;
    if (!bookNameValue) {
      return -1; // If the input is empty, consider it as not existing
    }

    
    const foundBook = this.books.find(book =>
      book.name === bookNameValue 
    );

    return foundBook ? foundBook.id : -1;
  }

  //returns id of the customer or -1
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

  isBookRented(idOfBook: number, idOfCustomer: number) {
    for (let i = 0; i < this.rentals.length; i++) {
      if (this.rentals[i].bookId == idOfBook &&
        this.rentals[i].customerId == idOfCustomer) {
        if (this.rentals[i].deliverDate == null) {
          return true;
        }
      }
    }
    return false;
  }

  onRentCheck(): string {

    let idOfBook: number | undefined = -1;
    let idOfCustomer = -1;
    //search if book exists:
    if (this.bookExists() != -1) {

      idOfBook = this.bookExists();
      //console.log("book exists");

      //search if customer exists:
      if (this.customerExists() != -1) {

        idOfCustomer = this.customerExists();
        //console.log("customer exists");

        //search if book is rented
        if (this.isBookRented(idOfBook, idOfCustomer)) {
          //console.log("book is currently rented")
          return "Book Is Currently Rented"
        } else {
          //console.log("book is not currently rented");
          //this.customerService.rentBook(idOfCustomer, idOfBook).subscribe();
          return "Success";
        }

      } else {
        //console.log("customer does not exist");
        return "Customer Does Not Exist"
      }

    } else {
      //console.log("book does not exist");
      return "Book Does Not Exist"
    }

  }

  onRent(){
    console.log("rent clicked")
    let idOfBook = this.bookExists();
    console.log(idOfBook);
    let idOfCustomer = this.customerExists();
    console.log(idOfCustomer); // returns -1
    if(this.onRentCheck() == "Success"){
      this.customerService.rentBook(idOfCustomer, idOfBook).subscribe();
      console.log("id:  ");
      console.log(idOfBook);
    }
  
  }
}



