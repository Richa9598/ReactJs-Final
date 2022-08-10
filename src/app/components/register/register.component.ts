import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  errorMessage = '';
  isRegisterFailed = false;
  isSuccessful = false;

  constructor(private authService: AuthService, private router: Router) { }

  registerForm = new FormGroup({
    username: new FormControl<string | null>('', [Validators.required, Validators.minLength(5)]),
    email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password: new FormControl<string | null>('', Validators.required),
    password2: new FormControl<string | null>('', Validators.required),
    address: new FormControl<string | null>('', Validators.required),

  })

  ngOnInit(): void {
  }

  onSubmit():void {
    console.log(this.registerForm)    
    this.authService.register(this.registerForm.value.username!, this.registerForm.value.email!,
        this.registerForm.value.password!, this.registerForm.value.address!)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigateByUrl('/login');
        },
        error: (e) => {
          console.log(e);
          this.errorMessage = e.error.errors;
        },
        complete: () => {
          console.log('complete');
        },
      });
    this.registerForm.reset();
  }

}
