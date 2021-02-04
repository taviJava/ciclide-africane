import {Component, OnInit} from '@angular/core';
import {HomePage} from '../../model/home-page';
import {ActivatedRoute, Router} from '@angular/router';
import {HomePageService} from '../../service/home-page.service';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {AuthService} from '../../../users/service/auth.service';


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
  fileData: File = null;
  previewUrl: any = null;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private homePageService: HomePageService, private auth: AuthService) {
  }

  ngOnInit(): void {
  this.homepage = new HomePage();
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
    this.fileProgress(event);
  }
  // tslint:disable-next-line:typedef
  fileProgress(fileInput: any) {
    this.fileData = (fileInput.target.files[0] as File);
    this.preview();
  }

  // tslint:disable-next-line:typedef
  preview() {
    // Show preview
    const mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    // tslint:disable-next-line:variable-name
    reader.onload = (_event) => {
      this.previewUrl = reader.result;
    };
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
  ifHasLenght(): boolean{
    if (this.homepage.description.length > 68){
      return true;
    }else{
      return false;
    }
  }
}
