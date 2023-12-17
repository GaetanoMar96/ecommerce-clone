import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeaderService, ProductsService } from './../../services/index';
import { Subscription } from'rxjs';
import { Product, SelectedProduct } from './../../models/index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
  products: SelectedProduct[] = [];
  total: number = 0
  private productSubscription: Subscription = new Subscription();

  constructor(
    private router: Router,
    private productsService: ProductsService,
    private headerService: HeaderService
  ) {}

  ngOnInit() {
    this.productSubscription = this.productsService.getProductsForCart()
    .subscribe({
      next: (value: SelectedProduct[]) => 
        {
          this.products = value;
          this.products.forEach(product => this.total = this.total + product.price);
        },
      error: (err) => console.log(err)
    }) 
  }

  checkout() {
    this.router.navigate(['checkout']);
  }

  removeProduct(index: number) {
    const price = this.products[index].price;
    this.productSubscription = this.productsService.removeProductsForCart(index)
    .subscribe({
      next: (value: SelectedProduct[]) => 
      {
        this.products = value,
        this.total = 0;
        this.products.forEach(product => this.total = this.total + product.price);
        this.headerService.updateBadgeCount(this.products.length);
      },
      error: (err) => console.log(err)
    }) 
  }

  goBack() {
    this.router.navigate(['home']);
  }

  ngOnDestroy(): void {
    if (this.productSubscription) {
      this.productSubscription.unsubscribe();  
    }
  }
}

