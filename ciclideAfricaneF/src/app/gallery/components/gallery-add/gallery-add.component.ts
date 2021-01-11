import {Component, OnInit} from '@angular/core';
import {Galery} from '../../model/galery';
import {GalleryService} from '../../service/gallery.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {HttpEventType, HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-gallery-add',
  templateUrl: './gallery-add.component.html',
  styleUrls: ['./gallery-add.component.css']
})
export class GalleryAddComponent implements OnInit {
  galery: Galery = new Galery();
  // mai multe foto
  selectedPhotos: FileList;
  pozeLista: File[] = [];
  progressInfos = [];
  currentPhoto: File;
  progress = 0;
  message = '';
  photos: Observable<any>;
  // o foto
  selectedFiles: FileList;
  currentFile: File;
  // preview photo
  fileData: File = null;
  previewUrl: any = null;
  previewsUrl: any[] = [];
  uploadedFilePath: string = null;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private galleryService: GalleryService) {
  }

  ngOnInit(): void {
    this.galery = new Galery();
  }

  // tslint:disable-next-line:typedef
  getGallery() {
    this.router.navigate(['galleryList']);
  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    this.galleryService.save(this.galery).subscribe(data => {
      this.uploadPhotos();
      setTimeout(() => {
          this.getGallery();
        },
        5000);
    });
  }

  // tslint:disable-next-line:typedef
  selectFile(event) {
    this.selectedFiles = event.target.files;
    this.fileProgress(event);
  }

  // tslint:disable-next-line:typedef
  fileProgress(fileInput: any) {
    this.fileData = (fileInput.target.files[0] as File);
    this.pozeLista = fileInput.target.files;
    this.preview(this.fileData);
    this.preview2(this.pozeLista);
  }

// tslint:disable-next-line:typedef
  preview2(pozeLista: File[]) {
    for (const fileData of pozeLista) {
      const mimeType = this.fileData.type;
      if (mimeType.match(/image\/*/) == null) {
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(fileData);
      // tslint:disable-next-line:variable-name
      reader.onload = (_event) => {
        this.previewUrl = reader.result;
        this.previewsUrl.push(this.previewUrl);
      };
    }
  }

  // tslint:disable-next-line:typedef
  preview(fileData: File) {
    // Show preview
    const mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(fileData);
    // tslint:disable-next-line:variable-name
    reader.onload = (_event) => {
      this.previewUrl = reader.result;
    };
  }

  // mai multe foto

  selectPhoto(event): void {
    this.progressInfos = [];

    const files = event.target.files;
    let isImage = true;

    for (let i = 0; i < files.length; i++) {
      if (files.item(i).type.match('image.*')) {
        continue;
      } else {
        isImage = false;
        alert('invalid format!');
        break;
      }
    }

    if (isImage) {
      this.selectedPhotos = event.target.files;
    } else {
      this.selectedPhotos = undefined;
      event.srcElement.percentage = null;
    }
  }

  uploadPhotos(): void {
    this.message = '';

    for (let i = 0; i < this.selectedFiles.length; i++) {
      this.upload2(i, this.selectedFiles[i]);
    }
  }

  upload2(idx, file): void {
    this.progressInfos[idx] = {value: 0, fileName: file.name};

    this.galleryService.upload(file).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progressInfos[idx].percentage = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.photos = this.galleryService.getFiles();
        }
      },
      err => {
        this.progressInfos[idx].percentage = 0;
        this.message = 'Could not upload the file:' + file.name;
      });
  }
}
