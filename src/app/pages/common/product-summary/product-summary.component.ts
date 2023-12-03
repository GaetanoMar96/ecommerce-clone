import { Component, OnDestroy, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { SelectedProduct } from './../../../models/index';

@Component({
  selector: 'app-product-summary',
  templateUrl: './product-summary.component.html',
  styleUrls: ['./product-summary.component.scss']
})
export class ProductSummaryComponent implements OnInit {

    @Input() products: SelectedProduct[] = [];
    @Input() total: number = 0;

    ngOnInit(): void {
        
    }

}