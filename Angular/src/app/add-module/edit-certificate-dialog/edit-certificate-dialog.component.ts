import { Component, OnInit, Inject } from '@angular/core';
import { FormArray, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Certificate } from '../certificate-dialog/domain/certificate';
import { CertificateChicklets } from '../certificate-dialog/domain/certificatechicklets';
import { CertificateSection } from '../certificate-dialog/domain/certificatesection';
import { CertificateService } from '../service/certificate.service';
import { ReadfromjsonService } from './../service/readfromjson.service';
import { TokenStorageService } from 'src/app/login/service/token-storage.service';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { AppDateAdapter, APP_DATE_FORMATS } from '../class/date-adapter';
import { RefreshService } from '../service/refresh.service';
import { SharedService } from '../service/shared.service';
import { DownstreamBackendService } from 'src/app/user-profile/downstream-backend.service';
import { CertificatedialogComponent } from '../certificate-dialog/certificatedialog.component';


@Component({
  selector: 'app-edit-certificate-dialog',
  templateUrl: './edit-certificate-dialog.component.html',
  styleUrls: ['./edit-certificate-dialog.component.css'],
  providers: [{provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}]
})
export class EditCertificateDialogComponent extends CertificatedialogComponent implements OnInit {
  public employeeData: any;
  constructor(@Inject(MAT_DIALOG_DATA) protected data: any,
  protected certificateService: CertificateService, protected readfromjsonService: ReadfromjsonService,
  protected dialogRef: MatDialogRef<CertificatedialogComponent>,
  protected fb: FormBuilder,
  protected token: TokenStorageService,
  protected refreshService: RefreshService,
  private shared: SharedService,
  private downstreamBackendService: DownstreamBackendService) {
    super(data, certificateService, readfromjsonService, dialogRef, fb, token, refreshService);
}

ngOnInit() {
  this.shared.subject.subscribe(data => this.employeeData = data);
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

initItemRow() {
  return this.fb.group({
    certificateName: new FormControl(this.employeeData.certificateName, Validators.required),
    certificateAuthority: new FormControl('', Validators.required),
    // licenseNumber: new FormControl(this.employeeData.licenseNumber, Validators.required),
    fromDate: new FormControl('', Validators.required),
    toDate: new FormControl('', Validators.required)
  });
}
onSave() {
  const arr = this.certificateForm.get('certificate') as FormArray;
  const chicklets = new Array<CertificateChicklets>();
  for (let i = 0; i < arr.length; i++) {
    const row = arr.at(i);
    const certificateDetails = new Certificate(row.value.certificateName,
      row.value.certificateAuthority.name,
      this.employeeData.licenseNumber,
      `${row.value.fromDate.getDate()}-${row.value.fromDate.getMonth() + 1}-${row.value.fromDate.getFullYear()}`,
      `${row.value.toDate.getDate()}-${row.value.toDate.getMonth() + 1}-${row.value.toDate.getFullYear()}`);
    const chicklet = new CertificateChicklets(certificateDetails);
    chicklets.push(chicklet);
  }
  const certificateSection = new CertificateSection('Certificate', this.token.getEmail(), 'update', chicklets);
      this.downstreamBackendService.updateCerificateDetails(certificateSection)
      .subscribe(
        (data) => {
          console.log(data);
          this.dialogRef.close();
        },
        error => {
          this.errorMessage = error;
        }
      );
}
}
