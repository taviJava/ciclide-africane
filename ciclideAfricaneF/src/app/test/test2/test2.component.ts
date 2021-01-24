import { Component, OnInit } from '@angular/core';
import {ModalDismissReasons, NgbCarouselConfig, NgbModal} from '@ng-bootstrap/ng-bootstrap';
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
  closeResult = '';
  searchValue = '';
  p = 1;            // pt paginare si urmatoarea la fel
  numberOfItemsPerP = 10;
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



