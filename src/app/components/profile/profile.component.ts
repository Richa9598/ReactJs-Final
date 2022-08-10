import { Component, OnInit } from '@angular/core';
import { AuthService, IProfile } from 'src/app/service/auth.service';
import { DestinationService, IBooking, IUserBooking } from 'src/app/service/destination.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})


export class ProfileComponent implements OnInit {


    currentUser: IProfile[] = [];
    bookings: IUserBooking[] = [];
  constructor(private authService: AuthService,private router:Router, private destDervice:DestinationService) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('userData')!);
    console.log(this.currentUser[0].id!);
    this.destDervice.getBookings(this.currentUser[0].id!).subscribe((data)=>{
      this.bookings = data;
      console.log(this.bookings);
    });

    
  }

  getNumberOfDays(booking:IUserBooking):number{
    const date1 = new Date(booking.start_date);
      const date2 = new Date(booking.end_date);
      var msBetweenDates:number = date2.getTime() - date1.getTime();
      msBetweenDates = msBetweenDates/1000;
      msBetweenDates = msBetweenDates/60;
      msBetweenDates = msBetweenDates/60;
      msBetweenDates = msBetweenDates/24;
      return msBetweenDates;
  }
  showBookmarks():void{
    this.router.navigateByUrl('/bookmarks')
  }

  getStars(stars:number){
    var starSym: string = "";
    for (var i = 1; i <= stars; i++) {
      starSym += String.fromCodePoint(0x2B50);
    }
    return starSym;
  }
}
