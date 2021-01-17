import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../service/auth.service';
import {User} from '../../model/user';
import {UserService} from '../../service/user.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  username: string;
  password: string;
  errorMessage = 'Invalid Credentials';
  successMessage: string;
  invalidLogin = false;
  loginSuccess = false;
  user: User;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthService,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.user = new User();
  }

  // tslint:disable-next-line:typedef
  handleLogin() {
    console.log('test1');
    this.authenticationService.authentication(this.user).subscribe(result => {
      console.log('test2');
      this.authenticationService.TOKEN_SESSION_ATTRIBUTE_NAME = result.token;
      this.authenticationService.registerSuccessfulLogin(this.user.email);
      this.invalidLogin = false;
      this.loginSuccess = true;
      this.successMessage = 'Login Successful.';
      this.goToHomePage();
    }, () => {
      this.invalidLogin = true;
      this.loginSuccess = false;
    });
  }


  // tslint:disable-next-line:typedef
  goToRegister() {
    this.router.navigate(['register']);
  }

  // tslint:disable-next-line:typedef
  goToHomePage() {
    this.router.navigate(['']);
  }
}
