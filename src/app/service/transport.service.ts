//Khyati
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ITransports {
  id: number;
  t_name: string;
  t_price: number;
  t_rating: number;
  t_description: string;
  t_capacity: number
}
@Injectable({
  providedIn: 'root'
})
export class TransportService {
  url: string = 'http://localhost:3000/';
  constructor(private http: HttpClient) { }

  getTransport(): Observable<ITransports[]> {
    return this.http.get<ITransports[]>(this.url + 'transports');
  }
  addTransports(t_name: string, t_price: number, t_rating: number, t_description: string, t_capacity: number): Observable<ITransports[]> {
    return this.http.post<ITransports[]>(this.url + 'transports',{
      t_name: t_name,
      t_price: t_price,
      t_rating: t_rating,
      t_description: t_description,
      t_capacity: t_capacity,
    });
  }

  deleteTransports(id: number): Observable<ITransports[]>{
    return this.http.delete<ITransports[]>(this.url + 'transports/' + id);
  }
}
