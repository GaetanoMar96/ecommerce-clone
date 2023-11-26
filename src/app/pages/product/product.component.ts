import { Component, OnDestroy, OnInit } from '@angular/core';
import { DialogService, ProductsService } from './../../services/index';
import { Subscription } from'rxjs';
import { SelectedProduct } from './../../models/index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit, OnDestroy {
  section: string = '';
  product: any;
  size: number = 0; //default
  color: string = ''; //default: black
  disabled: boolean = true; //used to disable cart button

  private productSubscription: Subscription = new Subscription();

  constructor(
    private router: Router,
    private productsService: ProductsService,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    this.section = history.state.section;
    this.productSubscription = this.productsService.getProduct()
    .subscribe({
      next: (value) => this.product = value,
      error: (err) => console.log(err)
    }) 
  }

  toggle(): void {
    if (this.size !== 0 && this.color !== '') { //the customer chose a color and a size for the shoes
      this.disabled = false; //proceed to the cart
    }
  }

  selectedColor(color: string) {
    this.color = color;
  }

  addToCart() {
    let selectedProduct: SelectedProduct = {
      name: this.product.name,
      brand: this.product.brand,
      description: this.product.description,
      price: this.product.price,
      image: this.product.images.find((image: any) => image.color === this.color).imageBin,
      color: this.color,
      size: this.size
    }

    this.dialogService.openViewCartDialog(selectedProduct);
    this.productsService.setProductsForCart(selectedProduct);
  }

  goBack() {
    if(this.section.includes('MEN'))
      this.router.navigate(['male-products'])
    else if (this.section.includes('WOMEN'))
      this.router.navigate(['female-products'])
    else 
      this.router.navigate(['home'])
  }

  ngOnDestroy(): void {
    if (this.productSubscription) {
      this.productSubscription.unsubscribe();  
    }
  }
}

