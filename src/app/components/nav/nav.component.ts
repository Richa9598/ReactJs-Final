import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  isLoggedIn: boolean = false;
  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
    // this.reloadPage
    this.authService.isLoggedIn$.subscribe((res) => {
      this.isLoggedIn = res;
    });
  }

 logout():void {
  
  this.router.navigateByUrl('/login');
  localStorage.removeItem('userData');
  localStorage.removeItem('authtoken');
  localStorage.removeItem('authloginToken');
  localStorage.removeItem('username');
 }
 
 reloadPage():void{
  window.location.reload();
}
}

