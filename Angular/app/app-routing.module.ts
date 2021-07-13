import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserPermissionGuard } from './guard/user-permission.guard';
import { LoginComponent } from './login/login.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {path: '', redirectTo:'/login', pathMatch:'full'},
  {path: 'login', component: LoginComponent},
  {path: 'users', component: UserComponent, canActivate: [UserPermissionGuard]},
  {path: 'users/detail', component: UserDetailComponent, canActivate: [UserPermissionGuard]},
  {path: 'users/detail/:id', component: UserDetailComponent, canActivate: [UserPermissionGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
