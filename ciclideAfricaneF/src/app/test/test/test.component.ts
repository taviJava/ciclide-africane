import {Component, OnInit} from '@angular/core';
import {ModalDismissReasons, NgbCarouselConfig, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Gallery, GalleryItem, ImageItem, ImageSize, ThumbnailsPosition} from '@ngx-gallery/core';
import {Lightbox} from '@ngx-gallery/lightbox';
import {Galery} from '../../gallery/model/galery';
import {GalleryService} from '../../gallery/service/gallery.service';
import {HomePage} from '../../home-page/model/home-page';
import {HomePageService} from '../../home-page/service/home-page.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Link} from '../../links/model/link';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
  providers: [NgbCarouselConfig]
})
export class TestComponent implements OnInit {
  homePage: HomePage[] = [];
  closeResult = '';
  p = 1;            // pt paginare si urmatoarea la fel
  numberOfItemsPerP = 10;
  constructor(private homepageService: HomePageService,
              private route: ActivatedRoute,
              private router: Router,
              private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.homePage = [];
    this.findAll();
  }


  // tslint:disable-next-line:typedef
  save() {
    this.router.navigate(['addhomepage']);
  }


  // tslint:disable-next-line:typedef
  findAll() {
    this.homepageService.findAll().subscribe(data => {
      this.homePage = [];
      this.homePage = JSON.parse(data) as HomePage[];
      for (const home of this.homePage) {
        console.log(home.id);
        home.photo = this.homepageService.getHomepagephotos(home.id);
      }
    } )
    ;
  }
  // tslint:disable-next-line:typedef
  delete(id: number) {
    this.homepageService.delete(id).subscribe(data => {
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

