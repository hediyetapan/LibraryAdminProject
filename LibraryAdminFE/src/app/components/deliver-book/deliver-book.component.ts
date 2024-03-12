import { Component, ElementRef, ViewChild } from '@angular/core';
import { rentalHistory } from 'src/app/models/RentalHistory';
import { Book } from 'src/app/models/book';
import { Customer } from 'src/app/models/customer';
import { BookService } from 'src/app/services/book.service';
import { CustomerService } from 'src/app/services/customer.service';
import { RentalHistoryService } from 'src/app/services/rental-history.service';

@Component({
  selector: 'app-deliver-book',
  templateUrl: './deliver-book.component.html',
  styleUrls: ['./deliver-book.component.css']
})
export class DeliverBookComponent {
  @ViewChild("bookName") bookName!: ElementRef<HTMLInputElement>;
  @ViewChild("customerName") customerName!: ElementRef<HTMLInputElement>;

  books: Book[] = [];
  rentals: rentalHistory[] = [];
  customers: Customer[] = [];

  constructor(private bookService: BookService,
    private rentalService: RentalHistoryService,
    private customerService: CustomerService) { }

  ngOnInit() {
    //setTimeout(() => { this.ngOnInit(); }, 1000 * 1);
    this.bookService.getAllBooks()
      .subscribe((result: Book[]) => this.books = result);
    this.rentalService.getAllRentalHistories()
      .subscribe((result: any) => this.rentals = result);
    this.customerService.getAllCustomers()
      .subscribe((result: any) => this.customers = result)
  }

  //returns id of the book or -1
  bookExists() {
    let bookExists = false;
    for (let i = 0; i < this.books.length; i++) {
      if (this.books[i].name == this.bookName.nativeElement.value) {
        bookExists = true;
        return this.books[i].id;
      }
    }
    return -1;
  }

  //returns id of the customer or -1
  customerExists() {
    let customerExists = false;
    for (let i = 0; i < this.customers.length; i++) {
      let customerFullName = this.customers[i].firstName + " " + this.customers[i].lastName;
      if (customerFullName == this.customerName.nativeElement.value) {
        customerExists = true;
        return this.customers[i].id;
      }
    }
    return -1;
  }

  isBookRented(idOfBook: number, idOfCustomer: number) {
    for (let i = 0; i < this.rentals.length; i++) {
      if (this.rentals[i].bookId == idOfBook /*&&
        this.rentals[i].customerId == idOfCustomer*/) {
        if (this.rentals[i].deliverDate == null) {
          return true;
        }
      }
    }
    return false;
  }

  isBookRentedByThisCustomer(idOfBook: number, idOfCustomer: number){
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

  onDeliverCheck(): string {

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
          //console.log("book is currently rented");
          if (this.isBookRentedByThisCustomer(idOfBook,idOfCustomer)){
            //console.log("Book is rented by this customer");
            return "Success";
          } else {
            //console.log("book is not rented by this customer");
            return "Rental Mismatch";
          }
        } else {
          //console.log("book is not currently rented");
          return "Book Is Not Rented";
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

  onDeliver(){
    let idOfBook = this.bookExists();
    let idOfCustomer = this.customerExists();
    if(this.onDeliverCheck() == "Success"){
      this.customerService.deliverBook(idOfCustomer, idOfBook).subscribe();
    }
  }
}
