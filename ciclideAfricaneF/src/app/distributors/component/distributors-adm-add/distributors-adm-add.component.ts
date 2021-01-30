import { Component, OnInit } from '@angular/core';
import {Distributor} from '../../model/distributor';
import {DistributorsService} from '../../service/distributors.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-distributors-adm-add',
  templateUrl: './distributors-adm-add.component.html',
  styleUrls: ['./distributors-adm-add.component.css']
})
export class DistributorsAdmAddComponent implements OnInit {
  distributor: Distributor = new Distributor();
  constructor(private distrService: DistributorsService,
              private router: Router) { }

  ngOnInit(): void {
    this.distributor = new Distributor();
  }
// tslint:disable-next-line:typedef
onSubmit(){
    this.distrService.save(this.distributor).subscribe(result => {
      this.router.navigate(['distributorsAdm']);
    });
}

// tslint:disable-next-line:typedef
goToDistrList(){
  this.router.navigate(['distributorsAdm']);
}
}
