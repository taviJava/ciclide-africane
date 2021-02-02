import {Component, OnInit} from '@angular/core';
import {Galery} from '../../model/galery';
import {GalleryService} from '../../service/gallery.service';
import {Gallery, GalleryItem, ImageSize, ThumbnailsPosition} from '@ngx-gallery/core';
import {Lightbox} from '@ngx-gallery/lightbox';

@Component({
  selector: 'app-gallery-list',
  templateUrl: './gallery-list.component.html',
  styleUrls: ['./gallery-list.component.css']
})
export class GalleryListComponent implements OnInit {
  items: GalleryItem[];
  galleryList: Galery[];
  constructor(public gallery: Gallery,
              public lightbox: Lightbox,
              private galleryService: GalleryService) {
  }

  ngOnInit(): void {
    // Get a lightbox gallery ref
    const lightboxRef = this.gallery.ref('lightbox');

    // Add custom gallery config to the lightbox (optional)
    lightboxRef.setConfig({
      imageSize: ImageSize.Cover,
      thumbPosition: ThumbnailsPosition.Top
    });
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
