import { Component, OnInit } from '@angular/core';
import {Species} from '../model/species';
import {ActivatedRoute, Router} from '@angular/router';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SpeciesService} from '../service/species.service';


@Component({
  selector: 'app-species-list',
  templateUrl: './species-list.component.html',
  styleUrls: ['./species-list.component.css']
})
export class SpeciesListComponent implements OnInit {
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
