import { Component, Output, EventEmitter, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-dialog-product',
  templateUrl: './dialog-product.component.html',
  styleUrls: [ './dialog-product.component.scss' ]
})
export class ProductDialogComponent {

  @Output() closeEmitter = new EventEmitter<void>();

  constructor(private router: Router, @Inject(MAT_DIALOG_DATA) public product: any)
  {}

  ngOnInit() {
    
  }

  goToCart(): void {
    this.closeEmitter.emit();
    this.router.navigate(['/cart']);
  }

  goToHome(): void {
    this.router.navigate(['/home']);
    this.closeEmitter.emit();
  }
}
