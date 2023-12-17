import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from './../envs/env_local';
import { ApiPaths } from './../helpers/api-paths';
import { RegisterRequest, AuthRequest, AuthResponse } from "./../models/index";

@Injectable({ providedIn: 'root' })
export class AuthService {
    public userSubject: BehaviorSubject<AuthResponse | null>;
    public user: Observable<AuthResponse | null>;

    constructor(
        private router: Router,
        private http: HttpClient) {
        this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
        this.user = this.userSubject.asObservable();
    }

    public get userValue() {
        return this.userSubject.value;
    }

    register(request: RegisterRequest): Observable<AuthResponse> {
        return this.http.post(`${environment.apiUrl}/${ApiPaths.Auth}/register`, request);
    }

    login(request: AuthRequest): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(
            `${environment.apiUrl}/${ApiPaths.Auth}/login`, 
            request)
            .pipe(map(response => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                console.log(response)
                localStorage.setItem('user', JSON.stringify(response));
                this.userSubject.next(response);
                return response;
            }));
    }

    logout(): void {
        // remove user from session context
        this.http.post<any>(
            `${environment.apiUrl}/${ApiPaths.Auth}/logout`, "")

        // remove user from local storage and set current user to null
        localStorage.removeItem('user');
        this.userSubject.next(null);
        // redirect to login page
        this.router.navigate(['/login']);
    }

    //utility method to check if token expired
    tokenExpired(token: string): boolean {
        const expiry = (JSON.parse(window.atob(token.split('.')[1]))).exp;
        return (Math.floor((new Date).getTime() / 1000)) >= expiry;
    }
}