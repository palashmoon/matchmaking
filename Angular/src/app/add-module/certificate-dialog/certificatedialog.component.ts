import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormArray, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Certificate } from '../certificate-dialog/domain/certificate';
import { CertificateChicklets } from '../certificate-dialog/domain/certificatechicklets';
import { CertificateSection } from '../certificate-dialog/domain/certificatesection';
import { CertificateService } from '../service/certificate.service';
import { ReadfromjsonService } from './../service/readfromjson.service';
import { TokenStorageService } from 'src/app/login/service/token-storage.service';
import { Certi } from './domain/Certi';
import { debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import { Authority } from './domain/Authority';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { AppDateAdapter, APP_DATE_FORMATS } from '../class/date-adapter';
import { RefreshService } from '../service/refresh.service';

@Component({
  selector: 'app-certificatedialog',
  templateUrl: './certificatedialog.component.html',
  styleUrls: ['./certificatedialog.component.css'],
  providers: [{provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}]
})
export class CertificatedialogComponent implements OnInit {
  filteredCertificates: Certi[] = [];
  filteredAuthorities: Authority[] = [];
  isLoading = false;
  certificateForm: FormGroup;
  certificateName: string;
  certificateAuthority: string;
  licenseNumber: string;
  fromDate: Date;
  toDate: Date;
  errorMessage: string;
  totalRow: number;
  dataJson: any;
  temp: FormArray;
  temp1: FormArray;
  json_url = 'assets/certificate.json';
  constructor(@Inject(MAT_DIALOG_DATA) protected data: any,
  protected certificateService: CertificateService, protected readfromjsonService: ReadfromjsonService,
  protected dialogRef: MatDialogRef<CertificatedialogComponent>,
  protected fb: FormBuilder,
  protected token: TokenStorageService,
  protected refreshService: RefreshService) {

}
  ngOnInit() {
    this.certificateForm = this.fb.group({
      certificate: this.fb.array([this.initItemRow()])
    });

    this.dataJson = this.readfromjsonService.readFromJson(this.json_url).subscribe(
      data => {
        this.dataJson = data;
      }
    );
    this.dialogRef.afterClosed().subscribe(result => {
      this.refreshService.refreshProfile();
    });
  }
  onKeyUp(index: number) {
    this.temp = this.certificateForm.get('certificate') as FormArray;
    this.temp.at(index).get('certificateName').valueChanges.pipe(
      debounceTime(300),
      tap(() => this.isLoading = true),
      switchMap(value =>
        this.certificateService.searchcertificate({name: value}, 1)
      .pipe(
        finalize(() => this.isLoading = false),
        )
      )
    )
    .subscribe(response => this.filteredCertificates = response.certifications);
 }
displayFn(certi: Certi) {
  if (certi) {
    return certi.name; }
}
onKeyUp1(index: number) {
  this.temp = this.certificateForm.get('certificate') as FormArray;
  this.temp.at(index).get('certificateAuthority').valueChanges.pipe(
    debounceTime(300),
    tap(() => this.isLoading = true),
    switchMap(value =>
      this.certificateService.searchauthrity({name: value}, 1)
    .pipe(
      finalize(() => this.isLoading = false),
      )
    )
  )
  .subscribe(response => this.filteredAuthorities = response.organizations);
}
displayFn1(authority: Authority) {
if (authority) {
  return authority.name; }
}
  initItemRow() {
    return this.fb.group({
      certificateName: new FormControl('', Validators.required),
      certificateAuthority: new FormControl('', Validators.required),
      licenseNumber: new FormControl('', Validators.required),
      fromDate: new FormControl('', Validators.required),
      toDate: new FormControl('', Validators.required)
    });
  }
  addRow() {
    const control = <FormArray>this.certificateForm.controls['certificate'];
    control.push(this.initItemRow());

  }
  deleteRow(index: number) {
    const control = <FormArray>this.certificateForm.controls['certificate'];
    if (control != null) {
      this.totalRow = control.value.length;
    }
    if (this.totalRow > 1 ) {
      control.removeAt(index);
    } else {
      alert('Add one more details.');
      return false;
    }
  }

  onSave() {
    const arr = this.certificateForm.get('certificate') as FormArray;
    const chicklets = new Array<CertificateChicklets>();
    for (let i = 0; i < arr.length; i++) {
      const row = arr.at(i);
      let certificateDetails;
      if  (row.value.certificateAuthority.name === undefined) {
        certificateDetails = new Certificate(row.value.certificateName,
          row.value.certificateAuthority,
          row.value.licenseNumber,
          `${row.value.fromDate.getDate()}-${row.value.fromDate.getMonth() + 1}-${row.value.fromDate.getFullYear()}`,
          `${row.value.toDate.getDate()}-${row.value.toDate.getMonth() + 1}-${row.value.toDate.getFullYear()}`);
      } else {
        certificateDetails = new Certificate(row.value.certificateName,
          row.value.certificateAuthority.name,
          row.value.licenseNumber,
          `${row.value.fromDate.getDate()}-${row.value.fromDate.getMonth() + 1}-${row.value.fromDate.getFullYear()}`,
          `${row.value.toDate.getDate()}-${row.value.toDate.getMonth() + 1}-${row.value.toDate.getFullYear()}`);
      }
      const chicklet = new CertificateChicklets(certificateDetails);
      chicklets.push(chicklet);
    }
     const section = new CertificateSection('Certificate', this.token.getEmail(), 'add', chicklets);
    this.certificateService.addCertificateDetails(section).subscribe(
      data => {
        this.dialogRef.close();
      },
      error => {
        this.errorMessage = error;
      }
    );
  }

  onClose() {
    this.dialogRef.close();
  }
}

