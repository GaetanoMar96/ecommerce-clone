import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, ProductsService } from './../../services/index';
import { Product } from './../../models/index';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  featuredProducts: Product[] = [];

  constructor(private router: Router,
    private authService: AuthService,
    private productsService: ProductsService) {

  }

  ngOnInit() { 
    if (this.authService.userValue == undefined) {
      this.router.navigate(['login']);
    } else {
      //get all products
      
      this.productsService.getAllProducts()
      .subscribe(
        {
          next: (products: Product[]) => {
            //add only 6 products to be shown in the home page
            for(let i = 0; i < 6; i++) {
              this.featuredProducts.push(products[i]);
            }
          },
          error: error => console.log(error)
        }
      );
    }
  }

  navigateToCategory() {
    this.router.navigate(['/category']);
  }
}
