import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-home',
  templateUrl: './contact-home.component.html',
  styleUrls: ['./contact-home.component.css']
})
export class ContactHomeComponent implements OnInit {


  formData = new FormGroup({
    desId: new FormControl<number>(0, [
      Validators.required,
    ]),

  });

  constructor(private builder: FormBuilder) { }
  ngOnInit() {

  }
  onSubmit() {

  }

}
