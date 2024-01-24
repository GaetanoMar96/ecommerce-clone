import { Injectable } from '@angular/core';
import { Product } from './../models/index';
import { BehaviorSubject, Observable } from'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavouriteProductsService {

    private productSubj = new BehaviorSubject<Product[]>([]);

    constructor() {

    }

    //GETTERS and SETTERS
    setFavouriteProducts(product: Product) {
        let data: Product[]
        data = this.productSubj.getValue()
        data.push(product)
        this.productSubj.next(data)
    }

    getFavouriteProducts(): Observable<Product[]> {
        return this.productSubj.asObservable();
    }

    removeFavouriteProducts(index: number): Observable<Product[]> {
        const products = this.productSubj.getValue();
        products.splice(index, 1); 
        this.productSubj.next(products); 
        return this.productSubj.asObservable();
    }

}