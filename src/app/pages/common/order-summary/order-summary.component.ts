import { Component, OnInit, Input } from '@angular/core';
import { Order } from './../../../models/index';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent implements OnInit {

    @Input() orders: Order[] = [];

    ngOnInit(): void {
        
    }

}