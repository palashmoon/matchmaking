import { Component, OnInit, Inject, Renderer2 } from '@angular/core';

import { ExperienceService } from 'src/app/add-module/service/experience.service';
import { Output } from '../experience-dialog/domain/output';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormArray, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ExperienceSection } from '../experience-dialog/domain/section';
import { Chicklets } from '../experience-dialog/domain/chicklets';
import { ExperienceDetails } from '../experience-dialog/domain/experience-details';
import { TokenStorageService } from 'src/app/login/service/token-storage.service';
import { Organisation } from './domain/organisation';
import { debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { AppDateAdapter, APP_DATE_FORMATS } from '../class/date-adapter';
import { RefreshService } from '../service/refresh.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css'],
  providers: [{provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}]
})
export class ExperienceComponent implements OnInit {



  experienceForm: FormGroup;
  filteredOrganisations: Organisation[] = [];
  isLoading = false;
  organisation: string;
  role: string;
  startDate: Date;
  endDate: Date;
  output: Output;
  errorMessage: string;
  totalRow: number;
  fromDay: string;
  fromMonth: string;
  fromYear: string;
  toDay: string;
  toMonth: string;
  toYear: string;
  temp: FormArray;
  constructor(@Inject(MAT_DIALOG_DATA) protected data: any,
    protected dialogRef: MatDialogRef<ExperienceComponent>,
    protected experienceService: ExperienceService, protected fb: FormBuilder,
    protected token: TokenStorageService,
    protected refreshService: RefreshService) {

  }

  ngOnInit() {
    this.experienceForm = this.fb.group({
      experience: this.fb.array([this.initItemRow()])
    });
    this.dialogRef.afterClosed().subscribe(result => {
      console.log(`experience add`);
      this.refreshService.refreshProfile();
    });
  }
  onKeyUp(index: number) {
    this.temp = this.experienceForm.get('experience') as FormArray;
    this.temp.at(index).get('organisation').valueChanges.pipe(
      debounceTime(300),
      tap(() => this.isLoading = true),
      switchMap(value =>
        this.experienceService.search({name: value}, 1)
      .pipe(
        finalize(() => this.isLoading = false),
        )
      )
    )
    .subscribe(response => this.filteredOrganisations = response.organizations);
 }
displayFn(organisation: Organisation) {
  if (organisation) {
    return organisation.name; }
}

  initItemRow() {
    return this.fb.group({
      organisation: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required),
      startDate: new FormControl('', Validators.required),
      endDate: new FormControl('', Validators.required)
    });
  }
  addRow() {
    const control = <FormArray>this.experienceForm.controls['experience'];
    control.push(this.initItemRow());
  }

  deleteRow(index: number) {
    const control = <FormArray>this.experienceForm.controls['experience'];
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
    const arr = this.experienceForm.get('experience') as FormArray;
    const chicklets = new Array<Chicklets>();
    for (let i = 0; i < arr.length; i++) {
      const row = arr.at(i);
      let fromDate;
      fromDate = row.value.startDate;
      console.log(fromDate);
      this.fromDay = fromDate.getDate();
      this.fromYear = fromDate.getFullYear();
      this.fromMonth = fromDate.getMonth() + 1;

      let toDate;
      toDate = row.value.endDate;
      console.log(fromDate);
      this.toDay = toDate.getDate();
      this.toYear = toDate.getFullYear();
      this.toMonth = toDate.getMonth() + 1;
      let experienceDetails;

      if (row.value.organisation.name === undefined) {
        experienceDetails = new ExperienceDetails(row.value.organisation,
          row.value.role,
          this.fromDay,
          this.fromMonth,
          this.fromYear,
          this.toDay,
          this.toMonth,
          this.toYear);
      } else {
        experienceDetails = new ExperienceDetails(row.value.organisation.name,
          row.value.role,
          this.fromDay,
          this.fromMonth,
          this.fromYear,
          this.toDay,
          this.toMonth,
          this.toYear);
      }
      const chicklet = new Chicklets(experienceDetails);
      chicklets.push(chicklet);
    }
    const section = new ExperienceSection('Experience', this.token.getEmail(), 'add', chicklets);
    this.experienceService.addExperienceDetails(section).subscribe(
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
