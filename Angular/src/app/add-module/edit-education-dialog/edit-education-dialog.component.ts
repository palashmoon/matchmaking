import { Component, OnInit, Inject } from '@angular/core';
import { ReadfromjsonService } from './../service/readfromjson.service';
import { Qualification } from '../education-dialog/domain/qualification';
import { Institution } from '../education-dialog/domain/institution';
import { EducationChicklets } from '../education-dialog/domain/educationchicklets';
import { EducationService } from 'src/app/add-module/service/education.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormArray, FormControl, FormBuilder, Validators } from '@angular/forms';
import { EducationSection } from '../education-dialog/domain/educationsection';
import { TokenStorageService } from 'src/app/login/service/token-storage.service';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { AppDateAdapter, APP_DATE_FORMATS } from '../class/date-adapter';
import { RefreshService } from '../service/refresh.service';
import { EducationdialogComponent } from '../education-dialog/educationdialog.component';
import { SharedService } from '../service/shared.service';
import { DownstreamBackendService} from '../../user-profile/downstream-backend.service';

@Component({
  selector: 'app-edit-education-dialog',
  templateUrl: './edit-education-dialog.component.html',
  styleUrls: ['./edit-education-dialog.component.css'],
  providers: [{provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}]
})
export class EditEducationDialogComponent extends EducationdialogComponent implements OnInit {
  public employeeData: any;
  constructor(@Inject(MAT_DIALOG_DATA) protected data: any,
  protected dialogRef: MatDialogRef<EducationdialogComponent>,
  protected educationService: EducationService, protected fb: FormBuilder,
  protected readfromjsonService: ReadfromjsonService,
  protected token: TokenStorageService,
  protected refreshService: RefreshService,
  private shared: SharedService,
  private downstreamBackendService: DownstreamBackendService) {
    super(data, dialogRef, educationService, fb, readfromjsonService, token, refreshService);

}

ngOnInit() {
  this.shared.subject.subscribe(data => this.employeeData = data);
  console.log(this.employeeData.qualification);
  this.educationForm = this.fb.group({
    education: this.fb.array([this.initItemRow()])
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
    qualification: new FormControl(this.employeeData.qualification, Validators.required),
    institute: new FormControl(this.employeeData.institution, Validators.required),
    startDate: new FormControl(this.employeeData.startDate, Validators.required),
    endDate: new FormControl(this.employeeData.endDate, Validators.required)
  });
}

onSave() {
  const arr = this.educationForm.get('education') as FormArray;
    const chicklets = new Array<EducationChicklets>();
    for (let i = 0; i < arr.length; i++) {
      const row = arr.at(i);
      const qualification = new Qualification(this.employeeData.id, row.value.qualification.name);
      const institution = new Institution('institutionId',
        row.value.institute.name,
        row.value.startDate.getDate() + '-' + (row.value.startDate.getMonth() + 1) + '-' + row.value.startDate.getFullYear(),
        row.value.endDate.getDate() + '-' + (row.value.endDate.getMonth() + 1) + '-' + row.value.endDate.getFullYear());
      const chicklet = new EducationChicklets(qualification, institution, this.summary);
      chicklets.push(chicklet);
    }
    const educationSection = new EducationSection('Education', this.token.getEmail(), 'update', chicklets);
  this.downstreamBackendService.updateEducationDetails(educationSection)
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
