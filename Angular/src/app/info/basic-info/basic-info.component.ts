import { BasicInfoService } from './../basic-info.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatOption} from '@angular/material';
import { TokenStorageService } from 'src/app/login/service/token-storage.service';
import { BasicInfo } from './basic-info';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.css']
})
export class BasicInfoComponent implements OnInit {

  basicInformationForm: FormGroup;
  isPhotoSelected: Boolean = false;
  selectedFile: any;
  receivedFile: string;
  gender: any;
  dob: string;
  contactNo: string;
  linkedinUrl: string;
  githubUrl: string;
  name: string;
  email: string;
  basicInfo: BasicInfo;

  constructor(
    public dialogRef: MatDialogRef<BasicInfoComponent>,
    private uploadService: BasicInfoService,
    private fb: FormBuilder,
    private token: TokenStorageService) { }

  ngOnInit() {
    this.basicInformationForm = this.fb.group({
      gender: new FormControl(''),
      dob: new FormControl(''),
      contactNo: new FormControl(''),
      linkedinUrl: new FormControl(''),
      githubUrl: new FormControl('')
    });

    this.name = this.token.getEmail();
    this.email = this.token.getEmail();

    this.uploadService.fileExists(this.token.getEmail()).subscribe(data => {
      this.isPhotoSelected = data;
    });

    this.uploadService.downloadFile(this.token.getEmail()).subscribe(data => {
      let binary = '';
  const bytes = new Uint8Array( data );
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
      binary += String.fromCharCode( bytes[ i ] );
  }
  this.receivedFile = window.btoa(binary);
    });
  }

  handleFileSelect(evt) {
    this.isPhotoSelected = true;
    this.selectedFile = evt.target.files[0];
    const fd = new FormData();
    fd.append('file', this.selectedFile);
    this.uploadService.uploadFile(fd, this.token.getEmail()).subscribe(data => {
      console.log(data);
    });

    const files = evt.target.files;
    const file = files[0];

  if (files && file) {
      const reader = new FileReader();

      reader.onload = this._handleReaderLoaded.bind(this);

      reader.readAsBinaryString(file);
  }
  }

  _handleReaderLoaded(readerEvt) {
   const binaryString = readerEvt.target.result;
          this.receivedFile = btoa(binaryString);
  }

  onUpdate() {
    // const basicInfo = new BasicInfo;

      this.dob = this.basicInformationForm.get('dob').value as string;
      this.contactNo = this.basicInformationForm.get('contactNo').value as string;
      this.linkedinUrl = this.basicInformationForm.get('linkedinUrl').value as string;
      this.githubUrl = this.basicInformationForm.get('githubUrl').value as string;
      this.basicInfo = new BasicInfo(this.gender, this.dob, this.contactNo, this.linkedinUrl, this.githubUrl);
      this.uploadService.basicInfoSending(this.token.getEmail(), this.basicInfo).subscribe(data =>{
        console.log(data);
        this.dialogRef.close();
      });
  }


  onNoClick(): void {
    this.dialogRef.close();
  }


}
