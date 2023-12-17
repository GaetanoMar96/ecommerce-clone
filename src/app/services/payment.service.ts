import { Injectable } from '@angular/core';
import { Product, ShipData, PaymentIntent } from './../models/index';
import { BehaviorSubject, Observable } from'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../envs/env_local';
import { ApiPaths } from './../helpers/api-paths';

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

    constructor(
        private http: HttpClient) {
    }

    setShipData(data: ShipData) {
        this.shipSubj.next(data);
    }

    getShipData(): Observable<ShipData> {
        return this.shipSubj.asObservable();
    }

    //API

    postProcessPayment(paymentIntent: PaymentIntent): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl}/${ApiPaths.Payment}/process`, paymentIntent);
    }

}