import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import { EmployeeDashboardDummyComponent } from '../user-profile/employee-dashboard-smart/employee-dashboard-dummy/employee-dashboard-dummy.component';
import { LoginComponent } from '../login/login-module/login/login.component';
import { SignUpComponent } from '../register/sign-up-module/sign-up/sign-up.component';
import { SearchComponent } from '../search/search-module/search/search.component';


export const appRoutes: Routes = [
  {
    path: 'home/:id',
    component: EmployeeDashboardDummyComponent
  }, {
    path: '',
    component: LoginComponent
  }, {
    path: 'search',
    component: SearchComponent
  }, {
    path: 'register',
    component: SignUpComponent
  }
];


@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
    CommonModule
  ],
  declarations: [],
  exports: [RouterModule]
})
export class RoutingModule { }
