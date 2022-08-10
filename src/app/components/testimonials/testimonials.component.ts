import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService, ITestimonials } from 'src/app/service/auth.service';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css']
})
export class TestimonialsComponent implements OnInit {
  errorMessage: any;
  getData: any;
  reload:any;
  data : ITestimonials[]=[];
  constructor(private authService:AuthService) { }
  
  testimonialsForm = new FormGroup({
    name: new FormControl<string | null>('',[Validators.required, Validators.minLength(3)]),
    designation: new FormControl<string | null>('',Validators.required),
    comment: new FormControl<string | null>('',Validators.required),
  })
  
  ngOnInit(): void {
    this.authService.fetchTestimonial().subscribe((allTestimonials) =>{
      console.log(allTestimonials,'getTestimonial');
      this.getData = allTestimonials;
    })
  }
  onSubmit(){
    console.log(this.testimonialsForm);
    this.authService.addTestimonial(this.testimonialsForm.value.name!,this.testimonialsForm.value.designation!,this.testimonialsForm.value.comment!)
    .subscribe({
      next: (res) => {
        console.log(res);
        this.authService.fetchTestimonial().subscribe((allTestimonials) =>{
          console.log(allTestimonials,'getTestimonial');
          this.getData = allTestimonials;
        })
      },
      error: (e) => {
        console.log(e);
        this.errorMessage = e.error.errors;
      },
      complete: () => {
        console.log('complete');
      },
    });
    this.testimonialsForm.reset();
  }
  onDelete(id:number){
    console.log(id);
    this.authService.deleteTestimonials(id)
    .subscribe({
      next: (res) => {
        this.data = this.data.filter((g) => g.id !== id);
        this.authService.fetchTestimonial().subscribe((allTestimonials) =>{
          console.log(allTestimonials,'getTestimonial');
          this.getData = allTestimonials;
        })
      },
      error: (e) => {
        console.log(e);
        this.errorMessage = e.error.errors;
      },
      complete: () => {
        console.log('complete');
      },
    });
  }
}
