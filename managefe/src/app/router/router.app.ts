import { Routes , RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from '../components/page/login/login.component';

import { MainComponent } from '../components/page/main/main.component';
import { DatatableComponent } from '../components/page/datatable/datatable.component';
import { UserDetailComponent } from '../components/page/user-detail/user-detail.component';
import { AddComponent } from '../components/page/add/add.component';
import { EditUserComponent } from '../components/page/edit-user/edit-user.component';
import { LayoutComponent } from '../components/page/layout/layout.component';
import { ExcelImportComponent } from '../components/page/import-excel/import-excel.component';
import { ExcelImportComponent2 } from '../components/page/import-excel2/import-excel2.component';
import { DoanvaoComponent } from '../components/page/doanvao/doanvao.component';
import { RegisterComponent } from '../components/page/register/register.component';
import { UserDetail2Component } from '../components/page/user-detail2/user-detail2.component';



export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  {
    path: '',
    component: LayoutComponent,
    children: [
      {path: 'main', component: MainComponent},
      {path: 'data-table', component: DatatableComponent},
      {path: 'user-detail/:id', component: UserDetailComponent},
      {path: 'user-detail2/:id', component: UserDetail2Component},
      {path: 'add-data', component: AddComponent},
      {path: 'edit-user/:id', component: EditUserComponent},
      {path: 'app-import-excel', component: ExcelImportComponent},
      {path: 'app-import-excel2', component: ExcelImportComponent2},
      {path: 'doanvao', component: DoanvaoComponent},
    ],
  },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
