import { Routes } from '@angular/router';
import { DatatableComponent } from '../components/datatable/datatable.component';
import { LoginComponent } from '../auth/login/login.component';
import { RegisterComponent } from '../auth/register/register.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import {AddComponent} from "../components/add/add.component";
import { ExportComponent } from '../components/export/export.component';

export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full' },
  {path: 'data-table',component:DatatableComponent},
  {path: 'login',component:LoginComponent},
  {path: 'register',component:RegisterComponent},
  {path: 'add-data',component:AddComponent},
  {path: 'exportE',component:ExportComponent},


];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
