import { Component } from '@angular/core';
import { IconDefinition, faWrench } from '@fortawesome/free-solid-svg-icons';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent {
  addedCustomer: Customer = new Customer();

  customers: Customer[] = [];

  updateIcon: IconDefinition = faWrench;

  editingCustomer: any;

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.customerService.getAllCustomers()
      .subscribe((result: Customer[]) => (this.customers) = result);
  }

  onClick(): void {
    console.log(this.customers);
  }

  //Methods for updating book:
  startEditing(customer: Customer): void {
    this.editingCustomer = customer;
  }
  isEditing(customer: Customer) {
    return this.editingCustomer === customer;
  }
  saveChanges(customer: Customer) {
    let newCustomer: Customer = new Customer();

    newCustomer.address = customer.address;
    newCustomer.email = customer.email;
    newCustomer.firstName = customer.firstName;
    newCustomer.lastName = customer.lastName;



    this.customerService.updateCustomer(newCustomer).subscribe();

    this.editingCustomer = null;
  }
  cancelChanges(customer: Customer) {
    this.editingCustomer = null;
  }

  addNewCustomer() {
    let addCustomer: Customer = new Customer();

    addCustomer.firstName = this.addedCustomer.firstName;
    addCustomer.lastName = this.addedCustomer.lastName;
    addCustomer.email = this.addedCustomer.email;
    addCustomer.address = this.addedCustomer.address;



    this.customerService.addCustomer(addCustomer).subscribe();

    this.addedCustomer.firstName = "";
    this.addedCustomer.email = "";
    this.addedCustomer.lastName = "";
    this.addedCustomer.address = "";
  }
}
