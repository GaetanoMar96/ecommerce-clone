import { Component, OnDestroy, OnInit, Input, ViewChild } from '@angular/core';
import { AuthService } from './../../services/index';
import { Product, CheckBoxColor, PriceRange } from './../../models/index';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSlider } from '@angular/material/slider';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {
  
  @Input() product: any;
   size: string = 'X';
   color: string = 'Black';
   quantity: number = 0;

  constructor( 
    ) {
    
    }

  ngOnInit() {   
    this.product = {
        name: 'scarpa1',
        description: 'Scarpa',
        image: 'assets/shopping_home_female.jpg',
        price: 9.99
    }
  }

  addToCart() {

  }
  ngOnDestroy(): void {
    
  }
}
