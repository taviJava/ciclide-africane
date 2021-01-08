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
import {FormsModule} from '@angular/forms';
import { AddSpeciesComponent } from './species/add-species/add-species.component';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NavBarComponent,
    SpeciesListComponent,
    GalleryListComponent,
    GalleryAddComponent,
    AddSpeciesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
