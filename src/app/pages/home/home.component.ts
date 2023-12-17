import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../services/index';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  constructor(private router: Router,
    private authService: AuthService) {

  }

  ngOnInit() { 
    if (this.authService.user == undefined) {
      this.router.navigate(['login']);
    }
  }


  navigateToMaleShopping() {
    this.router.navigate(['/male-products']);
  }

  navigateToFemaleShopping() {
    this.router.navigate(['/female-products']);
  }
}
