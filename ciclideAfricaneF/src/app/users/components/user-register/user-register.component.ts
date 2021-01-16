import { Component, OnInit } from '@angular/core';
import {User} from '../../model/user';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../service/user.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from '../../service/auth.service';

class AuthenticationService {
}

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  user: User = new User();
  myGroup: FormGroup;
  confirmPassword = '';
  password = '';
  isLoggedIn = false;
  currentUser: User;
  // boolean disabled button
  email = '';
  users: User[] = [];

  closeResult = '';

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private authService: AuthService,
              private modalService: NgbModal) {
    this.currentUser = new User();
    this.currentUser.email = 'Please Log-in';
  }

  ngOnInit(): void {
    this.users = [];
    this.userService.findAll().subscribe( data => {
      this.users = [];
      this.users = data;
    });
    this.user = new User();
    this.myGroup = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
      confirmPassword: new FormControl()
    });
    this.authService.isLoggedIn.subscribe(data => {
      this.isLoggedIn = data;
      this.currentUser = new User();
      if (this.isLoggedIn) {
        this.currentUser = JSON.parse(sessionStorage.getItem(this.authService.USER_DATA_SESSION_ATTRIBUTE_NAME));
        if (this.currentUser === null) {
          this.currentUser = new User();
        }
      }
    });
  }
  matchPassword(): boolean{
    this.password = this.myGroup.get('password').value;
    this.confirmPassword = this.myGroup.get('confirmPassword').value;
    if (this.password === this.confirmPassword){
      return true;
    }
    return false;
  }
  // tslint:disable-next-line:typedef
  getAll() {
    this.router.navigate(['users']);
  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    this.user.email = this.myGroup.get('email').value;
    this.user.password = this.myGroup.get('password').value;
    this.userService.save(this.user).subscribe(result => {
        this.getAll();
    });
  }
  login(): boolean{
    return this.authService.isLoggedIn.getValue();
  }
  formCompleted(): boolean{
    this.form();
    // tslint:disable-next-line:max-line-length
    if (this.password && this.matchPassword()){
      return true;
    }
    return false;
  }
  // tslint:disable-next-line:typedef
  form(){
    if (this.myGroup.get('password').value !== null){
      this.password = this.myGroup.get('password').value;
    }
  }
  ifEmailExist(): boolean{
    const name: string = this.myGroup.get('email').value;
    for (const user of this.users){
      if (name === user.email){
        return true;
      }
    }
  }
  // modal
  // tslint:disable-next-line:typedef
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
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
