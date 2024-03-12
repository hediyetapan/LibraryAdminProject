import { ChangeDetectorRef, Component, Input, SimpleChange, SimpleChanges } from '@angular/core';
import { rentalHistory } from 'src/app/models/RentalHistory';
import { Book } from 'src/app/models/book';
import { Customer } from 'src/app/models/customer';
import { BookService } from 'src/app/services/book.service';
import { CustomerService } from 'src/app/services/customer.service';
import { RentalHistoryService } from 'src/app/services/rental-history.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { IconDefinition, faTrash, faWrench } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent {

  @Input() searchedItem = "";

  addedBook: Book = new Book();

  editingBook: any;

  deleteIcon: IconDefinition = faTrash
  updateIcon: IconDefinition = faWrench

  books: Book[] = [];
  rentals: rentalHistory[] = [];
  customers: Customer[] = [];

  deletedBookId: number | undefined;

  constructor(private bookService: BookService,
    private rentalService: RentalHistoryService,
    private customerService: CustomerService,
    private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.bookService.getAllBooks()
      .subscribe((result: Book[]) => this.books = result);
    this.rentalService.getAllRentalHistories()
      .subscribe((result: any) => this.rentals = result);
    this.customerService.customers$
      .subscribe((result: any) => {
        this.customers = result;
        //this.cd.detectChanges();
      })
    console.log(this.searchedItem)
  }

  filteredBooks(){
    let filteredBooks = this.books.filter(book =>
      book.name.includes(this.searchedItem));

    return filteredBooks;
  }

  onClick(): void {
    console.log(this.rentals);
    console.log(this.customers);
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
    
    if (isRented != 0) {
      
      return this.getCustomerWhoRentedBook(isRented);
    } else {
      
      return "-";
    }
  }
  

  //Methods for updating book:
  startEditing(book: Book): void {
    this.editingBook = book;
  }
  isEditing(book: Book) {
    return this.editingBook === book;
  }
  saveChanges(book: Book) {
    let newBook: Book = new Book();

    newBook.name = book.name;
    newBook.publishYear = book.publishYear;
    newBook.publisher = book.publisher;

    this.bookService.updateBook(book).subscribe();

    this.editingBook = null;
    
  }
  cancelChanges(book: Book) {
    
    this.editingBook = null;
    
  }

  //Methods for adding book:
  addNewBook() {

    if (this.addedBook.name != "") {
      let addBook: Book = new Book();

      addBook.name = this.addedBook.name;
      addBook.publisher = this.addedBook.publisher;
      addBook.publishYear = this.addedBook.publishYear;

      this.bookService.addBook(addBook).subscribe(() => {
        // Update local books array with the added book
        this.books.push(addBook);
  
        // Reset the addedBook object
        this.addedBook.name = "";
        this.addedBook.publishYear = 0;
        this.addedBook.publisher = "";
      });
    }
    
  }

  //delete book operations:
  deleteClicked(){
    this.bookService.getAllBooks().subscribe((result: Book[]) => {
      this.books = result;
      // If you need to trigger change detection, you can do it here
      //this.cd.detectChanges();
    });
  }
}
