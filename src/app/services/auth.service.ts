import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from './../envs/env_local';
import { ApiPaths } from './../helpers/api-paths';
import { RegisterRequest, AuthRequest, AuthResponse } from "./../models/index";
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
    public userSubject: BehaviorSubject<AuthResponse | null>;
    public user: Observable<AuthResponse | null>;

    constructor(
        private router: Router,
        private http: HttpClient,
        private afAuth: AngularFireAuth) {
        this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
        this.user = this.userSubject.asObservable();

        // Subscribe to Firebase Auth state changes
        this.afAuth.authState.subscribe((user) => {
            if (user) {
            user.getIdToken().then((token) => {
                const userData: AuthResponse = { userId: user.uid, accessToken: token };
                this.userSubject.next(userData);
                localStorage.setItem('user', JSON.stringify(userData));
            });
            } else {
                this.userSubject.next(null);
                localStorage.removeItem('user');
            }
        });
    }

    public get userValue() {
        return this.userSubject.value;
    }

    /*Adding firebase authentication*/
    async register(request: RegisterRequest): Promise<void> {
        try {
            await this.afAuth.createUserWithEmailAndPassword(
                request.email, 
                request.password
            );            
        } catch (error) {
            throw error; // Handle registration failure
        }
    }

    async login(request: AuthRequest): Promise<void> {
        try {
            await this.afAuth.signInWithEmailAndPassword(
                request.email, 
                request.password
            );
        } catch (error) {
            throw error; // Handle login failure
        }
    }

    async logout(): Promise<void> {
        try {
            await this.afAuth.signOut();
            // Redirect to login page
            this.router.navigate(['/login']);
        } catch (error) {
            throw error; 
        }
    }

    /*
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
    }*/

    //utility method to check if token expired
    tokenExpired(token: string): boolean {
        const expiry = (JSON.parse(window.atob(token.split('.')[1]))).exp;
        return (Math.floor((new Date).getTime() / 1000)) >= expiry;
    }
}