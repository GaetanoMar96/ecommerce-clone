import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthRequest } from '../../../models/index';
import { AuthService } from '../../../services/auth.service';

@Component({
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  hide = true;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.form = this.formBuilder.group({
        email: ['', Validators.required],
        password: ['', Validators.required],
      });
  }

  ngOnInit() {
    
  }

  get f() {
    return this.form.controls;
  }

  async onSubmit() {
    this.submitted = true;

    if (this.form.valid) {
      this.loading = true;

      const request: AuthRequest = {
        email: this.f.email.value,
        password: this.f.password.value,
      };
      
      try {
        await this.authService.login(request);
        this.router.navigate(['home']);
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    }
  }

  onGoogleLogin() {
    this.loading = true;
    try {
      this.authService.loginWithGoogle();
      this.router.navigate(['home']);
    } catch (error) {
      console.error('Login with Google failed:', error);
    } finally {
      this.loading = false;
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
