//Khyati
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface IHotels {
  id: number;
  hotel_name: string;
  hotel_rating: number;
  hotel_price: number;
  des_id: number;
  des_name: string;
}
@Injectable({
  providedIn: 'root'
})
export class HotelService {
  url: string = 'http://localhost:3000/';
  constructor(private http: HttpClient) { }

  getHotel(): Observable<IHotels[]> {
    return this.http.get<IHotels[]>(this.url + 'hotels');
  }
  addHotels(hotel_name: string, hotel_rating: number, hotel_price: number, des_id: number): Observable<IHotels[]> {
    return this.http.post<IHotels[]>(this.url + 'hotels',{
      hotel_name: hotel_name,
      hotel_rating: hotel_rating,
      hotel_price: hotel_price,
      des_id: des_id,
    });
  }

  deleteHotels(id: number): Observable<IHotels[]>{
    return this.http.delete<IHotels[]>(this.url + 'hotels/' + id);
  }
}
