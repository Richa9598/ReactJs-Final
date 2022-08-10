import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
export interface IGallery {
  img_url: string;
  site_name: string;
  des_name: string;
}
@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  url: string = 'http://localhost:3000/';
  constructor(private http: HttpClient) { }

  getGallery(): Observable<IGallery[]> {
    return this.http.get<IGallery[]>(this.url + 'images');
  }
}
