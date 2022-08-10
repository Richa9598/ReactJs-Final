import { Component } from '@angular/core';
//decorator
@Component({
  selector: 'app-root', // name of component
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'Travel made easy';
  name: string = 'Travel Explorer';
  
  getTitle(){
    return this.title;
  }
}