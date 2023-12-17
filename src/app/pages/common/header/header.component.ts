import { Component, OnInit, OnChanges } from "@angular/core";
import { AuthService, SearchProductsService, ProductsService, HeaderService } from './../../../services/index';
import { Router } from '@angular/router';
import { Subscription } from'rxjs';
import { SelectedProduct } from './../../../models/index';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html' 
})
export class HeaderComponent implements OnInit {

    hidden: boolean = false;
    value: number = 0;
    searchQuery: string = '';
    showSearchBar: boolean = false;

    private productSubscription: Subscription = new Subscription();

    constructor(
        private router: Router,
        private authService: AuthService,
        private headerService: HeaderService,
        private productsService: ProductsService,
        private searchProductsService: SearchProductsService) {}
    
    ngOnInit(): void {
      this.headerService.badgeCount$.subscribe(
          {
            next: (count) => 
            {
              this.value = count;
              console.log(this.value);
            },
            error: (err) => console.log(err)
          }
        )
    }

    toggleSearchBar() {
        this.showSearchBar = !this.showSearchBar;
        this.searchQuery = '';
    }

    search() {
        if (this.searchQuery != '') {
          this.productSubscription = this.searchProductsService.getProductsBySearchQuery(this.searchQuery)
              .subscribe(
                {
                  next: (value) => 
                  {
                    console.log(value)
                    this.searchProductsService.setSearchResults(value)
                    this.toggleSearchBar()
                    this.router.navigate(['/search-products']);
                  },
                  error: (err) => console.log(err)
                }
              )            
        }
    }

    goToAccount() {
        this.router.navigate(['./account'])
    }

    goToCart() {
        this.router.navigate(['./cart'])
    }

    logout() {
        this.authService.logout();
    }

    ngOnDestroy(): void {
      if (this.productSubscription) {
        this.productSubscription.unsubscribe();  
      }
    }
}