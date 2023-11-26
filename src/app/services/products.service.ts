import { Injectable } from '@angular/core';
import { Product, SelectedProduct } from './../models/index';
import { BehaviorSubject, Observable } from'rxjs';

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
        this.productsSubjList.getValue().splice(index)
        return this.productsSubjList.asObservable();
    }

}