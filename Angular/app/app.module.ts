import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserEditChildComponent } from './child-component/userEditChild/userEditChild.component';
import { userViewChildComponent } from './child-component/userViewChild/userViewChild.Component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    UserDetailComponent,
    UserEditChildComponent,
    userViewChildComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
