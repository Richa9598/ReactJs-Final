import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {Route, Router, ActivatedRoute} from '@angular/router'
import { DestinationService, IDestinations } from 'src/app/service/destination.service';
import { ISitesForDest, SitesForDestService } from 'src/app/service/tripDetail/sites-for-dest.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

 
  constructor(private router:Router, private routeActive: ActivatedRoute, private sitesForDestService: SitesForDestService, private destinationService: DestinationService){}
  ngOnInit(): void {
    // this.sitesForDest = this.sitesForDestService.getSitesForDestList();
    this.destinationService.getDestination().subscribe((data) => {
      this.destination = data;
      console.log(this.destination);
    });
  }

  searchValue: string = '';
  destination: IDestinations[] = [];
  slogan: string = 'Travel Explorer';
  subTitle: string = 'Travel made easy';
  
  sitesForDest: ISitesForDest[] = [];
  


  homeForm = new FormGroup({
    desId: new FormControl<number>(0, [
      Validators.required,
    ]),
    
  });

  getSubTitle() {
    return this.subTitle;
  }


  goToListings(){
    this.router.navigate(['/listings/'+this.homeForm.value.desId]);
  }
}
