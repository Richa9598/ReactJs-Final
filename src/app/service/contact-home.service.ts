import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactHomeService {

  private api = 'https://mailthis.to/alias'
  constructor(private http: HttpClient) { }

  PostMessage(input: any){
   
  }
}
