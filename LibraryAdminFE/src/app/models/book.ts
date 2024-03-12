import {rentalHistory} from './RentalHistory';

export class Book{
 id!: number;
 name = "";
 publisher = "";
 publishYear?: number;
 rentalHistories?: rentalHistory[];
}