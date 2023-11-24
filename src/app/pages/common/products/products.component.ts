import { Component, OnDestroy, OnInit, Input, ViewChild } from '@angular/core';
import { AuthService } from './../../../services/index';
import { Product, CheckBoxColor, CheckBoxBrand, PriceRange } from './../../../models/index';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MatSlider } from '@angular/material/slider';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  
  @Input() header: string = 'SECTION';
  sliderValue = 50;

  products: Product[] = [];

  //minPrice: number = 0; // Initial price range
  //maxPrice: number = 200;
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
    private formBuilder: FormBuilder) {
    
    }

  ngOnInit() {   
    this.products = [{
      name: 'run',
      description:
        'A shoe made by adidas from the run collection. Crafted with the most expensive materials to give you all the assistance you need in your daily routine or during training.',
      price: 80.0,
      image: 'assets/adidas-run-black.png',
    },
    {
      name: 'run',
      description:
        'A shoe made by adidas from the run collection. Crafted with the most expensive materials to give you all the assistance you need in your daily routine or during training.',
      price: 80.0,
      image: 'assets/adidas-run-black.png',
    },
    {
      name: 'run',
      description:
        'A shoe made by adidas from the run collection. Crafted with the most expensive materials to give you all the assistance you need in your daily routine or during training.',
      price: 80.0,
      image: 'assets/adidas-run-black.png',
    },{
      name: 'run',
      description:
        'A shoe made by adidas from the run collection. Crafted with the most expensive materials to give you all the assistance you need in your daily routine or during training.',
      price: 80.0,
      image: 'assets/adidas-run-black.png',
    },] 
  }

  ngOnChanges() {
    console.log(this.value)
  } 

  goToProduct(): void {
    
  }

  /*udateSelectedColors(color: string): void {
    if (this.checkBoxColor) {
      this.selectedColors.push(color);
    } else {
      const index = this.selectedColors.indexOf(color);
      if (index !== -1) {
        this.selectedColors.splice(index, 1);
      }
    }
  }*/

  getFilteredData(): void {
    //call service
    console.log(this.checkBoxColor)
    console.log(this.checkBoxBrand)
    console.log('Price Range:', this.price.min, this.price.max);
  }

  ngOnDestroy(): void {
    
  }
}
