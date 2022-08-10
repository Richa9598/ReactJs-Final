import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) { }
  loginForm = new FormGroup({
    username: new FormControl<string | null>('', [Validators.required, Validators.minLength(5)]),
    password: new FormControl<string | null>('', Validators.required),
  })

  ngOnInit(): void {
  }
  onSubmit() {
    this.authService
      .login(
        this.loginForm.value.username!,
        this.loginForm.value.password!)
      .subscribe({
        next: (res) => {
          if (res.result) {
            localStorage.setItem('authtoken', res.token);
            this.router.navigateByUrl('/');
          }
          else {
            this.errorMessage = res.message;
            this.router.navigateByUrl('/login');            
          }
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
