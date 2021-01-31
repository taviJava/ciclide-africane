import {Component, OnInit} from '@angular/core';
import {UserService} from '../../service/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../model/user';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  user: User = new User();
  id: number;
  roles: string[] = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.roles.push('Administrator');
    this.roles.push('Standard');
    this.user = new User();
    this.id = this.route.snapshot.params.id;
    this.userService.getById(this.id).subscribe(data =>
    {
      this.user = new User();
      this.user = JSON.parse(data) as User;
      console.log(this.user);
    });
  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    this.userService.update(this.user).subscribe(data => {
      this.getUser();
    });
  }

  // tslint:disable-next-line:typedef
  getUser() {
    this.router.navigate(['user']);
  }
}
