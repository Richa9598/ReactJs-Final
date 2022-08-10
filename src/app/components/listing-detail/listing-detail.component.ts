import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IProfile } from 'src/app/service/auth.service';
import { DestinationService, IBooking, ITrip } from 'src/app/service/destination.service';
import { ISitesForDest, SitesForDestService } from 'src/app/service/tripDetail/sites-for-dest.service';


@Component({
  selector: 'app-listing-detail',
  templateUrl: './listing-detail.component.html',
  styleUrls: ['./listing-detail.component.css']
})



export class ListingDetailComponent implements OnInit {

  currentUser: IProfile[] = [];
  constructor(private router: Router, private routeActive: ActivatedRoute, private destinationService: DestinationService) { }

  numOfDays:number = 0;
  booking:IBooking = {
    id:0,
    trip_id: 0,
    numOfDays: 0,
    start_date: '',
    end_date: '',
    price: 0,
    u_id: 0
  };
  submitBtnTxt:string="";

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('userData')!);
    console.log(this.currentUser);
    this.submitBtnTxt = "Book!"; 
    this.startMinDate = new Date().toISOString().slice(0, 10);
    this.endMinDate = new Date().toISOString().slice(0, 10);
    // console.log("PARAM is "+this.routeActive.snapshot.paramMap.get("id"));
    this.destinationService.getListingDetails(Number(this.routeActive.snapshot.paramMap.get("id"))).subscribe((data) => {
      this.trips = data;
      for (let trip of this.trips) {
        this.tripMap.set(trip.trip, trip);
        if (this.tripSiteCountMap.has(trip.trip)) {
          this.tripSiteCountMap.set(trip.trip, Number(this.tripSiteCountMap.get(trip.trip)) + 1)
        } else {
          this.tripSiteCountMap.set(trip.trip, 0)
        }
      }
      console.log(this.trips);
      console.log(this.tripMap);
    });
    console.log(this.startMinDate);

  }

  startMinDate: string = "";
  endMinDate: string = "";
  trips: ITrip[] = [];
  tripMap: Map<number, ITrip> = new Map<number, ITrip>();
  tripSiteCountMap: Map<number, number> = new Map<number, number>();

  tripForm = new FormGroup({
    startDate: new FormControl<Date | null>(null, [
      Validators.required
    ]),
    endDate: new FormControl<Date | null>(null, [
      Validators.required
    ])
  });




  goToDetailsPage(listingId: number) {
    this.router.navigate(['/listingDetail/' + listingId]);
  }


  getSubString(str: string, len: number): string {
    return str.substring(0, len);
  }

  getTotalStars(): string {
    var finalRating: number = 0;
    var count: number = 3;
    for (let st of this.trips) {
      finalRating += st.site_rating;
      count++;

    }

    finalRating += this.trips[0].des_rating;
    finalRating += this.trips[0].hotel_rating;
    finalRating += this.trips[0].t_rating;

    var start: number = Number((finalRating / count).toFixed(0));
    var starSym: string = "";
    for (var i = 1; i <= start; i++) {
      starSym += String.fromCodePoint(0x2B50);
    }
    return starSym;
  }

  getTotalStarsByItem(stars:number): string {
    var starSym: string = "";
    for (var i = 1; i <= stars; i++) {
      starSym += String.fromCodePoint(0x2B50);
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

  getAllSitesName(): string {
    var sitesNames: string = "";
    for (let st of this.trips) {
      sitesNames += st.site_name + ", "
    }
    if (sitesNames.length != 0) {
      sitesNames = sitesNames.substring(0, sitesNames.length - 2);
      sitesNames = sitesNames.substring(0, sitesNames.lastIndexOf(',')) + ' and ' + sitesNames.substring(sitesNames.lastIndexOf(',') + 1)
      return sitesNames;
    }
    return "";
  }



  startDateChanged() {
    this.endMinDate = this.tripForm.value.startDate!.toString();
    console.log(this.tripForm.value.startDate)
  }

  calculatePriceByDates() {
    console.log(this.tripForm.value);
    if (this.tripForm.value.startDate != null && this.tripForm.value.endDate != null) {
      console.log("Can calculate prices");
      const date1 = new Date(this.tripForm.value.startDate);
      const date2 = new Date(this.tripForm.value.endDate);
      var msBetweenDates:number = date2.getTime() - date1.getTime();
      msBetweenDates = msBetweenDates/1000;
      msBetweenDates = msBetweenDates/60;
      msBetweenDates = msBetweenDates/60;
      msBetweenDates = msBetweenDates/24;
      this.numOfDays = msBetweenDates;
      console.log(msBetweenDates);
      if(this.numOfDays>0){
        console.log(this.numOfDays);
        this.booking.start_date = this.tripForm.value.startDate.toString();
        this.booking.end_date = this.tripForm.value.endDate.toString();
        this.booking.trip_id = Number(this.routeActive.snapshot.paramMap.get("id"));
        this.booking.price = this.trips[0].hotel_price;
        this.booking.numOfDays = this.numOfDays;
        this.booking.price = this.trips[0].hotel_price * this.numOfDays; 
        console.log(this.booking);
        for(let tt of this.trips){
          this.booking.price += tt.site_price;
        }
      }
    }
  }

  bookTripForUser(){
    if(this.submitBtnTxt==="Booked!!"){
      this.submitBtnTxt = "Already Booked!!"
    }
    if (this.booking.start_date != null 
      && this.booking.end_date != null 
      && this.booking.numOfDays>0
      && this.submitBtnTxt!="Booked!!"
      && this.submitBtnTxt!="Already Booked!!") {
      console.log("Trip Booked");
      if(this.currentUser[0].id==null){
        this.booking.u_id = 0;
      }else{
        this.booking.u_id = this.currentUser[0].id;
      }
      console.log(this.booking);
      this.destinationService.saveBooking(this.booking).subscribe();
      this.submitBtnTxt = "Booked!!"
    }
    
    
    
    

  }


}
