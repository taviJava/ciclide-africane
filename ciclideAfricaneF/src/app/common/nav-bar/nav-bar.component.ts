import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  keyword = '';
  isCollapsed = true;
  constructor(private router: Router) {
  }

  ngOnInit(): void {
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
  // tslint:disable-next-line:typedef
  goToLinks(){
    this.router.navigate(['link']);
  }
}
