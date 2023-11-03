import { Component, OnDestroy, OnInit, Input, ViewChild } from '@angular/core';
import { AuthService } from './../../../services/index';
import { Product, CheckBoxColor, PriceRange } from './../../../models/index';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSlider } from '@angular/material/slider';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  
  @Input() header: string = 'MEN SECTION';
  sliderValue = 50;

  products: Product[] = [];

  priceRange: PriceRange = {
    min: 0,
    max: 500
  }

  value = 500;

  checkBox: CheckBoxColor = {
    red: false,
    white: false,
    black: false,
    green: false,
    brown: false,
  };

  selectedCategory: string = 'all';

  selectedColors: string[] = [];

  constructor( 
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder) {
    
    }

  ngOnInit() {   
    this.products = [{
        name: 'scarpa1',
        description: 'Scarpa',
        image: 'assets/shopping_home_female.jpg',
        price: 9.99
    },
    {
        name: 'scarpa1',
        description: 'Scarpa',
        image: 'assets/shopping_home_female.jpg',
        price: 9.99
    },
    {
        name: 'scarpa1',
        description: 'Scarpa',
        image: 'assets/shopping_home_female.jpg',
        price: 9.99
    },{
        name: 'scarpa1',
        description: 'Scarpa',
        image: 'assets/shopping_home_female.jpg',
        price: 9.99
    }] 
  }

  ngOnChanges() {
    console.log(this.value)
    console.log(this.selectedCategory)
  } 

  goToProduct(): void {
    
  }

  updateSelectedColors(color: any): void {
    if (this.checkBox.black) {
      this.selectedColors.push(color);
    } else {
      const index = this.selectedColors.indexOf(color);
      if (index !== -1) {
        this.selectedColors.splice(index, 1);
      }
    }
  }

  getFilteredData(): void {
    //call service
    console.log(this.selectedCategory)
    console.log(this.checkBox)
  }

  ngOnDestroy(): void {
    
  }
}
