import { Component, OnInit } from '@angular/core';
import {Species} from '../model/species';
import {ActivatedRoute, Router} from '@angular/router';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SpeciesService} from '../service/species.service';
import {Observable} from "rxjs";
import {AuthService} from "../../users/service/auth.service";

@Component({
  selector: 'app-species-list',
  templateUrl: './species-list.component.html',
  styleUrls: ['./species-list.component.css']
})
export class SpeciesListComponent implements OnInit {
  species: Species[];
  closeResult = '';
  searchValue = '';
  p = 1;            // pt paginare si urmatoarea la fel
  numberOfItemsPerP = 10;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private modalService: NgbModal,
              private speciesService: SpeciesService,
              private authService: AuthService) { }

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
  add(){
    this.router.navigate(['addSpecies']);
  }
  // tslint:disable-next-line:typedef
  delete(id: number) {
    this.speciesService.delete(id ).subscribe(data => {
      this.ngOnInit();
    });
  }
  // tslint:disable-next-line:typedef
  open(content, id) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.delete(id);
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
