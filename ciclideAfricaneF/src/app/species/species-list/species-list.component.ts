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
  speciesAll: Species[];
  p = 0;
  itemPerPage = 9;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private modalService: NgbModal,
              private speciesService: SpeciesService) { }

  ngOnInit(): void {
    this.species = [];
    this.speciesAll = [];
    this.getSpecies();
    this.getSpeciesAll();
  }
  // tslint:disable-next-line:typedef
  getSpecies(){
    this.speciesService.findAllPaginate(this.p).subscribe(result => {
      this.species = [];
      // JSON.parse(result) as Species[]
      this.species = JSON.parse(result) as Species[];
      for (const spec of this.species){
        spec.photos = this.speciesService.getSpeciesphotos(spec.id);
      }
    });
  }
  // tslint:disable-next-line:typedef
  getSpeciesAll(){
    this.speciesService.findAll().subscribe(result => {
      this.speciesAll = [];
      // JSON.parse(result) as Species[]
      this.speciesAll = JSON.parse(result) as Species[];
    });
  }
  // tslint:disable-next-line:typedef
  goToSpeciesDetails(id: number){
    this.router.navigate(['species/details/' + id]);
  }
  // tslint:disable-next-line:typedef
  next(){
    this.p = this.p + 1;
    this.ngOnInit();
  }
  // tslint:disable-next-line:typedef
  prev(){
    this.p = this.p - 1;
    this.ngOnInit();
  }
  hidePrev(): boolean{
    if (this.p === 0){
      return true;
    }
  }
  hideNext(): boolean{
    if (this.itemPerPage > this.species.length){
      return true;
    }
  }
}
