import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from '../components/page/login/login.component';

import { MainComponent } from '../components/page/main/main.component';
import { DatatableComponent } from '../components/page/datatable/datatable.component';
import { UserDetailComponent } from '../components/page/user-detail/user-detail.component';
import { AddComponent } from '../components/page/add/add.component';
import { EditUserComponent } from '../components/page/edit-user/edit-user.component';
import { LayoutComponent } from '../components/page/layout/layout.component';
import { ExcelImportComponent } from '../components/page/import-excel/import-excel.component';


export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

  {
    path: '',
    component: LayoutComponent,
    children: [
      {path: 'main', component: MainComponent},
      {path: 'data-table', component: DatatableComponent},
      {path: 'user-detail/:id', component: UserDetailComponent},
      {path: 'add-data', component: AddComponent},
      {path: 'edit-user/:id', component: EditUserComponent},
      {path: 'app-import-excel', component: ExcelImportComponent},
    ],
  },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
