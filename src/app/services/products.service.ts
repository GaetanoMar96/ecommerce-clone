import { Injectable } from '@angular/core';
import { Product, SelectedProduct, ProductFilters } from './../models/index';
import { BehaviorSubject, Observable } from'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../envs/env_local';
import { ApiPaths } from './../helpers/api-paths';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
    private _product = {
        name: '',
        brand: '',
        description: '',
        price: 0,
        gender: 0,
        images: []
    };

    private productSubj = new BehaviorSubject<Product>(this._product);
    private productsSubjList = new BehaviorSubject<SelectedProduct[]>([]);

    constructor(
        private http: HttpClient) {
    }

    setProduct(product: Product) {
        this.productSubj.next(product);
    }

    getProduct(): Observable<Product> {
        return this.productSubj.asObservable();
    }

    setProductsForCart(product: SelectedProduct) {
        let data: SelectedProduct[]
        data = this.productsSubjList.getValue()
        data.push(product)
        this.productsSubjList.next(data)
    }

    getProductsForCart(): Observable<SelectedProduct[]> {
        return this.productsSubjList.asObservable();
    }

    removeProductsForCart(index: number): Observable<SelectedProduct[]> {
        const products = this.productsSubjList.getValue();
        products.splice(index, 1); 
        this.productsSubjList.next(products); 
        return this.productsSubjList.asObservable();
    }

    removeAllProductsFromCart(): void {
        this.productsSubjList.getValue().splice(0, this.productsSubjList.getValue().length);
        this.productsSubjList.next([]);
    }

    //API

    getProductsByGender(gender: string): Observable<Product[]> {
        return this.http.get<Product[]>(`${environment.apiUrl}/${ApiPaths.Products}/` + gender);
    }

    getProductsByFilters(productFilters: ProductFilters): Observable<Product[]> {
        return this.http.post<Product[]>(`${environment.apiUrl}/${ApiPaths.Products}/filters`, productFilters);
    }

}