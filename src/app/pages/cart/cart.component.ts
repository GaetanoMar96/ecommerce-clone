import { Component, OnDestroy, OnInit } from '@angular/core';
import { DialogService, ProductsService } from './../../services/index';
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
    private dialogService: DialogService
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
    
  }

  removeProduct(index: number) {
    this.productSubscription = this.productsService.removeProductsForCart(index)
    .subscribe({
      next: (value: SelectedProduct[]) => 
      {
        this.products = value,
        this.products.forEach(product => this.total = this.total + product.price);
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

