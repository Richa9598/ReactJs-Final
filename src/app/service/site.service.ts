//Khyati
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ISites {
  id: number;
  site_name: string;
  site_description: string;
  site_rating: number;
  site_price: number;
  des_id: number;
  des_name: string;
}
@Injectable({
  providedIn: 'root'
})
export class SiteService {
  url: string = 'http://localhost:3000/';
  constructor(private http: HttpClient) { }

  getSite(): Observable<ISites[]> {
    return this.http.get<ISites[]>(this.url + 'sites');
  }
  addSites(site_name: string, site_description: string, site_rating: number, site_price: number, des_id: number): Observable<ISites[]> {
    return this.http.post<ISites[]>(this.url + 'sites',{
      site_name: site_name,
      site_description: site_description,
      site_rating: site_rating,
      site_price: site_price,
      des_id: des_id,
    });
  }

  deleteSite(id: number): Observable<ISites[]>{
    return this.http.delete<ISites[]>(this.url + 'sites/' + id);
  }
}
