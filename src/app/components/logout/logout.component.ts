import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private router:Router) { 

  }

  ngOnInit(): void {
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
