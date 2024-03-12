import { Component, ElementRef, ViewChild } from '@angular/core';
import { rentalHistory } from '../../models/RentalHistory';
import { Book } from '../../models/book';
import { Customer } from '../../models/customer';
import { BookService } from '../../services/book.service';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-search-customer',
  templateUrl: './search-customer.component.html',
  styleUrls: ['./search-customer.component.css']
})
export class SearchCustomerComponent {
  @ViewChild("searchCriteria") searchCriteria!: ElementRef<HTMLInputElement>;
  @ViewChild("searchItem") searchItem!: ElementRef<HTMLInputElement>;
  customers: Customer[] = [];
  books: Book[] = [];
  filteredCustomers: Customer[] = [];

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

    } else if (searchCriteriaValue == "customerFullName"){
      //this.filteredCustomers = this.books.filter(book => book.name.toLowerCase().includes(searchItemValue.toLowerCase()));
    } else if (searchCriteriaValue == "customerEmail"){
      this.filteredCustomers = this.customers.filter(customer => customer.email.toLowerCase().includes(searchItemValue.toLowerCase()));
    } else if (searchCriteriaValue == "customerAddress"){
      this.filteredCustomers = this.customers.filter(customer => customer.address.toLowerCase().includes(searchItemValue.toLowerCase()));
    } 
  }

  getCustomer(customerId: number): string{

    let customerInfoString: string = "";
    //books.find(book => book.id === id);
    let customerWithcustomerId:Customer | undefined = this.filteredCustomers.find(customer => customer.id === customerId);
    if (customerWithcustomerId){
      customerInfoString = customerWithcustomerId.firstName + " " + customerWithcustomerId.lastName + " - " + customerWithcustomerId.email + " - " + customerWithcustomerId.address;
    } 
    
    return customerInfoString;
  }


}
