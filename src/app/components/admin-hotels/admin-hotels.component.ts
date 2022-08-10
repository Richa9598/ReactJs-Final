import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DestinationService, IDestinations } from 'src/app/service/destination.service';
import { HotelService, IHotels } from 'src/app/service/hotel.service';
@Component({
  selector: 'app-admin-hotels',
  templateUrl: './admin-hotels.component.html',
  styleUrls: ['./admin-hotels.component.css']
})
export class AdminHotelsComponent implements OnInit {

  searchValue: string = '';
  hotel: IHotels[] = [];
  destination: IDestinations[] = [];
  constructor(private hotelService: HotelService, private destinationService: DestinationService) { }


  ngOnInit(): void {
    this.destinationService.getDestination().subscribe((data) => {
      this.destination = data;
      console.log(this.destination);
    });
    this.hotelService.getHotel().subscribe((data) => {
      this.hotel = data;
      console.log(this.hotel);
    });
  }
  deleteHotel(id: number) {
    this.hotelService.deleteHotels(id).subscribe((data) => {
      this.hotel = this.hotel.filter((s) => s.id !== id);
      console.log(id);
    })
    
    
  }

  myForm = new FormGroup({
    // id: new FormControl<number | null>(null, Validators.required),
    hotelName: new FormControl<string>('', [
      Validators.required, Validators.minLength(3)
    ]),
    hotelRate: new FormControl<number>(0, Validators.required),
    hotelPrice: new FormControl<number>(0, [Validators.required, Validators.max(5), Validators.min(0)]),
    desId: new FormControl<number>(0, [
      Validators.required,
    ]),  });

  onSubmit2() {
    this.hotelService.addHotels(
      this.myForm.value.hotelName!,
      this.myForm.value.hotelRate!,
      this.myForm.value.hotelPrice!,
      this.myForm.value.desId!,
    ).subscribe((data) => {
      this.hotelService.getHotel().subscribe((data) => {
        this.hotel = data;
        console.log(this.hotel);
      });
    });
    this.myForm.reset();
    
  }

  getTotalStars(stars:number):string{


    var starSym:string ="";
    for(var i=1;i<=stars;i++){
      starSym+=String.fromCodePoint(0x2B50);
    }
    return starSym;
  }

}
