import { Component, OnInit } from '@angular/core';
import {Link} from '../../model/link';
import {LinkService} from '../../service/link.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from '../../../users/service/auth.service';

@Component({
  selector: 'app-adm-links',
  templateUrl: './adm-links.component.html',
  styleUrls: ['./adm-links.component.css']
})
export class AdmLinksComponent implements OnInit {
  links: Link[] = [];
  closeResult = '';
  p = 1;            // pt paginare si urmatoarea la fel
  numberOfItemsPerP = 10;
  constructor(private linkService: LinkService,
              private route: ActivatedRoute,
              private router: Router,
              private modalService: NgbModal,
              private auth: AuthService) { }

  ngOnInit(): void {
    this.links = [];
    this.findAll();
  }

  // tslint:disable-next-line:typedef
  save() {
    this.router.navigate(['addlink']);
  }

  // tslint:disable-next-line:typedef
  findAll() {
    this.linkService.findAll().subscribe(data => {
      this.links = [];
      this.links = JSON.parse(data) as Link[];
      for (const link of this.links) {
        console.log(link.id);
        link.photos = this.linkService.getLinkphotos(link.id);
      }
    } )
    ;
  }

  // tslint:disable-next-line:typedef
  delete(id: number) {
    this.linkService.delete(id, this.auth.getToken()).subscribe(data => {
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
