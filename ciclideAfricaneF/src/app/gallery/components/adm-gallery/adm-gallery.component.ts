import { Component, OnInit } from '@angular/core';
import {Galery} from '../../model/galery';
import {ActivatedRoute, Router} from '@angular/router';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {GalleryService} from '../../service/gallery.service';
import {AuthService} from '../../../users/service/auth.service';

@Component({
  selector: 'app-adm-gallery',
  templateUrl: './adm-gallery.component.html',
  styleUrls: ['./adm-gallery.component.css']
})
export class AdmGalleryComponent implements OnInit {
  galleryList: Galery[];
  closeResult = '';
  searchValue = '';
  p = 1;            // pt paginare si urmatoarea la fel
  numberOfItemsPerP = 10;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private modalService: NgbModal,
              private galleryService: GalleryService,
              private auth: AuthService) {
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
      this.galleryList = JSON.parse(data) as Galery[];
      for (const gal of this.galleryList) {
        console.log(gal.id);
        gal.photos = this.galleryService.getGalleryphotos(gal.id);
      }
    } )
    ;
  }

  // tslint:disable-next-line:typedef
  delete(id: number) {
    this.galleryService.delete(id, this.auth.getToken()).subscribe(data => {
      this.ngOnInit();
    });
  }

  // tslint:disable-next-line:typedef
  open(content, id) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.delete(id);
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
