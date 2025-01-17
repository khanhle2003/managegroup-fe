import { Routes } from '@angular/router';
import { DatatableComponent } from '../layout2/main-layout/datatable/datatable.component';
import { LoginComponent } from '../layout2/auth-layout/login/login.component';
import { RegisterComponent } from '../layout2/auth-layout/register/register.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MainLayoutComponent } from '../layout2/main-layout/main-layout.component';
import {AddComponent} from "../components/add/add.component";
import { UserDetailComponent } from '../components/user-detail/user-detail.component';
import { ExcelImportComponent } from '../components/import-excel/import-excel.component';
import { EditUserComponent } from '../components/edit-user/edit-user.component';
import { MainComponent } from '../layout2/main-layout/main/main.component';
import { AuthLayoutComponent } from '../layout2/auth-layout/auth-layout.component';

export const routes: Routes = [

  // {path: 'login', component: LoginComponent},
  // {path: 'register', component: RegisterComponent},
  
  // {path: 'data-table', component: DatatableComponent},
  // {path: 'add-data', component: AddComponent},
  // {path: 'user-detail/:id', component: UserDetailComponent},
  // {path: 'app-import-excel', component: ExcelImportComponent},
  // {path: 'edit-user/:id', component: EditUserComponent},
  // {path: 'main', component: MainComponent},

  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: '/main', pathMatch: 'full' },
      {path: 'main', component: MainComponent},
      {path: 'data-table', component: DatatableComponent},
    ],
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ],
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
