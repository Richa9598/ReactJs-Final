import { Component, OnInit, Type } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router, ActivatedRoute } from '@angular/router'
import { DestinationService, IDestinations, ITrip } from 'src/app/service/destination.service';


@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.css']
})
export class ListingsComponent implements OnInit {

  constructor(private router: Router, private routeActive: ActivatedRoute, private destinationService: DestinationService) { }

  ngOnInit(): void {
    this.trips = []
    this.tripMap = new Map<number, ITrip>();
    this.tripSiteCountMap = new Map<number, number>();

    this.tripsOriginal = []
    this.tripMapOriginal = new Map<number, ITrip>();
    this.tripSiteCountMapOriginal = new Map<number, number>();

    console.log("PARAM is " + this.routeActive.snapshot.paramMap.get("id"));
    this.destinationService.getTrips(Number(this.routeActive.snapshot.paramMap.get("id"))).subscribe((data) => {
      this.trips = data;
      this.tripsOriginal = data;
      for (let trip of this.trips) {
        this.tripMap.set(trip.trip, trip);
        this.tripMapOriginal.set(trip.trip, trip);
        if (this.tripSiteCountMap.has(trip.trip)) {
          this.tripSiteCountMap.set(trip.trip, Number(this.tripSiteCountMap.get(trip.trip)) + 1)
          this.tripSiteCountMapOriginal.set(trip.trip, Number(this.tripSiteCountMap.get(trip.trip)) + 1)
        } else {
          this.tripSiteCountMap.set(trip.trip, 0)
          this.tripSiteCountMapOriginal.set(trip.trip, 0)
        }
      }
      // console.log(this.trips);
      // console.log(this.tripMap);
    });
  }

  trips: ITrip[] = [];
  tripMap: Map<number, ITrip> = new Map<number, ITrip>();
  tripSiteCountMap: Map<number, number> = new Map<number, number>();

  //This is to maintain the original Data
  tripsOriginal: ITrip[] = [];
  tripMapOriginal: Map<number, ITrip> = new Map<number, ITrip>();
  tripSiteCountMapOriginal: Map<number, number> = new Map<number, number>();



  filterForm = new FormGroup({
    starRating: new FormControl<number>(0),
    priceRange: new FormControl<number>(0),
    distance: new FormControl<number>(5000, [Validators.min(0), Validators.max(5000)])
    // desName: new FormControl<number | null>(0, []),
    // desDist: new FormControl<number | null>(0, []),
    // desRate: new FormControl<number | null>(0, []),
  });

  searchTrips(eventData: Event) {
    console.log((<HTMLInputElement>eventData.target).value);
    for (let [key, value] of this.tripMapOriginal) {
      if (!value.site_description.toLowerCase().includes((<HTMLInputElement>eventData.target).value.toLowerCase())) {
        this.tripMap.delete(key);
      }
    }
  }

  getDistanceFilterValue():number{
    return this.filterForm.value.distance!
  }

  onFilter(event: any): void {
    this.tripMap = new Map(this.tripMapOriginal);
    if (event.submitter.name == 'filter') {
      //Filter By Star Rating
      for (let [key, value] of this.tripMapOriginal) {
        var strs: number = Number(((value.des_rating + value.hotel_rating + value.t_rating + value.site_rating) / 4.0).toFixed(1));
        if (strs < Number(this.filterForm.value.starRating!)) {
          this.tripMap.delete(key);
        }
      }


      //Filter By Price
      var minPrice: number = 0;
      var maxPrice: number = Number.MAX_VALUE;
      if (Number(this.filterForm.value.priceRange == 1)) {
        minPrice = 50;
        maxPrice = 100;
      } else if (Number(this.filterForm.value.priceRange == 2)) {
        minPrice = 101;
        maxPrice = 200;
      } else if (Number(this.filterForm.value.priceRange == 3)) {
        minPrice = 201;
        maxPrice = 350;
      } else if (Number(this.filterForm.value.priceRange == 4)) {
        minPrice = 351;
        maxPrice = 500;
      } else if (Number(this.filterForm.value.priceRange == 5)) {
        minPrice = 501;
        maxPrice = Number.MAX_VALUE;
      }


      for (let [key, value] of this.tripMapOriginal) {
        var price: number = Number((value.hotel_price));
        if (price < minPrice || price > maxPrice) {
          this.tripMap.delete(key);
        }
      }

      console.log(this.filterForm.value)
      for (let [key, value] of this.tripMapOriginal) {
        if (value.des_distance > Number(this.filterForm.value.distance!)) {
          this.tripMap.delete(key);
        }
      }
      console.log(this.tripMap);
    } else {
      // console.log("Reset Clicked");
      this.tripMap = new Map(this.tripMapOriginal);
    }
  }



  getNumberOfListings(): number {
    return this.tripMap.size;
  }


  goToDetailsPage(listingId: number) {
    this.router.navigate(['/listingDetail/' + listingId]);
  }


  getSubString(str: string, len: number): string {
    return str.substring(0, len);
  }

  getTotalStars(num1: number, num2: number, num3: number, num4: number): string {
    var start:number =  Number(((num1 + num2 + num3 + num4) / 4.0).toFixed(0));
    var starSym:string ="";
    for(var i=1;i<=start;i++){
      starSym+=String.fromCodePoint(0x2B50);
    }
    return starSym;
  }

  getTotalPriceSites(tripId: number): string {
    var price: number = 0;
    for (let tp of this.trips) {
      if (tripId == tp.trip) {
        price += tp.site_price;
      }
    }
    var priceSites = (price).toFixed(1);
    return priceSites;
  }
  getTotalPriceHotel(tripId: number): string {

    var priceHotel = (this.tripMap.get(tripId)!.hotel_price!).toFixed(0);
    var priceTransport = (this.tripMap.get(tripId)!.t_price!).toFixed(0);
    return priceHotel;
  }

  getImgUrl(url: string): string {
    // console.log('/assets/'+url);
    return '/assets/' + url;
  }

}
