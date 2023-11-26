import { Component, OnDestroy, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { AuthService, ProductsService } from './../../../services/index';
import { Product, CheckBoxColor, CheckBoxBrand, PriceRange } from './../../../models/index';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MatSlider } from '@angular/material/slider';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProductsComponent implements OnInit, OnDestroy {
  
  @Input() header: string = 'SECTION';
  sliderValue = 50;

  products: Product[] = [];

  price: PriceRange = {
    min: 0,
    max: 200
  }

  value = 500;

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

  checkBoxBrand: CheckBoxBrand = {
    nike: false,
    adidas: false,
    converse: false
  }

  selectedColors: string[] = [];

  constructor( 
    private authService: AuthService,
    private router: Router,
    private productsService: ProductsService) {
    
    }

  ngOnInit() {   
    this.products = [{
      name: 'run',
      brand: 'nike',
      description:
        'A shoe made by adidas from the run collection. Crafted with the most expensive materials to give you all the assistance you need in your daily routine or during training.',
      price: 80.0,
      images: [{imageBin: 'assets/adidas-run-black.png', color: "blue"}]
    },
    {
      name: 'run',
      brand: 'nike',
      description:
        'A shoe made by adidas from the run collection. Crafted with the most expensive materials to give you all the assistance you need in your daily routine or during training.',
      price: 80.0,
      images: [{imageBin: 'assets/adidas-run-black.png', color: "blue"}]
    },
    {
      name: 'run',
      brand: 'nike',
      description:
        'A shoe made by adidas from the run collection. Crafted with the most expensive materials to give you all the assistance you need in your daily routine or during training.',
      price: 80.0,
      images: [{imageBin: 'assets/adidas-run-black.png', color: "blue"}]
    },{
      name: 'run',
      brand: 'nike',
      description:
        'A shoe made by adidas from the run collection. Crafted with the most expensive materials to give you all the assistance you need in your daily routine or during training.',
      price: 80.0,
      images: [{imageBin: 'assets/adidas-run-black.png', color: "blue"}]
    },] 
  }

  ngOnChanges() {
    
  } 

  goToProduct(product: Product): void {
    console.log(product)
    this.productsService.setProduct(product);
    this.router.navigate(['product'], { state: { section: this.header } })
  }

  getFilteredData(): void {
    //call service
    console.log(this.checkBoxColor)
    console.log(this.checkBoxBrand)
    console.log('Price Range:', this.price.min, this.price.max);
  }

  ngOnDestroy(): void {
    
  }
}
