import { Component, OnInit, OnChanges } from "@angular/core";
import { AuthService } from './../../../services/index';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html' 
})
export class HeaderComponent implements OnInit {

    hidden: boolean = false;
    //value: string = null;

    constructor(
        private router: Router,
        private authService: AuthService) {}
    
    ngOnInit(): void {
        
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