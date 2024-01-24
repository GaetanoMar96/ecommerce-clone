import { Component, OnDestroy, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { AuthService, ProductsService, FavouriteProductsService, UtilsService } from './../../../services/index';
import { Product, CheckBoxColor, PriceRange, ProductFilters } from './../../../models/index';
import { Router } from '@angular/router';
import { Subscription } from'rxjs';
import { MatSlider } from '@angular/material/slider';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProductsComponent implements OnInit, OnDestroy {
  
  @Input() header: string = '';
  
  products: Product[] = [];

  productFilters: ProductFilters = {
    gender: '',
    minPrice: 0,
    maxPrice: 200,
    colors: [], 
    brand: ''
  };

  gender: string = '';
  sliderValue = 50;
  
  price: PriceRange = {
    min: 0,
    max: 200
  }

  checkBoxColor: CheckBoxColor = {
    red: false,
    white: false,
    black: false,
    green: false,
    brown: false,
    pink: false,
    purple: false,
    blue: false
  };

  selectedBrand: string = '';
  selectedColors: string[] = [];

  private productSubscription: Subscription = new Subscription();

  constructor( 
    private authService: AuthService,
    private router: Router,
    private productsService: ProductsService,
    private favouriteProductsService: FavouriteProductsService,
    private utilsService: UtilsService) {
  }

  ngOnInit() {   
    this.checkGender();
    this.productSubscription = this.productsService.getProductsByGender(this.gender)
    .subscribe(
      {
        next: (value) => this.products = value,
        error: (err) => console.log(err)
      }
    )
  }

  ngOnChanges() {
    //triggered each time there is a change to input
    this.checkGender();
  } 

  checkGender(): void {
    this.gender = this.header === 'MEN' ? 'male' : 'female';
  }

  goToProduct(product: Product): void {
    this.productsService.setProduct(product);
    this.router.navigate(['product'], { state: { section: this.header } })
  }

  getFilteredData(): void {
    //call service
    let colors = Object.keys(this.checkBoxColor).filter(key => this.checkBoxColor[key])
    
    this.productFilters = {
      gender: this.gender,
      minPrice: this.price.min,
      maxPrice: this.price.max,
      colors: colors, 
      brand: this.selectedBrand
    }

    this.productSubscription = this.productsService.getProductsByFilters(this.productFilters)
    .subscribe(
      {
        next: (value) => this.products = value,
        error: (err) => console.log(err)
      }
    )
  }

  onBrandSelectionChange(brand: string) {
    this.selectedBrand = brand;
  }

  addToFavorites(event: Event, product: Product): void {
    event.stopPropagation();
    this.favouriteProductsService.setFavouriteProducts(product);
  }

  ngOnDestroy(): void {
    if (this.productSubscription) {
      this.productSubscription.unsubscribe();  
    }
  }
}
