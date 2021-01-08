import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomePageComponent} from './home-page/home-page.component';
import {GalleryAddComponent} from './gallery/components/gallery-add/gallery-add.component';
import {SpeciesListComponent} from "./species/species-list/species-list.component";
import {AddSpeciesComponent} from "./species/add-species/add-species.component";

const routes: Routes = [{path: '', component: HomePageComponent},
  {path: 'addGallery', component: GalleryAddComponent},
  {path: 'speciesList', component: SpeciesListComponent},
  {path: 'addSpecies', component: AddSpeciesComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
