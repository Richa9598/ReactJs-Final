import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DestinationService, IDestinations } from 'src/app/service/destination.service';
import { SiteService, ISites } from 'src/app/service/site.service';
@Component({
  selector: 'app-admin-sites',
  templateUrl: './admin-sites.component.html',
  styleUrls: ['./admin-sites.component.css']
})
export class AdminSitesComponent implements OnInit {

  searchValue: string = '';
  site: ISites[] = [];
  destination: IDestinations[] = [];
  constructor(private siteService: SiteService, private destinationService: DestinationService) { }

  ngOnInit(): void {
    this.destinationService.getDestination().subscribe((data) => {
      this.destination = data;
      console.log(this.destination);
    });
    this.siteService.getSite().subscribe((data) => {
      this.site = data;
      console.log(this.site);
    });
  }

  deleteSite(id: number) {
    this.siteService.deleteSite(id).subscribe((data) => {
      this.site = this.site.filter((s) => s.id !== id);
      console.log(id);
    })
    
    
  }

  myForm = new FormGroup({
    // id: new FormControl<number | null>(null, Validators.required),
    siteName: new FormControl<string | null>('', [
      Validators.required
    ]),
    siteDes: new FormControl<string>('', [
      Validators.required
    ]),
    siteRate: new FormControl<number>(0, Validators.required),
    sitePrice: new FormControl<number>(0, Validators.required),
    desId: new FormControl<number>(0, [
      Validators.required,
    ]),
  });

  onSubmit2() {
    this.siteService.addSites(
      this.myForm.value.siteName!,
      this.myForm.value.siteDes!,
      this.myForm.value.siteRate!,
      this.myForm.value.sitePrice!,
      this.myForm.value.desId!,
    ).subscribe((data) => {
      console.log(data);
      this.siteService.getSite().subscribe((data) => {
        this.site = data;
        console.log(this.site);
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
