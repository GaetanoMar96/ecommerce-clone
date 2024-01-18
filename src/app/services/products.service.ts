import { Injectable } from '@angular/core';
import { Product, SelectedProduct, ProductFilters } from './../models/index';
import { BehaviorSubject, Observable } from'rxjs';
import { tap, map } from 'rxjs/operators'
import { AngularFirestore, AngularFirestoreCollection, QueryFn } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
    private _product = {
        name: '',
        brand: '',
        description: '',
        price: 0,
        gender: '',
        images: []
    };

    private productSubj = new BehaviorSubject<Product>(this._product);
    private productsSubjList = new BehaviorSubject<SelectedProduct[]>([]);

    private productsCollection: AngularFirestoreCollection<Product>;
    private cachedProducts$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);

    constructor(
        private angularFirestore: AngularFirestore) {
            this.productsCollection = this.angularFirestore.collection<Product>('products');
            this.productsCollection.valueChanges()
            .subscribe(
              (products: Product[]) => {
                this.cachedProducts$.next(products) 
              }
            );
    }

    //GETTERS and SETTERS
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

    //CACHING
    getAllProducts(): Observable<Product[]> {
      return this.productsCollection.valueChanges()
      /*this.productsCollection.valueChanges()
      .subscribe(
        (products: Product[]) => {
          this.cachedProducts$.next(products) 
          return this.cachedProducts$.asObservable()
        }
      );*/
      
    }

    //API FIREBASE 
    getProductsByGender(gender: string): Observable<Product[]> {
        return this.cachedProducts$.pipe(
            map(products => products.filter(product => product.gender === gender))
        );
    }

    getProductsByFilters(productFilters: ProductFilters): Observable<Product[]> {
        return this.cachedProducts$.pipe(
            map(products => this.filterProducts(products, productFilters))
        );
    }

    private filterProducts(products: Product[], filters: ProductFilters): Product[] {
        return products.filter(product => {
          let valid = true;
    
          if (filters.gender && product.gender !== filters.gender) {
            valid = false;
          }
          if (filters.brand && product.brand !== filters.brand) {
            valid = false;
          }
          if (filters.minPrice && product.price && product.price < filters.minPrice) {
            valid = false;
          }
          if (filters.maxPrice && product.price && product.price > filters.maxPrice) {
            valid = false;
          }
          if (filters.colors && filters.colors.length > 0 && product.images) {
            const productColors = product.images.map(image => image.color);
            const intersect = productColors.filter(color => filters.colors.includes(color));
            if (intersect.length === 0) {
              valid = false;
            }
          }    
          return valid;
        });
    }
}