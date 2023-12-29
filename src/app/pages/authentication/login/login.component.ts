import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { take } from 'rxjs/operators';
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
        this.router.navigate(['/home']);
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
      /*
      this.authService
        .login(request)
        .pipe(take(1))
        .subscribe({
          next: () => {
            this.router.navigateByUrl('home');
          },
          error: (error) => {
            //create form error
            console.log(error);
            this.loading = false;
          },
        });*/
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
