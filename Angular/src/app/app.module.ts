import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
// import { EducationService } from './cards/service/education.service';
import { HttpClientModule } from '@angular/common/http';
import { RoutingModule } from './routing/routing.module';
import { UserProfileModule } from './user-profile/user-profile.module';
import { LoginModule } from './login/login-module/login.module';
import { SignUpModule } from './register/sign-up-module/sign-up.module';
import { SearchModule } from './search/search-module/search.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RoutingModule,
    UserProfileModule,
    SearchModule,
    LoginModule,
    SignUpModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
