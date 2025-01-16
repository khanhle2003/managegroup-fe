import { Routes } from '@angular/router';
import { DatatableComponent } from '../components/datatable/datatable.component';
import { LoginComponent } from '../auth/login/login.component';
import { RegisterComponent } from '../auth/register/register.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import {AddComponent} from "../components/add/add.component";
import { UserDetailComponent } from '../components/user-detail/user-detail.component';
import { ExcelImportComponent } from '../components/import-excel/import-excel.component';
import { EditUserComponent } from '../components/edit-user/edit-user.component';
import { MainComponent } from '../components/layout/main/main.component';

export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'data-table', component: DatatableComponent},
  {path: 'add-data', component: AddComponent},
  {path: 'user-detail/:id', component: UserDetailComponent},
  {path: 'app-import-excel', component: ExcelImportComponent},
  {path: 'edit-user/:id', component: EditUserComponent},
  {path: 'main', component: MainComponent},


]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
