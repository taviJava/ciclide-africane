import {Component, OnInit} from '@angular/core';
import {HomePage} from '../../model/home-page';
import {ActivatedRoute, Router} from '@angular/router';
import {HomePageService} from '../../service/home-page.service';
import {HttpEventType, HttpResponse} from '@angular/common/http';


@Component({
  selector: 'app-add-home-page',
  templateUrl: './add-home-page.component.html',
  styleUrls: ['./add-home-page.component.css']
})
export class AddHomePageComponent implements OnInit {
  homepage: HomePage = new HomePage();
  selectedFiles: FileList;
  currentFile: File;
  progress = 0;
  message = '';
  constructor(private route: ActivatedRoute,
              private router: Router,
              private homePageService: HomePageService) {
  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    this.homePageService.save(this.homepage).subscribe(data => {
      this.upload();
      setTimeout(() =>
        {
          this.getHomePage();
        },
        5000);
    });
  }

  // tslint:disable-next-line:typedef
  getHomePage() {
    this.router.navigate(['']);
  }
  // tslint:disable-next-line:typedef
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  // tslint:disable-next-line:typedef
  onItemSelect(item: any) {
    console.log(item);
  }

  // tslint:disable-next-line:typedef
  onSelectAll(items: any) {
    console.log(items);
  }
  // tslint:disable-next-line:typedef
  upload() {
    this.progress = 0;
    this.currentFile = this.selectedFiles.item(0);
    this.homePageService.upload(this.currentFile).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.message = event.body.message;
          const a = event.body.id;
        }
      },
      err => {
        this.progress = 0;
        this.message = 'Could not upload the file!';
        this.currentFile = undefined;
      });
  }
}
