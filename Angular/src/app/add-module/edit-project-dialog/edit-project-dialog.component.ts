import { ProjectService } from './../service/project.service';
import { ReadfromjsonService } from './../service/readfromjson.service';
import { Project } from './../project-dialog/domain/project';
import { Skill } from './../project-dialog/domain/skill';
import { ProjectChicklets } from './../project-dialog/domain/projectchicklets';
import { ProjectSection } from './../project-dialog/domain/projectsection';
import { Component, OnInit , Inject } from '@angular/core';
import {  FormArray, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TokenStorageService } from 'src/app/login/service/token-storage.service';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { AppDateAdapter, APP_DATE_FORMATS } from '../class/date-adapter';
import { RefreshService } from '../service/refresh.service';
import { ProjectdialogComponent } from '../project-dialog/projectdialog.component';
import { SharedService } from '../service/shared.service';
import { DownstreamBackendService } from 'src/app/user-profile/downstream-backend.service';

@Component({
  selector: 'app-edit-project-dialog',
  templateUrl: './edit-project-dialog.component.html',
  styleUrls: ['./edit-project-dialog.component.css'],
  providers: [{provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}]
})
export class EditProjectDialogComponent extends ProjectdialogComponent implements OnInit {
  public employeeData: any;
  constructor(@Inject(MAT_DIALOG_DATA) protected data: any,
  protected dialogRef: MatDialogRef<ProjectdialogComponent>,
  protected fb: FormBuilder, protected projectService: ProjectService,
  protected readfromjsonService: ReadfromjsonService,
  protected token: TokenStorageService,
  protected refreshService: RefreshService,
  private shared: SharedService,
  private downstreamBackendService: DownstreamBackendService) {
    super(data, dialogRef, fb, projectService, readfromjsonService, token, refreshService );
  }

  ngOnInit() {
    const regForUrl = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
    this.shared.subject.subscribe(data => this.employeeData = data);
    this.projectForm = this.fb.group({
      title: [this.employeeData.title, [Validators.required]],
      startDate: '',
      endDate: '',
      url: [this.employeeData.projectUrl, [ Validators.pattern(regForUrl)]],
      domain : '',
      role: this.employeeData.role,
      company: '',
      client: '',
      technologiesUsed: this.fb.array([this.createTechnology()]),
      description: this.employeeData.description
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

  onSave() {
    this.title = this.employeeData.title;
    this.startDate = this.projectForm.get('startDate').value as Date;
    this.endDate = this.projectForm.get('endDate').value as Date;
    this.url = this.projectForm.get('url').value as string;
    this.domain = this.projectForm.get('domain').value.name as string;
    this.role = this.projectForm.get('role').value as string;
    this.company = this.projectForm.get('company').value.name as string;
    this.client = this.projectForm.get('client').value.name as string;
    this.description = this.projectForm.get('description').value as string;

    const technologies = new Array<Skill>();
      const arr = this.projectForm.get('technologiesUsed') as FormArray;
      const values = arr.value;
      for (const row of values) {
        const technology = new Skill(row.skill.name , row.level);
        technologies.push(technology);
      }

    const project = new Project(this.title,
      `${this.startDate.getDate()}-${this.startDate.getMonth() + 1}-${this.startDate.getFullYear()}`,
      `${this.endDate.getDate()}-${this.endDate.getMonth() + 1}-${this.endDate.getFullYear()}`,
       this.url,
       this.domain,
       this.role,
       this.company,
       this.client,
       technologies,
       this.description );
    const chicklets = new Array<ProjectChicklets>();
    const chicklet = new ProjectChicklets(project);
    chicklets.push(chicklet);
    const projectSection = new ProjectSection('sectionId', this.token.getEmail(), 'update', chicklets);
    this.downstreamBackendService.updateProjectDetails(projectSection)
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

