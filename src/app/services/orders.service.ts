import { Injectable } from '@angular/core';
import { Order } from './../models/index';
import { BehaviorSubject, Observable } from'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {

    constructor(
        private angularFirestore: AngularFirestore) {
    }

    //API FIREBASE 
    getOrdersByUserId(userId: string): Observable<Order[]> {
        return this.angularFirestore.collection<Order>('orders', ref => ref.where('userId', '==', userId))
          .valueChanges();
    }

    addOrder(order: Order): void {
        this.angularFirestore.collection<Order>('orders').add(order);
    }

}