import { Component, OnInit, OnChanges } from "@angular/core";
import { AuthService, SearchProductsService } from './../../../services/index';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html' 
})
export class HeaderComponent implements OnInit {

    hidden: boolean = false;
    //value: string = null;
    searchQuery: string = '';
    showSearchBar: boolean = false;

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
            this.searchProductsService.setSearchResults(this.fakeSearch(this.searchQuery))
            this.toggleSearchBar()
            this.router.navigate(['/search-products']);
        }
        // You can perform any search logic here, e.g., make an API request to retrieve matching results
        // For this example, we'll assume a fake array of shoe items
        
    
        // Navigate to the search results component with the matching results
        
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
}