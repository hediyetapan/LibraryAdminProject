import { rentalHistory } from "./RentalHistory";

export class Customer{
 id!: number;
 firstName = "";
 lastName = "";
 email = "";
 address = "";
 rentalHistories?: rentalHistory[];
}