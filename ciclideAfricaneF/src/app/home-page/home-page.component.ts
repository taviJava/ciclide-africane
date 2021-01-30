import { Component, OnInit } from '@angular/core';
import {HomePage} from './model/home-page';
import {HomePageService} from './service/home-page.service';
import {Observable} from "rxjs";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  homepages: HomePage[] = [];
  photo: Observable<any>;
  description = '';
  constructor(private homePageService: HomePageService) { }

  ngOnInit(): void {
    this.homepages = [];
    this.getList();
  }
// tslint:disable-next-line:typedef
getList(){
    this.homePageService.findAll().subscribe(result => {
      this.homepages = [];
      this.homepages = JSON.parse(result) as HomePage[];
      console.log(this.homepages);
      for (const homeP of this.homepages){
        this.photo = this.homePageService.getHomepagephotos(homeP.id);
        this.description = homeP.description;
      }
    });
}
}
