import { Component, OnInit } from '@angular/core';
import {Distributor} from '../../model/distributor';
import {DistributorsService} from '../../service/distributors.service';

@Component({
  selector: 'app-distributors-list',
  templateUrl: './distributors-list.component.html',
  styleUrls: ['./distributors-list.component.css']
})
export class DistributorsListComponent implements OnInit {
  distributors: Distributor[] = [];
  constructor(private distributorService: DistributorsService) { }

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

}
