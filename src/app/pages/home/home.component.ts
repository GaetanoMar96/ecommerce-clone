import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, ProductsService } from './../../services/index';
import { Product } from './../../models/index';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private productsSubscription: Subscription = new Subscription();
  featuredProducts: Product[] = [];
  loading: boolean = true;
  constructor(private router: Router,
    private authService: AuthService,
    private productsService: ProductsService) {

  }

  ngOnInit() { 
    if (this.authService.userValue == undefined) {
      this.router.navigate(['login']);
    } else {
      //get all products
      this.productsSubscription = this.productsService.getAllProducts()
        .subscribe({
          next: (products: Product[]) => {
            // add only 6 products to be shown on the home page
            this.featuredProducts = products.slice(0, 6);
            this.loading = false;
          },
          error: error => console.log(error)
        });
    }
  }

  navigateToCategory() {
    this.router.navigate(['/category']);
  }

  ngOnDestroy() {
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
  }
}
