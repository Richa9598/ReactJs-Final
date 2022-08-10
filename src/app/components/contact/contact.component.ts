import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactService,IContact } from 'src/app/service/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  searchValue: string = '';
  contact: IContact[] = [];
  constructor(private contactService: ContactService) {}

 

  ngOnInit(): void {
    this.contactService.getContact().subscribe((data) => {
      this.contact = data;
      console.log(this.contact);
    });
  }

  deleteContact(id: number) {
    this.contactService.deleteContact(id).subscribe((data) => {
      this.contact = this.contact.filter((d) => d.id !== id);
      console.log(id);
    })
  }
  myForm = new FormGroup({
    id: new FormControl<number | null>(null, Validators.required),
    conName: new FormControl<string | null>('', [
      Validators.required
    ]),
    conCountry: new FormControl<string | null>('', [
      Validators.required
    ]),
    conEmail: new FormControl<string | null>('', [
      Validators.required
    ]),
    conFeedback: new FormControl<string | null>('', [
      Validators.required
    ]),
  });
  onSubmit2() {
    this.contactService.addContact(
      this.myForm.value.id!,
      this.myForm.value.conName!,
      this.myForm.value.conCountry!,
      this.myForm.value.conEmail!,
      this.myForm.value.conFeedback!,
    ).subscribe(() => {
      console.log("data");

      this.contactService.getContact().subscribe((datax) => {
        this.contact = datax;
        console.log(this.contact);
      });

    });

    this.myForm.reset();
  }

  

}
