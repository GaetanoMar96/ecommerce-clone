import { Component, OnInit, OnChanges } from "@angular/core";
import { AuthService, SearchProductsService } from './../../../services/index';
import { Router } from '@angular/router';
import { Subscription } from'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html' 
})
export class HeaderComponent implements OnInit {

    hidden: boolean = false;
    //value: string = null;
    searchQuery: string = '';
    showSearchBar: boolean = false;

    private productSubscription: Subscription = new Subscription();

    constructor(
        private router: Router,
        private authService: AuthService,
        private searchProductsService: SearchProductsService) {}
    
    ngOnInit(): void {
        
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
                    this.searchProductsService.setSearchResults(value)
                    this.toggleSearchBar()
                    this.router.navigate(['/search-products']);
                  },
                  error: (err) => console.log(err)
                }
              )            
        }
      }

    fakeSearch(query: string): any[] {
        //do backend call with query search
        return [{
            name: 'run',
            description:
              'A shoe made by adidas from the run collection. Crafted with the most expensive materials to give you all the assistance you need in your daily routine or during training.',
            price: 80.0,
            image: 'assets/adidas-run-black.png',
          },
          {
            name: 'run',
            description:
              'A shoe made by adidas from the run collection. Crafted with the most expensive materials to give you all the assistance you need in your daily routine or during training.',
            price: 80.0,
            image: 'assets/adidas-run-black.png',
          },
          {
            name: 'run',
            description:
              'A shoe made by adidas from the run collection. Crafted with the most expensive materials to give you all the assistance you need in your daily routine or during training.',
            price: 80.0,
            image: 'assets/adidas-run-black.png',
          },{
            name: 'run',
            description:
              'A shoe made by adidas from the run collection. Crafted with the most expensive materials to give you all the assistance you need in your daily routine or during training.',
            price: 80.0,
            image: 'assets/adidas-run-black.png',
          },] 
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