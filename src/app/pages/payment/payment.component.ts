// Import necessary modules
import { Component, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { Product, SelectedProduct, ShipData } from './../../models/index';
import { Subscription } from'rxjs';
import { PaymentService, ProductsService } from './../../services/index';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent {
    
    selectedMethod = "";
    showTestCard: boolean = false;
    products: SelectedProduct[] = [];
    shipData: ShipData = {
        name: '',
        surname: '',
        address: '',
        postcode: '',
        city: '',
        country: ''
    };
    total: number = 0

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
            next: (data: ShipData) => 
              {
                this.shipData = data;
              },
            error: (err) => console.log(err)
          }) 
    }

    showTestCardInfo() {
        this.showTestCard = !this.showTestCard; // Toggle test card info visibility
    }

    onSubmit() {
    }

    goBack() {
      this.router.navigate(['checkout']);
    }

    ngOnDestroy(): void {
        if (this.productSubscription) {
          this.productSubscription.unsubscribe();  
        }

        if(this.shipSubscription) {
            this.shipSubscription.unsubscribe();
        }
    }
}