import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from './../../services/index';
import { Product } from './../../models/index';

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

    featuredProducts: Product[] = [];

    constructor(private router: Router,
        private productsService: ProductsService) {

    }

    ngOnInit() {
        //get all products
        this.productsService.getAllProducts()
            .subscribe(
                {
                    next: (products: Product[]) => {
                        products.forEach(product => this.featuredProducts.push(product))
                    },
                    error: error => console.log(error)
                }
            );
    }

    navigateToMaleShopping() {
        this.router.navigate(['/male-products']);
    }

    navigateToFemaleShopping() {
        this.router.navigate(['/female-products']);
    }
}
