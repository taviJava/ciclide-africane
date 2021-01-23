import { Component, OnInit } from '@angular/core';
import {Species} from '../model/species';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SpeciesService} from '../service/species.service';

@Component({
  selector: 'app-search-species',
  templateUrl: './search-species.component.html',
  styleUrls: ['./search-species.component.css']
})
export class SearchSpeciesComponent implements OnInit {
  keyword1 = '';
  species: Species[];
  keyword: string;
  closeResult = '';
  searchValue = '';
  p = 1;            // pt paginare si urmatoarea la fel
  numberOfItemsPerP = 10;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private speciesService: SpeciesService) { }

  ngOnInit(): void {
    this.keyword = this.route.snapshot.params.key;
    this.species = [];
    this.getSpecies(this.keyword);
  }
  // tslint:disable-next-line:typedef
  getSpecies(keyword: string){
    this.speciesService.search(keyword).subscribe(result => {
      this.species = [];
      // JSON.parse(result) as Species[]
      this.species = JSON.parse(result) as Species[];
      for (const spec of this.species){
        spec.photos = this.speciesService.getSpeciesphotos(spec.id);
      }
    });
  }
  // tslint:disable-next-line:typedef
  goToGalery() {
    this.router.navigate(['galleryList']);
  }

// tslint:disable-next-line:typedef
  goToSpecies() {
    this.router.navigate(['speciesList']);
  }

  // tslint:disable-next-line:typedef
  goToContact() {
    this.router.navigate(['contact']);
  }
  // tslint:disable-next-line:typedef
  goToAboutUs(){
    this.router.navigate(['aboutus']);
  }
  // tslint:disable-next-line:typedef
  goToSearch(){
    this.router.navigate(['search/' + this.keyword]);
  }
}
