import { Component, Injectable, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DestinationService, IDestinations } from 'src/app/service/destination.service';

@Component({
  selector: 'app-admin-destinations',
  templateUrl: './admin-destinations.component.html',
  styleUrls: ['./admin-destinations.component.css']
})
export class AdminDestinationsComponent implements OnInit {

  searchValue: string = '';
  destination: IDestinations[] = [];
  constructor(private destinationService: DestinationService) { }

  ngOnInit(): void {
    this.destinationService.getDestination().subscribe((data) => {
      this.destination = data;
      console.log(this.destination);
    });
  }

  deleteDestination(id: number) {
    this.destinationService.deletedestinations(id).subscribe((data) => {
      this.destination = this.destination.filter((d) => d.id !== id);
      console.log(id);
    })


  }

  myForm = new FormGroup({
    desName: new FormControl<string>('', [
      Validators.required, Validators.minLength(3)
    ]),
    desDist: new FormControl<number>(0, Validators.required),
    desRate: new FormControl<number>(0, [Validators.required, Validators.max(5), Validators.min(0)]),
  });

  onSubmit2() {
    this.destinationService.addDestinations(
      this.myForm.value.desName!,
      this.myForm.value.desDist!,
      this.myForm.value.desRate!
    ).subscribe(() => {
      console.log("data");

      this.destinationService.getDestination().subscribe((datax) => {
        this.destination = datax;
        console.log(this.destination);
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
