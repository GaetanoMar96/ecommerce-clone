import { Component } from '@angular/core';
import { Router,NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ecommerce-clone';
  showheader = false;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showheader = !event.url.includes('/login') && !event.url.includes('/register'); 
      }
    });
  }
  
}
