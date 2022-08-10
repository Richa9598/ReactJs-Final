import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TransportService, ITransports } from 'src/app/service/transport.service';
@Component({
  selector: 'app-admin-transportations',
  templateUrl: './admin-transportations.component.html',
  styleUrls: ['./admin-transportations.component.css']
})
export class AdminTransportationsComponent implements OnInit {

  searchValue: string = '';
  transport: ITransports[] = [];
  constructor(private transportService: TransportService) { }

  ngOnInit(): void {
    this.transportService.getTransport().subscribe((data) => {
      this.transport = data;
      console.log(this.transport);
    });
  }

  deleteTransport(id: number) {
    this.transportService.deleteTransports(id).subscribe((data) => {
      this.transport = this.transport.filter((s) => s.id !== id);
      console.log(id);
    })
    
    
  }

  myForm = new FormGroup({
    // id: new FormControl<number | null>(null, Validators.required),
    transName: new FormControl<string>('', [
      Validators.required
    ]),
    transDes: new FormControl<string>('', [
      Validators.required
    ]),
    transRate: new FormControl<number>(0, Validators.required),
    transPrice: new FormControl<number>(0, Validators.required),
    transCap: new FormControl<number>(0, Validators.required),
  });

  onSubmit2() {
    this.transportService.addTransports(
      this.myForm.value.transName!,
      this.myForm.value.transPrice!,
      this.myForm.value.transRate!,
      this.myForm.value.transDes!,
      this.myForm.value.transCap!,
    ).subscribe((data) => {
      console.log(data);
      this.transportService.getTransport().subscribe((data) => {
        this.transport = data;
        console.log(this.transport);
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
