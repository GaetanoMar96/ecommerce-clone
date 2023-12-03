// Import necessary modules
import { Component, NgModule } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Product, SelectedProduct, ShipData } from './../../models/index';
import { Subscription } from'rxjs';
import { DialogService, ProductsService } from './../../services/index';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
    
    shipData: ShipData = {
        name: '',
        surname: '',
        address: '',
        postcode: '',
        city: '',
        country: ''
    };

    products: SelectedProduct[] = [];
    total: number = 0
    private productSubscription: Subscription = new Subscription();

    constructor(private formBuilder: FormBuilder,
        private productsService: ProductsService,) {
        
    }
  
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

    onSubmit() {
    }

    ngOnDestroy(): void {
        if (this.productSubscription) {
          this.productSubscription.unsubscribe();  
        }
    }
}