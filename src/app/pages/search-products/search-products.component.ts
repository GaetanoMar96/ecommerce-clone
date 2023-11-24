import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  DialogService,
  SearchProductsService
} from './../../services/index';

@Component({
  selector: 'app-search-products',
  templateUrl: './search-products.component.html',
  styleUrls: ['./search-products.component.scss'],
})
export class SearchProductsComponent implements OnInit {
  movies: any[] = [];
  data: any[] = [];

  constructor(
    private router: ActivatedRoute,
    private dialogService: DialogService,
    private searchProductsService: SearchProductsService
  ) {}

  ngOnInit(): void {
    this.data = this.searchProductsService.getSearchResults();
    this.pushData()
  }

  pushData() {
    let i = 1
    let row: any[] = []
    while (i < this.data.length) {
      if (i % 4 === 0) {
        this.movies.push(row)
        row = []
      } else {
        row.push(this.data[i])
      }
      i += 1
    }

    if (row.length > 0) {
      this.movies.push(row)
    }
    console.log(this.movies)
  }

  
}
