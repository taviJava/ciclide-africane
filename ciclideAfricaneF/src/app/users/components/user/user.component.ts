import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../service/user.service';
import {Contact} from '../../../contact/model/contact';
import {User} from '../../model/user';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: User[] = [];
  closeResult = '';

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private modalService: NgbModal,
              private auth: AuthService) {
  }

  ngOnInit(): void {
    this.user = [];
    this.getUsers();
  }

  // tslint:disable-next-line:typedef
  add() {
    this.router.navigate(['user/register']);
  }

  // tslint:disable-next-line:typedef
  getUsers() {
    this.userService.findAll(this.auth.getToken()).subscribe(data => {
      this.user = [];
      this.user = JSON.parse(data) as User[];
    });
  }

  // tslint:disable-next-line:typedef
  editUsers(id: number) {
    this.router.navigate(['edituser/' + id]);
  }

  // tslint:disable-next-line:typedef
  delete(id: number) {
    this.userService.delete(id , this.auth.getToken()).subscribe(data => {
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
