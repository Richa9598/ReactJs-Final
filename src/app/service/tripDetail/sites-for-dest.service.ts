import { Injectable } from '@angular/core';

export interface ISitesForDest {
  id: number;
  siteName: string;
  siteDesc: string;
  siteRating: number;
  sitePrice: number;
}

@Injectable({
  providedIn: 'root'
})
export class SitesForDestService {

  constructor() { }

  sitesForDestList: ISitesForDest[] = [
    {
      id: 1,
      siteName: "CN Tower",
      siteDesc: "The CN Tower is a 553.3 m-high concrete communications and observation tower in downtown Toronto, Ontario, Canada. Built on the former Railway Lands, it was completed in 1976. Its name CN referred to Canadian National, the railway company that built the tower.",
      siteRating: 3.5,
      sitePrice: 80
    },
    {
      id: 1,
      siteName: "Aquarium",
      siteDesc: "Ontario, Canada. Built on the former Railway Lands, it was completed in 1976. Its name CN referred to Canadian National, the railway company that built the tower. The CN Tower is a 553.3 m-high concrete communications and observation tower in downtown Toronto",
      siteRating: 3.5,
      sitePrice: 80
    }
  ];

  getSitesForDestList() {
    return this.sitesForDestList;
  }
}
