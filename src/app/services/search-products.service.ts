import { Injectable } from '@angular/core';
import { Product } from './../models/index';
import { Observable } from'rxjs';
import { map } from'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from './../envs/env_local';
import { ApiPaths } from './../helpers/api-paths';
import { ProductsService } from './index';

@Injectable({
  providedIn: 'root',
})
export class SearchProductsService {
  private searchResults: any[] = [];

  constructor(
    private http: HttpClient,
    private productsService: ProductsService) {
}

  setSearchResults(results: any[]) {
    this.searchResults = results;
  }

  getSearchResults() {
    return this.searchResults;
  }

  //API

  getProductsBySearchQuery(searchQuery: string): Observable<Product[]> {
    return this.productsService.getAllProducts().pipe(
      map((products: Product[]) => {
        if (!searchQuery) {
          return products; // Return all products if no search query provided
        }

        const regexBrand = new RegExp(searchQuery, 'i'); // Case-insensitive regex
        const filteredProducts = products.filter(product => {
          const brandMatches = regexBrand.test(product.brand || ''); // Match brand
          const nameMatches = regexBrand.test(product.name || ''); // Match name
          return brandMatches || nameMatches; // Return if either brand or name matches
        });

        return filteredProducts;
      })
    );
  }

}