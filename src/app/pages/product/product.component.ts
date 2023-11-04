import { Component, OnDestroy, OnInit, Input, ViewChild } from '@angular/core';
import { DialogService,  } from './../../services/index';
import { Product, CheckBoxColor, PriceRange } from './../../models/index';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSlider } from '@angular/material/slider';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit, OnDestroy {
  product: any;
  size: number = 39; //default
  color: string = 'black'; //default: 'black
  disabled: boolean = true; //used to disable cart button

  constructor(
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    this.product = {
      name: 'run',
      brand: 'adidas',
      description:
        'A shoe made by adidas from the run collection. Crafted with the most expensive materials to give you all the assistance you need in your daily routine or during training.',
      price: 80.0,
      gender: 'male',
      images: [
        {
          image: 'assets/adidas-run-black.png',
          color: 'black',
        },
        {
          image: 'assets/adidas-run-white.png',
          color: 'white',
        },
      ],
    };
  }

  toggle(): void {
    if (this.size != 0) { //the customer chose a color and a size for the shoes
      this.disabled = false; //proceed to the cart
    }
  }

  addToCart() {
    //button method to add item to cart and open modal to notify customer
    console.log(this.color);
    console.log(this.size);
    this.dialogService.openViewCartDialog(this.product)
  }

  ngOnDestroy(): void {}
}
