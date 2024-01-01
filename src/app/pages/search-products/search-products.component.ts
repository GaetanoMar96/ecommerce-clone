import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  DialogService,
  SearchProductsService,
  ProductsService
} from './../../services/index';
import { Product } from './../../models/index';


@Component({
  selector: 'app-search-products',
  templateUrl: './search-products.component.html',
  styleUrls: ['./search-products.component.scss'],
})
export class SearchProductsComponent implements OnInit {
  products: any[] = [];
  data: any[] = [];

  constructor(
    private router: Router,
    private dialogService: DialogService,
    private searchProductsService: SearchProductsService,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.data = this.searchProductsService.getSearchResults();
    this.pushData();
  }

  pushData() {
    let i = 1
    let row: any[] = []
    while (i < this.data.length) {
      if (i % 4 === 0) {
        this.products.push(row)
        row = []
      } else {
        row.push(this.data[i])
      }
      i += 1
    }

    if (row.length > 0) {
      this.products.push(row)
    }
  }

  goToProduct(product: Product): void {
    this.productsService.setProduct(product);
    this.router.navigate(['product'], { state: { section: 'home' } })
  }
  
}
