import { Component, OnInit , Inject } from '@angular/core';
import { SkillComponent } from '../skill-dialog/skill.component';
import { SharedService } from '../service/shared.service';
import { ReadfromjsonService } from './../service/readfromjson.service';
import { TokenStorageService } from 'src/app/login/service/token-storage.service';
import { SkillService } from '../service/skill.service';
import { Skill } from '../skill-dialog/domain/skill';
import { FormBuilder , FormControl, Validators , FormArray } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Skillauto } from '../skill-dialog/domain/skillauto';
import { debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import { RefreshService } from '../service/refresh.service';
import { SkillChicklets } from '../skill-dialog/domain/skillchicklets';
import { SkillSection } from '../skill-dialog/domain/skillsection';
import { DownstreamBackendService } from '../../user-profile/downstream-backend.service';

@Component({
  selector: 'app-edit-skill-dialog',
  templateUrl: './edit-skill-dialog.component.html',
  styleUrls: ['./edit-skill-dialog.component.css']
})
export class EditSkillDialogComponent extends SkillComponent implements OnInit {
  employeeData: any;
  filteredSkills: Skillauto[] = [];
  isLoading = false;
  constructor(@Inject(MAT_DIALOG_DATA) protected data: any,
  protected dialogRef: MatDialogRef<SkillComponent>, protected readfromjsonService: ReadfromjsonService,
  protected skillService: SkillService, protected fb: FormBuilder,
  protected token: TokenStorageService, protected refreshService: RefreshService,
  private downstreamBackendService: DownstreamBackendService,
  private shared: SharedService ) {
    super(data, dialogRef, readfromjsonService, skillService, fb, token , refreshService);
   }

  ngOnInit() {
    this.shared.subject.subscribe(data => this.employeeData = data);

    this.skillForm = this.fb.group({
      skills: this.fb.array([this.initItemRow()])
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
      skillName: new FormControl(this.employeeData.skillName, Validators.required),
      skillLevel: new FormControl(this.employeeData.skillLevel, Validators.required)
    });
  }


 onSave() {
  const arr = this.skillForm.get('skills') as FormArray;
    const chicklets = new Array<SkillChicklets>();
    for (let i = 0; i < arr.length; i++) {
      const row = arr.at(i);
      console.log(this.employeeData.skillId);
      const skill = new Skill(this.employeeData.skill.skillId, row.value.skillName.name, row.value.skillLevel);
      const chicklet = new SkillChicklets(skill);
      chicklets.push(chicklet);
    }
    const section = new SkillSection('Skill', this.token.getEmail(), 'update', chicklets);
      this.downstreamBackendService.updateSkillsDetails(section)
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
