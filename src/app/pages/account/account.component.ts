// account.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService, OrdersService } from './../../services/index';
import { Order } from './../../models/index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  
  orders: Order[] = []; 
  userId: string = '';
  activeTab = 'orders'
  hide = true;
  newPassword: string = '';

  constructor(private authService: AuthService,
    private ordersService: OrdersService,
    private router: Router) { }

  ngOnInit() {
    // Fetch user data
    if(this.authService.userValue && this.authService.userValue?.userId) {
        this.userId = this.authService.userValue?.userId;
        this.ordersService.getOrdersByUserId(this.userId)
        .subscribe((ordersData) => {
            this.orders = ordersData;
        });
    }
  }

  switchTab(tab: string) {
    this.activeTab = tab
  }

  toggle() {
    this.hide = !this.hide
  }

  // Method to handle password change
  async changePassword() {
    if(this.newPassword !== '') {
    try {
      await this.authService.changePassword(this.newPassword)
      .then(() => {
        this.router.navigate(['home']);
      });
    } catch (error) {
      console.error('Login with Google failed:', error);
    }
  }
}
}
