import { Component, Input } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { BookService } from 'src/app/services/book.service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-delete-customer',
  templateUrl: './delete-customer.component.html',
  styleUrls: ['./delete-customer.component.css']
})
export class DeleteCustomerComponent {
  @Input() customerId!: number;

  
  deleteIcon:IconDefinition = faTrash;

  constructor(private customerService: CustomerService){}

  deleteCustomer(): void{
    this.customerService.deleteCustomer(this.customerId).subscribe();
    console.log("deleted");
  }
}
