import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserEditChildComponent } from './child-component/userEditChild/userEditChild.component';
import { userViewChildComponent } from './child-component/userViewChild/userViewChild.Component';
import { MessageComponent } from './messages/message.component';
import { LoginComponent} from './login/login.component'
import { FormsModule } from '@angular/forms';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    UserDetailComponent,
    UserEditChildComponent,
    userViewChildComponent,
    MessageComponent,
    LoginComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
