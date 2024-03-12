import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { rentalHistory } from '../models/RentalHistory';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RentalHistoryService {
  private getAllRentalHistoriesUrl = "RentalHistory/GetRentalHistory";
  constructor(private http: HttpClient) { }

  public getAllRentalHistories(): Observable<rentalHistory[]>{
    return this.http.get<rentalHistory[]>(`${environment.apiUrl}/${this.getAllRentalHistoriesUrl}`);
  }
}
