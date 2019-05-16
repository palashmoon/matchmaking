import { Component, OnInit, Inject } from '@angular/core';

import { ExperienceService } from 'src/app/add-module/service/experience.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormArray, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ExperienceSection } from '../experience-dialog/domain/section';
import { Chicklets } from '../experience-dialog/domain/chicklets';
import { ExperienceDetails } from '../experience-dialog/domain/experience-details';
import { TokenStorageService } from 'src/app/login/service/token-storage.service';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { AppDateAdapter, APP_DATE_FORMATS } from '../class/date-adapter';
import { RefreshService } from '../service/refresh.service';
import { ExperienceComponent } from '../experience-dialog/experience.component';
import { SharedService } from '../service/shared.service';
import { DownstreamBackendService} from '../../user-profile/downstream-backend.service';

@Component({
  selector: 'app-edit-experience-dialog',
  templateUrl: './edit-experience-dialog.component.html',
  styleUrls: ['./edit-experience-dialog.component.css'],
  providers: [{provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}]
})
export class EditExperienceDialogComponent extends ExperienceComponent implements OnInit {
  public employeeData: any;
  constructor(@Inject(MAT_DIALOG_DATA) protected data: any,
    protected dialogRef: MatDialogRef<ExperienceComponent>,
    protected experienceService: ExperienceService, protected fb: FormBuilder,
    protected token: TokenStorageService,
    protected refreshService: RefreshService, private shared: SharedService,
    private downstreamBackendService: DownstreamBackendService) {
      super(data, dialogRef, experienceService, fb, token, refreshService);
  }

  ngOnInit() {
    this.shared.subject.subscribe(data => this.employeeData = data);
    this.experienceForm = this.fb.group({
      experience: this.fb.array([this.initItemRow()])
    });
    this.dialogRef.afterClosed().subscribe(result => {
      console.log(`experience add`);
      this.refreshService.refreshProfile();
    });
  this.dialogRef.afterClosed().subscribe(result => {
    this.refreshService.refreshProfile();
  });

  }

  initItemRow() {
    return this.fb.group({
      organisation: new FormControl(this.employeeData.organisation, Validators.required),
      role: new FormControl(this.employeeData.role, Validators.required),
      startDate: new FormControl(this.employeeData.startDate, Validators.required),
      endDate: new FormControl(this.employeeData.endDate, Validators.required)
    });
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

      const experienceDetails = new ExperienceDetails(this.employeeData.organisation,
                                  row.value.role,
                                  this.fromDay,
                                  this.fromMonth,
                                  this.fromYear,
                                  this.toDay,
                                  this.toMonth,
                                  this.toYear);
      const chicklet = new Chicklets(experienceDetails);
      chicklets.push(chicklet);
    }

      const experienceSection = new ExperienceSection('Experience', this.token.getEmail(), 'update', chicklets);
      this.downstreamBackendService.updateExperienceDetails(experienceSection)
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
