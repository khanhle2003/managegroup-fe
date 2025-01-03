import { Routes } from '@angular/router';
import { DatatableComponent } from '../components/datatable/datatable.component';
import { LoginComponent } from '../auth/login/login.component';
import { RegisterComponent } from '../auth/register/register.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import {AddComponent} from "../components/add/add.component";
import { MainComponent } from '../components/layout/main/main.component';
import { UserDetailComponent } from '../components/user-detail/user-detail.component';

export const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {
    path: '',
    component: MainComponent,
    children: [
      {path: 'data-table', component: DatatableComponent},
      {path: 'add-data', component: AddComponent},
      {path:'user-detail/:id', component:UserDetailComponent}
    ]
  },
  {path: '**', redirectTo: 'login'}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
