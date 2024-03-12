import {Book} from './book';
import { Customer } from './customer';

export class rentalHistory{
 id?: number;
 bookId?: number;
 customerId!: number;
 //book?: Book;
 //customer?: Customer;
 rentDate!: Date;
 deliverDate!: Date;
}