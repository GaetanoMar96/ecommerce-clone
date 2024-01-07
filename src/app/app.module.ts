import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AppComponent } from './app.component';
import { RegisterComponent, 
  LoginComponent, 
  HeaderComponent, 
  FooterComponent,
  HomeComponent, 
  ProductsComponent, 
  ProductComponent,
  ProductDialogComponent,
  MaleProductsComponent,
  FemaleProductsComponent,
  SearchProductsComponent,
  CartComponent,
  CheckoutComponent,
  ProductSummaryComponent,
  PaymentComponent,
  CategoryComponent,
  FavouriteProductsComponent,
  OrderSummaryComponent,
  AccountComponent
} from './pages/index';
import { AuthInterceptorService, ErrorInterceptorService } from './services/index';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { firebaseConfig } from './envs/env_firebase';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ProductsComponent,
    ProductComponent,
    ProductDialogComponent,
    MaleProductsComponent,
    FemaleProductsComponent,
    SearchProductsComponent,
    CartComponent,
    CheckoutComponent,
    ProductSummaryComponent,
    PaymentComponent,
    CategoryComponent,
    FavouriteProductsComponent,
    OrderSummaryComponent,
    AccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatDividerModule,
    MatDialogModule,
    MatBadgeModule,
    MatMenuModule,
    MatCardModule,
    MatSelectModule,
    MatSliderModule,
    MatCheckboxModule,
    MatButtonToggleModule,
    MatRadioModule,
    AngularFireModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(firebaseConfig),
  ],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}},
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
