import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
export interface IContact {
  id: number;
  contact_name: string;
  contact_country: string;
  contact_email: string;
  contact_feedback:string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  // contactList: IContact[] = [
  //   {
  //     id: 1,
  //   conName: "Richa",
  //   conCountry: "India",
  //    conEmail: "abc@xyz",
  //    conFeedback:"Hello there",
  //   },
  //   {
  //     id: 2,
  //     conName: "Khyati",
  //   conCountry: "India",
  //    conEmail: "abc@xyz",
  //    conFeedback:"Hello how are you ?",
  //   },
  //   {
  //     id: 3,
  //     conName: "Rushil",
  //   conCountry: "India",
  //    conEmail: "abc@xyz",
  //    conFeedback:"Hello i am good !"
  //   }
  // ];

  url: string = 'http://localhost:3000/';
  constructor(private http: HttpClient) { }
  getContact() : Observable<IContact[]> {
    return this.http.get<IContact[]>(this.url + 'contact');
  }

  addContact(id: number, contact_name: string, contact_country: string, contact_email: string, contact_feedback:string) : Observable<IContact[]> {
    return this.http.post<IContact[]>(this.url + 'contact',{
      contact_name: contact_name,
      contact_country: contact_country,
      contact_email: contact_email,
      contact_feedback: contact_feedback,
    });
  }

  deleteContact(id: number): Observable<IContact[]>{
    return this.http.delete<IContact[]>(this.url + 'contact/' + id);
  }
}