// account.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService, OrdersService } from './../../services/index';
import { Order } from './../../models/index';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  user = {
    userId: "EaPOwsoJBpe8HeSfcepAIfupxw43",
    email: "myemail"
  };
  orders: Order[] = []; 
  userId: string = '';
  activeTab = 'info'

  constructor(private authService: AuthService,
    private ordersService: OrdersService) { }

  ngOnInit() {
    // Fetch user data
    if(this.authService.userValue && this.authService.userValue?.userId) {
        this.userId = this.authService.userValue?.userId;
        this.ordersService.getOrdersByUserId(this.user.userId)
        .subscribe((ordersData) => {
            this.orders = ordersData;
        });
    }
  }

  switchTab(tab: string) {
    this.activeTab = tab
  }

  // Method to handle password change
  /*changePassword(newPassword: string) {
    this.userService.changePassword(newPassword).subscribe(() => {
      // Password changed successfully
    }, (error) => {
      // Handle error
    });
  }*/
}
