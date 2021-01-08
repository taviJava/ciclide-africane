import {Component, OnInit} from '@angular/core';
import {Galery} from '../../model/galery';
import {GalleryService} from '../../service/gallery.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-gallery-add',
  templateUrl: './gallery-add.component.html',
  styleUrls: ['./gallery-add.component.css']
})
export class GalleryAddComponent implements OnInit {
  galery: Galery = new Galery();

  constructor(private route: ActivatedRoute,
              private router: Router,
              private galleryService: GalleryService) {
  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  getGallery() {
    this.router.navigate(['gallery']);
  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    this.galleryService.save(this.galery).subscribe(data => {
      this.getGallery();
    });
  }
}
