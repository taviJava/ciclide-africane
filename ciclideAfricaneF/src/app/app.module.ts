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
import {HttpInterceptorService} from './users/service/http-interceptor.service';
import { AboutusComponent } from './aboutus/aboutus/aboutus.component';
import { TestComponent } from './test/test/test.component';
import { Test2Component } from './test/test2/test2.component';
import { Test3Component } from './test/test3/test3.component';
import { SearchSpeciesComponent } from './species/search-species/search-species.component';
import {ContactComponent} from './contact/component/contact/contact.component';
import {GalleryModule} from '@ngx-gallery/core';
import {LightboxModule} from '@ngx-gallery/lightbox';
import {GallerizeModule} from '@ngx-gallery/gallerize';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {LinksComponent} from './links/component/links/links.component';
import { SpeciesDetailsComponent } from './species/component/species-details/species-details.component';
import {AddContactComponent} from './contact/component/add-contact/add-contact.component';
import { AddLinkComponent } from './links/component/add-link/add-link.component';
import {AddHomePageComponent} from './home-page/component/add-homepage/add-home-page.component';
import { AdmSpeciesListComponent } from './species/component/adm-species-list/adm-species-list.component';
import { AdmGalleryComponent } from './gallery/components/adm-gallery/adm-gallery.component';
import { AdmLinksComponent } from './links/component/adm-links/adm-links.component';
import { DistributorsListComponent } from './distributors/component/distributors-list/distributors-list.component';
import { DistributorsAdmListComponent } from './distributors/component/distributors-adm-list/distributors-adm-list.component';
import { DistributorsAdmAddComponent } from './distributors/component/distributors-adm-add/distributors-adm-add.component';
import {UserComponent} from './users/components/user/user.component';
import { UserEditComponent } from './users/components/user-edit/user-edit.component';


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
    Test3Component,
    SearchSpeciesComponent,
    ContactComponent,
    LinksComponent,
    SpeciesDetailsComponent,
    AddContactComponent,
    AddLinkComponent,
    AddHomePageComponent,
    AdmSpeciesListComponent,
    AdmGalleryComponent,
    AdmLinksComponent,
    DistributorsListComponent,
    DistributorsAdmListComponent,
    DistributorsAdmAddComponent,
    UserComponent,
    UserEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    GalleryModule,
    LightboxModule,
    GallerizeModule,
    MatButtonModule,
    MatToolbarModule,
    BrowserAnimationsModule,
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
