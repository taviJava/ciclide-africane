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
import {AboutusComponent} from './aboutus/aboutus/aboutus.component';
import {TestComponent} from './test/test/test.component';
import {Test3Component} from './test/test3/test3.component';
import {Test2Component} from './test/test2/test2.component';
import {SearchSpeciesComponent} from './species/search-species/search-species.component';
import {LinksComponent} from './links/component/links/links.component';
import {SpeciesDetailsComponent} from './species/component/species-details/species-details.component';
import {AddContactComponent} from './contact/component/add-contact/add-contact.component';
import {AddLinkComponent} from './links/component/add-link/add-link.component';
import {AddHomePageComponent} from './home-page/component/add-homepage/add-home-page.component';
import {AdmSpeciesListComponent} from './species/component/adm-species-list/adm-species-list.component';
import {AdmGalleryComponent} from './gallery/components/adm-gallery/adm-gallery.component';
import {AdmLinksComponent} from './links/component/adm-links/adm-links.component';

const routes: Routes = [{path: '', component: HomePageComponent},
  {path: 'addGallery', component: GalleryAddComponent},
  {path: 'speciesList', component: SpeciesListComponent},
  {path: 'addSpecies', component: AddSpeciesComponent},
  {path: 'galleryList', component: GalleryListComponent},
  {path: 'user/register', component: UserRegisterComponent},
  {path: 'user/login', component: UserLoginComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'addContact', component: AddContactComponent},
  {path: 'aboutus', component: AboutusComponent},
  {path: 'test', component: TestComponent},
  {path: 'test2', component: Test2Component},
  {path: 'test3', component: Test3Component},
  {path: 'search/:key', component: SearchSpeciesComponent},
  {path: 'link', component: LinksComponent},
  {path: 'species/details/:id', component: SpeciesDetailsComponent},
  {path: 'addlink', component: AddLinkComponent},
  {path: 'addhomepage', component: AddHomePageComponent},
  {path: 'speciesAdm', component: AdmSpeciesListComponent},
  {path: 'galleryAdm', component: AdmGalleryComponent},
  {path: 'linksAdm', component: AdmLinksComponent},
  {path: 'homepage', component: HomePageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
