import { Injectable } from '@angular/core';
import { Product } from './../models/index';
import { Observable } from'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../envs/env_local';
import { ApiPaths } from './../helpers/api-paths';

@Injectable({
  providedIn: 'root',
})
export class SearchProductsService {
  private searchResults: any[] = [];

  constructor(
    private http: HttpClient) {
}

  setSearchResults(results: any[]) {
    this.searchResults = results;
  }

  getSearchResults() {
    return this.searchResults;
  }

  //API

  getProductsBySearchQuery(query: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.apiUrl}/${ApiPaths.Products}/search/` + query);
}
}