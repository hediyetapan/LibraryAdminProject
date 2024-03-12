import { Component, ElementRef, ViewChild } from '@angular/core';
import { rentalHistory } from '../../models/RentalHistory';
import { Book } from '../../models/book';
import { Customer } from '../../models/customer';
import { BookService } from '../../services/book.service';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-search-book',
  templateUrl: './search-book.component.html',
  styleUrls: ['./search-book.component.css']
})
export class SearchBookComponent {
  @ViewChild("searchCriteria") searchCriteria!: ElementRef<HTMLInputElement>;
  @ViewChild("searchItem") searchItem!: ElementRef<HTMLInputElement>;
  customers: Customer[] = [];
  books: Book[] = [];
  filteredBooks: Book[] = [];

  constructor(private customerService: CustomerService,
    private bookService: BookService) { }

  ngOnInit() {
    this.customerService.getAllCustomers()
      .subscribe((result) => this.customers = result);
    this.bookService.getAllBooks()
      .subscribe(result => this.books = result);
  }
  onSearch() {
    let searchCriteriaValue: string = this.searchCriteria.nativeElement.value;
    let searchItemValue: string = this.searchItem.nativeElement.value;
    if (searchCriteriaValue == ""){

      console.log("Please choose a criteria.");

    } else if (searchCriteriaValue == "bookName"){
      this.filteredBooks = this.books.filter(book => book.name.toLowerCase().includes(searchItemValue.toLowerCase()));
    } else if (searchCriteriaValue == "publisher"){
      this.filteredBooks = this.books.filter(book => book.publisher.toLowerCase().includes(searchItemValue.toLowerCase()));
    } else if (searchCriteriaValue == "publishYear"){
      this.filteredBooks = this.books.filter(book => book.publishYear == Number(searchItemValue));
    } 
  }

  getBook(bookId: number): string{

    let bookInfoString: string = "";
    //books.find(book => book.id === id);
    let bookWithbookId:Book | undefined = this.filteredBooks.find(book => book.id === bookId);
    if (bookWithbookId){
      bookInfoString = bookWithbookId.name + " - " + bookWithbookId.publishYear + " - " + bookWithbookId.publisher;
    } 
    
    return bookInfoString;
  }

}
