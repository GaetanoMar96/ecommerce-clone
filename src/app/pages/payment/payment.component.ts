// Import necessary modules
import { Component, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentIntent, SelectedProduct, ShipData } from './../../models/index';
import { Subscription } from'rxjs';
import { PaymentService, ProductsService, HeaderService } from './../../services/index';

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
    success: boolean = false;
    cardNumber: string = '';
    cvc: string = '';
    expDate: string = '';

    private productSubscription: Subscription = new Subscription();
    private shipSubscription: Subscription = new Subscription();

    constructor(private router: Router,
        private productsService: ProductsService,
        private paymentService: PaymentService,
        private headerService: HeaderService) {
        
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

    formatCardNumber() {
      // Remove spaces and format every 4 characters with a space
      this.cardNumber = this.cardNumber.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
    }

    formatExpDate() {
      // Remove non-numeric characters
      this.expDate = this.expDate.replace(/\D/g, '');
  
      // Add a slash after the first 2 characters (MM.YYYY format)
      if (this.expDate.length > 2) {
        this.expDate = `${this.expDate.slice(0, 2)}/${this.expDate.slice(2)}`;
      }
    }

    onSubmit() {
      if(!this.success) {
        if (this.selectedMethod === "cash") {
          this.success = true;
          return;
        }
        if (this.selectedMethod === "credit_card" && this.checkCardInfo()) {

          let request: PaymentIntent = {
            paymentMethodId: 'pm_card_visa',
            currency: 'eur',
            amount: this.total.toString()
          }

          this.paymentService.postProcessPayment(request).subscribe(
            {
              next: (value: any) => {
                this.success = true
              },
              error: (err) => console.log(err)
            }
          )
          
        }
      }
    }

    checkCardInfo(): boolean {
      console.log(this.cardNumber)
      console.log(this.expDate)
      return this.cardNumber === '4242 4242 4242 4242'
              && this.cvc === '222'
              && this.expDate === '12/2024'
    }

    goBack() {
      if(!this.success) {
        this.router.navigate(['checkout']);
      }
    }

    goHome() {
      //remove all elements from cart after shop
      this.productsService.removeAllProductsFromCart();
      this.headerService.updateBadgeCount(0);
      this.router.navigate(['home']);
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