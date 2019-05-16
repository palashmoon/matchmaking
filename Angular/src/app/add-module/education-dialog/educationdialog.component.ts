import { Component, OnInit, Inject, Renderer2 } from '@angular/core';
import { ReadfromjsonService } from './../service/readfromjson.service';
import { Qualification } from '../education-dialog/domain/qualification';
import { Institution } from '../education-dialog/domain/institution';
import { EducationChicklets } from '../education-dialog/domain/educationchicklets';
import { EducationService } from 'src/app/add-module/service/education.service';
import { Output } from '../outputclass/output';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormArray, FormControl, FormBuilder, Validators } from '@angular/forms';
import { EducationSection } from '../education-dialog/domain/educationsection';
import { TokenStorageService } from 'src/app/login/service/token-storage.service';
import { debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import { Qualificationn } from './domain/qualificationn';
import { Institute } from './domain/institute';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { AppDateAdapter, APP_DATE_FORMATS } from '../class/date-adapter';
import { RefreshService } from '../service/refresh.service';
import {Md5} from 'ts-md5/dist/md5';

@Component({
  selector: 'app-educationdialog',
  templateUrl: './educationdialog.component.html',
  styleUrls: ['./educationdialog.component.css'],
  providers: [{provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}]
})
export class EducationdialogComponent implements OnInit {
  filteredQualifications: Qualificationn[] = [];
  filteredInstitutions: Institute[] = [];
  isLoading = false;
  isLoading1 = false;
  educationForm: FormGroup;
  qualification: string;
  institute: string;
  startDate: Date;
  endDate: Date;
  summary: string;
  output: Output;
  errorMessage: string;
  totalRow: number;
  dataJson: any;
  startDatePicker: string;
  json_url = 'assets/education.json';
  temp: FormArray;
  temp1: FormArray;
  qualificationId: string;
  institutionId: string;
  constructor(@Inject(MAT_DIALOG_DATA) protected data: any,
    protected dialogRef: MatDialogRef<EducationdialogComponent>,
    protected educationService: EducationService, protected fb: FormBuilder,
    protected readfromjsonService: ReadfromjsonService,
    protected token: TokenStorageService,
    protected refreshService: RefreshService) {

  }

  ngOnInit() {
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
  onKeyUp(index: number) {
    this.temp = this.educationForm.get('education') as FormArray;
    this.temp.at(index).get('qualification').valueChanges.pipe(
      debounceTime(300),
      tap(() => this.isLoading = true),
      switchMap(value =>
        this.educationService.searchqualification({name: value}, 1)
      .pipe(
        finalize(() => this.isLoading = false),
        )
      )
    )
    .subscribe(qualificationn => this.filteredQualifications = qualificationn.qualifications);
 }
displayFn(qualification: Qualificationn) {
  if (qualification) {
    return qualification.name; }
}
onKeyUp1(index: number) {
  this.temp1 = this.educationForm.get('education') as FormArray;
  this.temp1.at(index).get('institute').valueChanges.pipe(
    debounceTime(300),
    tap(() => this.isLoading1 = true),
    switchMap(value =>
      this.educationService.searchinstitution({name: value}, 1)
    .pipe(
      finalize(() => this.isLoading1 = false),
      )
    )
  )
  .subscribe(institutions => this.filteredInstitutions = institutions.educations);
}
displayFn1(institute: Institute) {
if (institute) {
  return institute.name; }
}

  initItemRow() {
    return this.fb.group({
      qualification: new FormControl('', Validators.required),
      institute: new FormControl('', Validators.required),
      startDate: new FormControl('', Validators.required),
      endDate: new FormControl('', Validators.required)
    });
  }
  addRow() {
    const control = <FormArray>this.educationForm.controls['education'];
    control.push(this.initItemRow());

  }
  deleteRow(index: number) {
    const control = <FormArray>this.educationForm.controls['education'];
    if (control != null) {
      this.totalRow = control.value.length;
    }
    if (this.totalRow > 1) {
      control.removeAt(index);
    } else {
      alert('Add one more details.');
      return false;
    }
  }
  onSave() {
    const arr = this.educationForm.get('education') as FormArray;
    const chicklets = new Array<EducationChicklets>();
    for (let i = 0; i < arr.length; i++) {
      const row = arr.at(i);
      const temp = row.value.startDate;
      let qualification;
      let institution;

      if ( row.value.qualification.name === undefined) {
        this.qualificationId = Md5.hashStr(this.token.getEmail() + row.value.qualification, false).toString();
        qualification = new Qualification(this.qualificationId, row.value.qualification);
      } else {
        qualification = new Qualification(row.value.qualification.id, row.value.qualification.name);
      }

      if (row.value.institute.name === undefined) {
        institution = new Institution('institutionId',
          row.value.institute,
          row.value.startDate.getDate() + '-' + (row.value.startDate.getMonth() + 1) + '-' + row.value.startDate.getFullYear(),
          row.value.endDate.getDate() + '-' + (row.value.endDate.getMonth() + 1) + '-' + row.value.endDate.getFullYear());
      } else {
        institution = new Institution(row.value.institute.id,
        row.value.institute.name,
        row.value.startDate.getDate() + '-' + (row.value.startDate.getMonth() + 1) + '-' + row.value.startDate.getFullYear(),
        row.value.endDate.getDate() + '-' + (row.value.endDate.getMonth() + 1) + '-' + row.value.endDate.getFullYear());
      }
      const chicklet = new EducationChicklets(qualification, institution, this.summary);
      chicklets.push(chicklet);
    }
    const section = new EducationSection('Education', this.token.getEmail(), 'add', chicklets);
    this.educationService.addEducationDetails(section).subscribe(
      data => {
        this.output = data;
        console.log(this.output);
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
