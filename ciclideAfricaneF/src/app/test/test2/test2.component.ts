import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Species} from '../../species/model/species';
import {ActivatedRoute, Router} from '@angular/router';
import {SpeciesService} from '../../species/service/species.service';

@Component({
  selector: 'app-test2',
  templateUrl: './test2.component.html',
  styleUrls: ['./test2.component.css'],
  providers: [NgbCarouselConfig]
})
export class Test2Component implements OnInit {
  species: Species[];
  constructor(private route: ActivatedRoute,
              private router: Router,
              private modalService: NgbModal,
              private speciesService: SpeciesService) { }

  ngOnInit(): void {
    this.species = [];
    this.getSpecies();
  }
  // tslint:disable-next-line:typedef
  getSpecies(){
    this.speciesService.findAll().subscribe(result => {
      this.species = [];
      // JSON.parse(result) as Species[]
      this.species = JSON.parse(result) as Species[];
      for (const spec of this.species){
        spec.photos = this.speciesService.getSpeciesphotos(spec.id);
      }
    });
  }
  // tslint:disable-next-line:typedef
  goToSpeciesDetails(id: number){
    this.router.navigate(['species/details/' + id]);
  }

}



