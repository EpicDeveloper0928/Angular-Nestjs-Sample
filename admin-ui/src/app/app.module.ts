import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { FormComponent } from "./components/form/form.component";
import { AdsComponent } from "./components/ads/ads.component";
import { AdsService } from "./services/ads.service";
import { LoginComponent } from "./components/login/login.component";
import { HeaderComponent } from "./components/header/header.component";
import { AdminComponent } from "./containers/admin/admin.component";
import { AppRoutingModule } from "./routing/routing.module";
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    AdsComponent,
    LoginComponent,
    HeaderComponent,
    AdminComponent,
    NotFoundComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [AdsService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
