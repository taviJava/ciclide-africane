import { Component, OnInit } from '@angular/core';
import {Species} from '../model/species';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SpeciesService} from '../service/species.service';
import {AuthService} from "../../users/service/auth.service";

@Component({
  selector: 'app-search-species',
  templateUrl: './search-species.component.html',
  styleUrls: ['./search-species.component.css']
})
export class SearchSpeciesComponent implements OnInit {
  keyword1 = '';
  species: Species[];
  keyword: string;
  isCollapsed = true;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private modalService: NgbModal,
              private speciesService: SpeciesService,
              private auth: AuthService) { }

  ngOnInit(): void {
    this.keyword = this.route.snapshot.params.key;
    this.species = [];
    this.getSpecies(this.keyword);
  }
  // tslint:disable-next-line:typedef
  getSpecies(keyword: string){
    if (this.keyword1.length > 0){
      this.router.navigate(['search/' + this.keyword1]);
      keyword = this.keyword1;
    }
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
    this.ngOnInit();
  }
  // tslint:disable-next-line:typedef
  goToSpeciesDetails(id: number){
    this.router.navigate(['species/details/' + id]);
  }
  // tslint:disable-next-line:typedef
  goToLinks(){
    this.router.navigate(['link']);
  }
  // tslint:disable-next-line:typedef
  goToDistr(){
    this.router.navigate(['distributors']);
  }
  // tslint:disable-next-line:typedef
  goToHome(){
    this.router.navigate(['']);
  }
  // tslint:disable-next-line:typedef
  goToUsers(){
    this.router.navigate(['user']);
  }
  adm(): boolean {
    if (!this.auth.isUserLoggedIn()) {
      return false;
    }
    if (!this.auth.isUserAdm()){
      return false;
    }
    return true;
  }
  // tslint:disable-next-line:typedef
  logOut(){
    this.auth.logout();
    this.router.navigate(['user/login']);
  }

  // tslint:disable-next-line:typedef
  collapse(event) {
    if ( event.type === 'mouseover'){
      this.isCollapsed = false;
    }
    if (event.type === 'mouseout'){
      this.isCollapsed = false;
    }
  }
}
