import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { SkillService } from '../service/skill.service';
import { SkillChicklets } from '../skill-dialog/domain/skillchicklets';
import { Skill } from '../skill-dialog/domain/skill';
import { SkillSection } from '../skill-dialog/domain/skillsection';
import { Output } from '../outputclass/output';
import { ReadfromjsonService } from './../service/readfromjson.service';
import { TokenStorageService } from 'src/app/login/service/token-storage.service';
import { Skillauto } from './domain/skillauto';
import { debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import { RefreshService } from '../service/refresh.service';
import { Md5 } from 'ts-md5';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent implements OnInit {
  filteredSkills: Skillauto[] = [];
  isLoading = false;
  skillForm: FormGroup;
  skillName: string;
  skillLevel: string;
  output: Output;
  errorMessage: string;
  totalRow: number;
  dataJson: any;
  json_url = 'assets/skill.json';
  temp: FormArray;
  skillId: string;
  options: string[] = ['Beginner', 'Intermediate', 'Advance'];

  constructor(@Inject(MAT_DIALOG_DATA) protected data: any,
    protected dialogRef: MatDialogRef<SkillComponent>, protected readfromjsonService: ReadfromjsonService,
    protected skillService: SkillService, protected fb: FormBuilder,
    protected token: TokenStorageService,
    protected refreshService: RefreshService) {

  }

  ngOnInit() {
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

  onKeyUp(index: number) {
    this.temp = this.skillForm.get('skills') as FormArray;
    this.temp.at(index).get('skillName').valueChanges.pipe(
      debounceTime(300),
      tap(() => this.isLoading = true),
      switchMap(value =>
        this.skillService.searchskills({name: value}, 1)
      .pipe(
        finalize(() => this.isLoading = false),
        )
      )
    )
    .subscribe(Iskills => this.filteredSkills = Iskills.skills);
 }
displayFn(skill: Skillauto) {
  if (skill) {
    return skill.name; }
}
  initItemRow() {
    return this.fb.group({
      skillName: new FormControl('', Validators.required),
      skillLevel: new FormControl('', Validators.required)
    });
  }
  addRow() {
    const control = <FormArray>this.skillForm.controls['skills'];
    control.push(this.initItemRow());

  }
  deleteRow(index: number) {
    const control = <FormArray>this.skillForm.controls['skills'];
    if (control != null) {
      this.totalRow  = control.value.length;
    }
    if (this.totalRow > 1) {
      control.removeAt(index);
    } else {
      alert('Add one more details.');
      return false;
    }
  }

  onSave() {
    const arr = this.skillForm.get('skills') as FormArray;
    const chicklets = new Array<SkillChicklets>();
    for (let i = 0; i < arr.length; i++) {
      const row = arr.at(i);
      let skill;
      if (row.value.skillName.name === undefined) {
        this.skillId = Md5.hashStr(this.token.getEmail() + row.value.skillName, false).toString();
        skill = new Skill(this.skillId, row.value.skillName, row.value.skillLevel);
      } else {
        skill = new Skill(row.value.skillName.id, row.value.skillName.name, row.value.skillLevel);
      }
      const chicklet = new SkillChicklets(skill);
      chicklets.push(chicklet);
    }

    // const section = new SkillSection("Skill", "userId", "add", chicklets);
    console.log('fjd ' + chicklets);
    const section = new SkillSection('Skill', this.token.getEmail(), 'add', chicklets);
    this.skillService.addSkillDetails(section).subscribe(
      data => {
        this.output = data;
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
