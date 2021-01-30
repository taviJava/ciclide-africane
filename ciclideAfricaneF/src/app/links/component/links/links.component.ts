import { Component, OnInit } from '@angular/core';
import {Link} from '../../model/link';
import {LinkService} from '../../service/link.service';


@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.css']
})
export class LinksComponent implements OnInit {
  links: Link[] = [];
  constructor(private linkService: LinkService) { }

  ngOnInit(): void {
    this.links = [];
    this.getAll();
  }
  // tslint:disable-next-line:typedef
  getAll(){
    this.linkService.findAll().subscribe(data => {
      this.links = [];
      this.links = JSON.parse(data) as Link[];
      for (const lnk of this.links){
        lnk.photos = this.linkService.getLinkphotos(lnk.id);
      }
    });
  }
}
