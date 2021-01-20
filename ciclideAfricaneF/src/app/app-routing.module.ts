import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomePageComponent} from './home-page/home-page.component';
import {GalleryAddComponent} from './gallery/components/gallery-add/gallery-add.component';
import {SpeciesListComponent} from './species/species-list/species-list.component';
import {AddSpeciesComponent} from './species/add-species/add-species.component';
import {GalleryListComponent} from './gallery/components/gallery-list/gallery-list.component';
import {UserRegisterComponent} from './users/components/user-register/user-register.component';
import {UserLoginComponent} from './users/components/user-login/user-login.component';
import {ContactComponent} from './contact/component/contact/contact.component';
import {AboutusComponent} from "./aboutus/aboutus/aboutus.component";
import {TestComponent} from "./test/test/test.component";
import {Test3Component} from "./test/test3/test3.component";
import {Test2Component} from "./test/test2/test2.component";

const routes: Routes = [{path: '', component: HomePageComponent},
  {path: 'addGallery', component: GalleryAddComponent},
  {path: 'speciesList', component: SpeciesListComponent},
  {path: 'addSpecies', component: AddSpeciesComponent},
  {path: 'galleryList', component: GalleryListComponent},
  {path: 'user/register', component: UserRegisterComponent},
  {path: 'user/login', component: UserLoginComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'aboutus', component: AboutusComponent},
  {path: 'test', component: TestComponent},
  {path: 'test2', component: Test2Component},
  {path: 'test3', component: Test3Component},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
