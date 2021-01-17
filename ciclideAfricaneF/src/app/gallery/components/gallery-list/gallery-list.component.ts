import {Component, OnInit} from '@angular/core';
import {Galery} from '../../model/galery';
import {ActivatedRoute, Router} from '@angular/router';
import {GalleryService} from '../../service/gallery.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from '../../../users/service/auth.service';

@Component({
  selector: 'app-gallery-list',
  templateUrl: './gallery-list.component.html',
  styleUrls: ['./gallery-list.component.css']
})
export class GalleryListComponent implements OnInit {
  galleryList: Galery[];
  closeResult = '';
  searchValue = '';
  p = 1;            // pt paginare si urmatoarea la fel
  numberOfItemsPerP = 10;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private modalService: NgbModal,
              private galleryService: GalleryService, private authService: AuthService) {
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
    this.galleryService.findAll().subscribe(data =>
      this.galleryList = JSON.parse(data) as Galery[]);
  }

  // tslint:disable-next-line:typedef
  delete(id: number) {
    this.galleryService.delete(id ).subscribe(data => {
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
