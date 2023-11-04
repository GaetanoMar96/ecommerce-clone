import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent, 
  LoginComponent, 
  HomeComponent,  
  ProductComponent,
  FemaleProductsComponent,
  MaleProductsComponent } from './pages/index';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'male-products', component: MaleProductsComponent },
  { path: 'female-products', component: FemaleProductsComponent },
  { path: 'product', component: ProductComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
