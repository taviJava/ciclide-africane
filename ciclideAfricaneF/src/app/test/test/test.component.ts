import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import {Gallery, GalleryItem, ImageItem, ImageSize, ThumbnailsPosition} from '@ngx-gallery/core';
import {Lightbox} from '@ngx-gallery/lightbox';
import {Galery} from '../../gallery/model/galery';
import {GalleryService} from '../../gallery/service/gallery.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
  providers: [NgbCarouselConfig]
})
export class TestComponent implements OnInit {
  items: GalleryItem[];
  galleryList: Galery[];
  constructor(public gallery: Gallery,
              public lightbox: Lightbox,
              private galleryService: GalleryService) {
  }

  ngOnInit(): void {
    this.galleryList = [];
    this.findAll();
  }
  // tslint:disable-next-line:typedef
  findAll() {
    this.galleryService.findAll().subscribe(data => {
      this.galleryList = [];
      this.galleryList = JSON.parse(data) as Galery[];
      for (const gal of this.galleryList) {
        gal.photos = this.galleryService.getGalleryphotos(gal.id);
      }
    } );
  }
}

