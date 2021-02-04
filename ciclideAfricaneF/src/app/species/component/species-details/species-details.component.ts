import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import {SpeciesService} from '../../service/species.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Species} from '../../model/species';
import {Observable} from 'rxjs';
import {Gallery, GalleryItem} from '@ngx-gallery/core';
import {Lightbox} from '@ngx-gallery/lightbox';
@Component({
  selector: 'app-species-details',
  templateUrl: './species-details.component.html',
  styleUrls: ['./species-details.component.css'],
  providers: [NgbCarouselConfig]
})
export class SpeciesDetailsComponent implements OnInit {
  images = [700, 800, 807].map((n) => `https://picsum.photos/id/${n}/900/500`);
  id: number;
  species: Species;
  photos: Observable<any>;
  items: GalleryItem[];
  constructor(config: NgbCarouselConfig,
              private speciesService: SpeciesService,
              private route: ActivatedRoute,
              public gallery: Gallery,
              public lightbox: Lightbox,
              private router: Router) {
    config.interval = 2000;
    config.keyboard = true;
    config.pauseOnHover = true;
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.species = new Species();
    this.getSpecies(this.id);
  }
// tslint:disable-next-line:typedef
getSpecies(id: number){
    this.speciesService.getById(id).subscribe(result => {
      this.species = new Species();
      this.species = JSON.parse(result) as Species;
      this.photos = this.speciesService.getSpeciesphotos(id);
});
}
// tslint:disable-next-line:typedef
goToSpecies(){
    this.router.navigate(['speciesList']);
}
}
