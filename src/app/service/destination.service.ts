//Khyati
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface IDestinations {
  id: number;
  des_name: string;
  des_distance: number;
  des_rating: number;
}

export interface ITrip {
  trip: number,
  des_id: number,
  des_name: string,
  des_distance: number,
  des_rating: number,
  hotel_name: string,
  hotel_rating: number,
  hotel_price: number,
  t_name: string,
  t_price: number,
  t_rating: number,
  t_description: string,
  t_capacity: number,
  site_name: string,
  site_description: string,
  site_rating: number,
  site_price: number,
  img_url: string
}

// export interface IBooking{
//   trip_id:number,
//   numOfDays:number,
//   startDate:string,
//   endDate:string,
//   price:number,
//   user_id:number
// }

export interface IBooking{
  id:number,
  trip_id:number,
  price:number,
  u_id:number
  start_date:string,
  end_date:string,
  numOfDays:number
}

export interface IUserBooking{
  id:number,
  trip_id:number,
  price:number,
  u_id:number
  start_date:string,
  end_date:string,
  numOfDays:number,
  des_name:string,
  des_rating:number
}
export interface IContact{
  id:number,
  contact_name:string,
  contact_country:string,
  contact_email:string,
  contact_feedback:string
}
@Injectable({
  providedIn: 'root'
})
export class DestinationService {
  

  url: string = 'http://localhost:3000/';
  constructor(private http: HttpClient) { }


  getDestination(): Observable<IDestinations[]> {
    return this.http.get<IDestinations[]>(this.url + 'destinations');
  }

  getTrips(id: number): Observable<ITrip[]> {
    return this.http.get<ITrip[]>(this.url + 'listings/' + id);
  }

  getListingDetails(id: number): Observable<ITrip[]> {
    return this.http.get<ITrip[]>(this.url + 'listingDetail/' + id);
  }
  getContact(): Observable<IContact[]> {
    return this.http.get<IContact[]>(this.url + 'contact');
  }

  addDestinations(desName: string, desDistance: number, desRating: number): Observable<IDestinations[]> {
    return this.http.post<IDestinations[]>(this.url + 'destinations',{
      des_name: desName,
      des_distance: desDistance,
      des_rating: desRating,
    });
  }

  deletedestinations(id: number): Observable<IDestinations[]>{
    return this.http.delete<IDestinations[]>(this.url + 'destinations/' + id);
  }


  saveBooking(booking:IBooking) {
    return this.http.post<IDestinations[]>(this.url + 'book/',{
      trip_id:booking.trip_id,
      start_date:booking.start_date,
      end_date : booking.end_date,
      u_id: booking.u_id,
      price:booking.price

    });
  }

  getBookings(u_id:number): Observable<IUserBooking[]>{
    console.log(u_id);
    console.log("IN DES SERVICE")
    return this.http.get<IUserBooking[]>(this.url + 'book/'+u_id);
  }




  // addProject(ti: string, desc:string, cat:string): Observable<any>{

  //   console.log(ti);
  //   console.log(desc);
  //   console.log(cat);
  //   let data:IProject = {
  //     title: ti,
  //     description: desc,
  //     category: cat
  //   }
  //   console.log(data);
  //   console.log("TEST");
  //   return this.http.post('https://node-todo-2021.herokuapp.com/projects', data);
  // }
}
