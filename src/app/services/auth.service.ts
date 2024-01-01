import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { RegisterRequest, AuthRequest, AuthResponse } from "./../models/index";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from "firebase/auth";


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

    async loginWithGoogle(): Promise<void> {
        try {
          const provider = new GoogleAuthProvider();
          await this.afAuth.signInWithRedirect(provider);
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

    //utility method to check if token expired
    tokenExpired(token: string): boolean {
        const expiry = (JSON.parse(window.atob(token.split('.')[1]))).exp;
        return (Math.floor((new Date).getTime() / 1000)) >= expiry;
    }
}