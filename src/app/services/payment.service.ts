import { Injectable } from '@angular/core';
import { Product, ShipData } from './../models/index';
import { BehaviorSubject, Observable } from'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
    private _shipData: ShipData = {
        name: '',
        surname: '',
        address: '',
        postcode: '',
        city: '',
        country: ''
    };

    private shipSubj = new BehaviorSubject<ShipData>(this._shipData);

    setShipData(data: ShipData) {
        this.shipSubj.next(data);
    }

    getShipData(): Observable<ShipData> {
        return this.shipSubj.asObservable();
    }

}