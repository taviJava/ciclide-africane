import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

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
}
