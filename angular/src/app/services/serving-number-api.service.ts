import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServingNumberApiService {
  API_URL: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getAllServingNumber(): Observable<any> {
    return this.http.get(`${this.API_URL}/serving-number`);
  }

  getOneServingNumber(id: number): Observable<any> {
    return this.http.get(`${this.API_URL}/serving-number/${id}`);
  }
}
