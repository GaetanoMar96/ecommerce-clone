import { Injectable } from '@angular/core';
import { Product, ShipData, PaymentIntent } from './../models/index';
import { BehaviorSubject, Observable } from'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { stripeKey } from './../envs/env_firebase';
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
        const headers = new HttpHeaders({
          Authorization: 'Bearer ' + stripeKey.stripeApiKey,
          'Content-Type': 'application/x-www-form-urlencoded',
        });
    
        const body = new URLSearchParams();
        body.set('payment_method', paymentIntent.paymentMethodId);
        body.set('currency', paymentIntent.currency);
        body.set('amount', paymentIntent.amount);
    
        return this.http.post<any>(`https://api.stripe.com/v1/payment_intents`, body.toString(), { headers });
    }

    /*
    postProcessPayment(paymentIntent: PaymentIntent): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl}/${ApiPaths.Payment}/process`, paymentIntent);
    }*/

}