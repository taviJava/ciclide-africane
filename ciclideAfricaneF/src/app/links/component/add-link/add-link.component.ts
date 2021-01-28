import {Component, OnInit} from '@angular/core';
import {Link} from '../../model/link';
import {ActivatedRoute, Router} from '@angular/router';
import {LinkService} from '../../service/link.service';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-add-link',
  templateUrl: './add-link.component.html',
  styleUrls: ['./add-link.component.css']
})
export class AddLinkComponent implements OnInit {
  link: Link = new Link();
  selectedPhotos: FileList;
  pozeLista: File[] = [];
  currentPhoto: File;
  progress = 0;
  message = '';
  photos: Observable<any>;
  selectedFiles: FileList;
  currentFile: File;
  // preview photo
  fileData: File = null;
  previewUrl: any = null;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private linkService: LinkService) {
  }

  ngOnInit(): void {
  }
// tslint:disable-next-line:typedef
  onSubmit() {
    this.linkService.save(this.link).subscribe(data => {
      this.upload();
      setTimeout(() =>
        {
          this.getLink();
        },
        5000);
    });
  }

  // tslint:disable-next-line:typedef
  getLink() {
    this.router.navigate(['link']);
  }
  // tavi

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
    this.linkService.upload(this.currentFile).subscribe(
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
