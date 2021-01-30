import { Component, OnInit } from '@angular/core';
import {Distributor} from '../../model/distributor';
import {DistributorsService} from '../../service/distributors.service';
import {Router} from '@angular/router';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-distributors-adm-list',
  templateUrl: './distributors-adm-list.component.html',
  styleUrls: ['./distributors-adm-list.component.css']
})
export class DistributorsAdmListComponent implements OnInit {

  distributors: Distributor[] = [];
  closeResult = '';
  constructor(private distributorService: DistributorsService,
              private router: Router,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.distributors = [];
    this.getAll();
  }
  // tslint:disable-next-line:typedef
  getAll(){
    this.distributorService.findAll().subscribe(result => {
      this.distributors = [];
      this.distributors = JSON.parse(result) as Distributor[];
    });
  }
  // tslint:disable-next-line:typedef
  delete(id: number){
    this.distributorService.delete(id).subscribe(result => {
      this.ngOnInit();
    });
  }
  // tslint:disable-next-line:typedef
  goToAdd(){
    this.router.navigate(['distributorsAdmAdd']);
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

  // tslint:disable-next-line:typedef
  open(content, id) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.delete(id);
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
}
