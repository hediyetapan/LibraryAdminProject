import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../models/book';
import { environment } from 'src/environments/environment.development';
import { Customer } from '../models/customer';
import { rentalHistory } from '../models/RentalHistory';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private getAllBooksUrl = "Book/GetBooks";
  private deleteBookUrl = "Book/DeleteBook"
  private updateBookUrl = "Book/UpdateBook"
  private addBookUrl = "Book/AddBook";
  
  constructor(private http: HttpClient) { }

  public getAllBooks(): Observable<Book[]>{
    
    return this.http.get<Book[]>(`${environment.apiUrl}/${this.getAllBooksUrl}`);
  }

  public deleteBook(bookId: number| undefined): Observable<Book[]>{
    console.log(bookId);
    return this.http.delete<Book[]>(`${environment.apiUrl}/${this.deleteBookUrl}/${bookId}`);
  }

  public updateBook(book: Book): Observable<Book[]>{
    return this.http.put<Book[]>(`${environment.apiUrl}/${this.updateBookUrl}`,book);
  }

  public addBook(book: Book): Observable<Book[]>{
    return this.http.post<Book[]>(`${environment.apiUrl}/${this.addBookUrl}`,book);
  }

  


}
