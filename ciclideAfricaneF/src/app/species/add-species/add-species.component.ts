import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SpeciesService} from '../service/species.service';
import {Species} from '../model/species';
import {Observable} from 'rxjs';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {AuthService} from "../../users/service/auth.service";

@Component({
  selector: 'app-add-species',
  templateUrl: './add-species.component.html',
  styleUrls: ['./add-species.component.css']
})
export class AddSpeciesComponent implements OnInit {
  species: Species = new Species();
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
              private speciesService: SpeciesService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.species = new Species();
  }
// tslint:disable-next-line:typedef
onSubmit(){
    this.speciesService.save(this.species, this.authService.TOKEN_SESSION_ATTRIBUTE_NAME).subscribe(result => {
      this.uploadPhotos();
      setTimeout(() =>
        {
          this.goToSpeciesList();
        },
        5000);
    });
}
// tslint:disable-next-line:typedef
goToSpeciesList(){
    this.router.navigate(['speciesList']);
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
    for (const fileData of pozeLista){
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
    this.progressInfos[idx] = { value: 0, fileName: file.name };

    this.speciesService.upload(file, this.authService.TOKEN_SESSION_ATTRIBUTE_NAME).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progressInfos[idx].percentage = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.photos = this.speciesService.getFiles(this.authService.TOKEN_SESSION_ATTRIBUTE_NAME);
        }
      },
      err => {
        this.progressInfos[idx].percentage = 0;
        this.message = 'Could not upload the file:' + file.name;
      });
  }
}
