import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService, FavouriteProductsService, UtilsService } from '../../services/index';
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
        private utilsService: UtilsService
    ) { }

    ngOnInit(): void {
        this.productSubscription = this.favouriteProductsService.getFavouriteProducts()
            .subscribe((value: Product[]) => {
                this.products = this.utilsService.chunkArray(value, 4); // Split into rows of 4 products
            });
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
