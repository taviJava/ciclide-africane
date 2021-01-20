import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomePageComponent } from './home-page/home-page.component';
import { NavBarComponent } from './common/nav-bar/nav-bar.component';
import { SpeciesListComponent } from './species/species-list/species-list.component';
import { GalleryListComponent } from './gallery/components/gallery-list/gallery-list.component';
import { GalleryAddComponent } from './gallery/components/gallery-add/gallery-add.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AddSpeciesComponent } from './species/add-species/add-species.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {NgxPaginationModule} from 'ngx-pagination';
import { UserLoginComponent } from './users/components/user-login/user-login.component';
import { UserRegisterComponent } from './users/components/user-register/user-register.component';
import {HttpInterceptorService} from "./users/service/http-interceptor.service";
import {UserService} from "./users/service/user.service";
import { AboutusComponent } from './aboutus/aboutus/aboutus.component';
import { TestComponent } from './test/test/test.component';
import { Test2Component } from './test/test2/test2.component';
import { Test3Component } from './test/test3/test3.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NavBarComponent,
    SpeciesListComponent,
    GalleryListComponent,
    GalleryAddComponent,
    AddSpeciesComponent,
    UserLoginComponent,
    UserRegisterComponent,
    AboutusComponent,
    TestComponent,
    Test2Component,
    Test3Component
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgbModule,
        FormsModule,
        HttpClientModule,
        Ng2SearchPipeModule,
        NgxPaginationModule,
        ReactiveFormsModule
    ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
