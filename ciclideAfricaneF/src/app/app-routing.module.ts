import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomePageComponent} from './home-page/home-page.component';
import {GalleryAddComponent} from './gallery/components/gallery-add/gallery-add.component';

const routes: Routes = [{path: '', component: HomePageComponent},
  {path: 'addGallery', component: GalleryAddComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
