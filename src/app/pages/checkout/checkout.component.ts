// Import necessary modules
import { Component, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { Product, SelectedProduct, ShipData } from './../../models/index';
import { Subscription } from'rxjs';
import { PaymentService, ProductsService } from './../../services/index';

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
    invalidPostalCode: boolean = false;

    
    private productSubscription: Subscription = new Subscription();
    private shipSubscription: Subscription = new Subscription();

    constructor(private router: Router,
        private productsService: ProductsService,
        private paymentService: PaymentService) {
        
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
        
        this.shipSubscription = this.paymentService.getShipData()
        .subscribe({
          next: (value: ShipData) => this.shipData = value,
          error: (err) => console.log(err)
        }) 

      
    }

    onSubmit() {
      if (
        this.shipData.name &&
        this.shipData.surname &&
        this.shipData.address &&
        this.shipData.postcode.length === 5 &&
        this.shipData.city &&
        this.shipData.country
      ) {
        this.paymentService.setShipData(this.shipData);
        this.router.navigate(['payment']);
      }
      
    }

    validatePostalCode(value: string) {
      const postalCodePattern = /^\d{5}$/;
      this.invalidPostalCode = !postalCodePattern.test(value);
    }

    goBack() {
      this.router.navigate(['home']);
    }

    ngOnDestroy(): void {
        if (this.productSubscription) {
          this.productSubscription.unsubscribe();  
        }
        if (this.shipSubscription) {
          this.shipSubscription.unsubscribe();  
        }
    }
}