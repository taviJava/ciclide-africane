import {Component, OnInit} from '@angular/core';
import {Galery} from '../../model/galery';
import {ActivatedRoute, Router} from '@angular/router';
import {GalleryService} from '../../service/gallery.service';

@Component({
  selector: 'app-gallery-list',
  templateUrl: './gallery-list.component.html',
  styleUrls: ['./gallery-list.component.css']
})
export class GalleryListComponent implements OnInit {
  galleryList: Galery[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private galleryService: GalleryService) {
  }

  ngOnInit(): void {
    this.galleryList = [];
    this.findAll();
  }

  // tslint:disable-next-line:typedef
  save() {
    this.router.navigate(['addGallery']);
  }

  // tslint:disable-next-line:typedef
  findAll() {
    this.galleryService.findAll().subscribe(data => {
      this.galleryList = [];
      this.galleryList = data;
    });
  }
}
