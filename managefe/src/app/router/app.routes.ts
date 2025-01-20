import { Routes } from '@angular/router';
import { DatatableComponent } from '../layout2/main-layout/datatable/datatable.component';
import { LoginComponent } from '../layout2/auth-layout/login/login.component';
import { RegisterComponent } from '../layout2/auth-layout/register/register.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MainLayoutComponent } from '../layout2/main-layout/main-layout.component';
import {AddComponent} from "../layout2/main-layout/add/add.component";
import { UserDetailComponent } from '../layout2/main-layout/user-detail/user-detail.component';
import { ExcelImportComponent } from '../layout2/main-layout/import-excel/import-excel.component';
import { EditUserComponent } from '../layout2/main-layout/edit-user/edit-user.component';
import { MainComponent } from '../layout2/main-layout/main/main.component';
import { AuthLayoutComponent } from '../layout2/auth-layout/auth-layout.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {path: 'main', component: MainComponent},
      {path: 'data-table', component: DatatableComponent},
      {path: 'user-detail/:id', component: UserDetailComponent},
      {path: 'add-data', component: AddComponent},
      {path: 'edit-user/:id', component: EditUserComponent},
      {path: 'app-import-excel', component: ExcelImportComponent},
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
