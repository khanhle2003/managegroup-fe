import { Routes } from '@angular/router';
import { DatatableComponent } from '../components/datatable/datatable.component';
import { LoginComponent } from '../auth/login/login.component';
import { RegisterComponent } from '../auth/register/register.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import {AddComponent} from "../components/add/add.component";
import { MainComponent } from '../components/layout/main/main.component';
import { UserDetailComponent } from '../components/user-detail/user-detail.component';
import { ImportExcelComponent } from '../components/import-excel/import-excel.component';

export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'data-table', component: DatatableComponent},
  {path: 'add-data', component: AddComponent},
  {path: 'user-detail/:id', component: UserDetailComponent},
  {path: 'app-import-excel', component: ImportExcelComponent},
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
