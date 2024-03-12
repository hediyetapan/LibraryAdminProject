import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { rentalHistory } from 'src/app/models/RentalHistory';
import { Book } from 'src/app/models/book';
import { Customer } from 'src/app/models/customer';
import { BookService } from 'src/app/services/book.service';
import { CustomerService } from 'src/app/services/customer.service';
import { RentalHistoryService } from 'src/app/services/rental-history.service';

@Component({
  selector: 'app-rented-by',
  templateUrl: './rented-by.component.html',
  styleUrls: ['./rented-by.component.css']
})
export class RentedByComponent {
  @Input() inbook!: Book;

  books: Book[] = [];
  rentals: rentalHistory[] = [];
  customers: Customer[] = [];

  constructor(private bookService: BookService,
    private rentalService: RentalHistoryService,
    private customerService: CustomerService,
    private cd: ChangeDetectorRef) { }

  ngOnInit() {
    //setTimeout(() => { this.ngOnInit(); }, 1000 * 1);
    this.bookService.getAllBooks()
      .subscribe((result: Book[]) => this.books = result);
    this.rentalService.getAllRentalHistories()
      .subscribe((result: any) => this.rentals = result);
    this.customerService.customers$
      .subscribe((result: any) => {
        this.customers = result;
        //this.cd.detectChanges();
      })
  }

  //Methods for listing books:
  isRented(book: Book): number | undefined {
    for (let i = 0; i < this.rentals.length; i++) {
      if (this.rentals[i].deliverDate == null &&
        this.rentals[i].bookId == book.id) {
        return this.rentals[i].customerId;
      }
    }
    return 0;
  }
  getCustomerWhoRentedBook(id: number | undefined): string {
    for (let i = 0; i < this.customers.length; i++) {
      if (this.customers[i].id == id) {
        return this.customers[i].firstName + " " + this.customers[i].lastName;
      }
    }
    return "-";
  }
  getWhoRentedBook(book: Book): string {

    let isRented = this.isRented(book);
    //setTimeout(() => { this.ngOnInit(); }, 1000 * 1);
    if (isRented != 0) {
      //setTimeout(() => { this.ngOnInit(); }, 1000 * 1);
      return this.getCustomerWhoRentedBook(isRented);
    } else {
      //setTimeout(() => { this.ngOnInit(); }, 1000 * 1);
      return "-";
    }
  }
}
