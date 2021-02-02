import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../users/service/auth.service';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  keyword = '';
  isCollapsed = true;
  constructor(private router: Router, public auth: AuthService) {
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
      if (!this.auth.isUserAdm()){
        return false;
      }
    }
    return true;
  }
  // tslint:disable-next-line:typedef
  logOut(){
    this.auth.logout();
    this.router.navigate(['user/login']);
  }
}
