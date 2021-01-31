import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../service/user.service';
import {Contact} from '../../../contact/model/contact';
import {User} from '../../model/user';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: User = new User();
  closeResult = '';

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.user = new User();
    this.getUsers();
  }

  // tslint:disable-next-line:typedef
  add() {
    this.router.navigate(['user/register']);
  }

  // tslint:disable-next-line:typedef
  getUsers() {
    this.userService.findAll().subscribe(data => {
      this.user = new User();
      this.user = data;
    });
  }

  // tslint:disable-next-line:typedef
  editUsers(id: number) {
    this.router.navigate(['edituser/' + id]);
  }

  // tslint:disable-next-line:typedef
  delete(id: number) {
    this.userService.delete(id).subscribe(data => {
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
