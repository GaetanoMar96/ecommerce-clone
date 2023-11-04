import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductDialogComponent } from './../pages/index';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DialogService {

  constructor(private dialog: MatDialog) {}

  openViewCartDialog(product: any): void {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
        data: product,
        width: '800px',
        height: '400px'
    });

    dialogRef.componentInstance.closeEmitter.subscribe(() => {
        this.dialog.closeAll();
      }
    );
  }
}
