import { Component, OnDestroy, OnInit } from '@angular/core';
import { DialogService, ProductsService, HeaderService } from './../../services/index';
import { Subscription } from'rxjs';
import { take } from'rxjs/operators';
import { SelectedProduct, Image } from './../../models/index';
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
  productImg: string = '';

  private productSubscription: Subscription = new Subscription();

  constructor(
    private router: Router,
    private productsService: ProductsService,
    private dialogService: DialogService,
    private headerService: HeaderService
  ) {}

  ngOnInit() {
    this.section = history.state.section;
    this.productSubscription = this.productsService.getProduct()
    .subscribe({
      next: (value) => {
        this.product = value,
        this.productImg = this.product.images[0].image
      },
      error: (err) => console.log(err)
    }) 
  }

  toggle(): void {
    if (this.size !== 0 && this.color !== '') { //the customer chose a color and a size for the shoes
      this.disabled = false; //proceed to the cart
    }
  }

  selectedColor(color: string) {
    if (this.color === color) {
      this.color = ''; 
    } else {
      this.color = color; 
      let arr = this.productImg.split('-')
      this.productImg = arr[0] + '-' + arr[1] + '-' + this.color + '.png'
    }
  }

  addToCart() {
    let selectedProduct: SelectedProduct = {
      name: this.product.name,
      brand: this.product.brand,
      description: this.product.description,
      price: this.product.price,
      image: this.product.images.find((image: any) => image.color === this.color).image,
      color: this.color,
      size: this.size
    }

    this.headerService.badgeCount$.pipe(take(1)).subscribe(
      {
        next: (value: number) => this.headerService.updateBadgeCount(value + 1),
        error: (err) => console.log(err)
      }
    );

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

