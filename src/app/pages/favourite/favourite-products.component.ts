import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService, FavouriteProductsService } from '../../services/index';
import { Product } from '../../models/index';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-favourite-products',
    templateUrl: './favourite-products.component.html',
    styleUrls: ['./favourite-products.component.scss'],
})
export class FavouriteProductsComponent implements OnInit {
    products: Product[][] = [];
    private productSubscription: Subscription | undefined;

    constructor(
        private router: Router,
        private productsService: ProductsService,
        private favouriteProductsService: FavouriteProductsService,
    ) { }

    ngOnInit(): void {
        this.productSubscription = this.favouriteProductsService.getFavouriteProducts()
            .subscribe((value: Product[]) => {
                this.products = this.chunkArray(value, 4); // Split into rows of 4 products
            });
    }

    // Function to split array into chunks (rows of 4 products)
    chunkArray(arr: Product[], size: number): Product[][] {
        const chunkedArray: Product[][] = [];
        for (let i = 0; i < arr.length; i += size) {
            chunkedArray.push(arr.slice(i, i + size));
        }
        return chunkedArray;
    }

    removeToFavorites(event: Event, index: number) {
        event.stopPropagation();
        this.favouriteProductsService.removeFavouriteProducts(index);
    }

    goToProduct(product: Product): void {
        this.productsService.setProduct(product);
        this.router.navigate(['product'], { state: { section: 'home' } })
      }

    ngOnDestroy(): void {
        if (this.productSubscription) {
            this.productSubscription.unsubscribe();
        }
    }
}
