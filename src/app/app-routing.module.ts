import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent, 
  LoginComponent, 
  HomeComponent,  
  ProductComponent,
  FemaleProductsComponent,
  MaleProductsComponent,
  SearchProductsComponent,
  CartComponent,
  CheckoutComponent,
  PaymentComponent,
  CategoryComponent,
  FavouriteProductsComponent,
  AccountComponent } from './pages/index';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'male-products', component: MaleProductsComponent },
  { path: 'female-products', component: FemaleProductsComponent },
  { path: 'search-products', component: SearchProductsComponent },
  { path: 'product', component: ProductComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'favourite', component: FavouriteProductsComponent },
  { path: 'account', component: AccountComponent },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
