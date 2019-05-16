import { CertificatedialogComponent } from './../certificate-dialog/certificatedialog.component';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EducationdialogComponent } from '../education-dialog/educationdialog.component';
import { ExperienceComponent } from '../experience-dialog/experience.component';
import { SkillComponent } from '../skill-dialog/skill.component';
import { LocationdialogComponent } from '../location-dialog/locationdialog.component';
import { ProjectdialogComponent } from '../project-dialog/projectdialog.component';
import { InterestDialogComponent } from '../interest-dialog/interest-dialog.component';

@Component({
  selector: 'app-detailsdialog',
  templateUrl: './detailsdialog.component.html',
  styleUrls: ['./detailsdialog.component.css']
})
export class DetailsdialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<DetailsdialogComponent>,
    private dialog: MatDialog) { }

  ngOnInit() {
  }

  close(): void {
    this.dialogRef.close();
  }
  educationClick() {
    console.log('hey');
    this.dialogRef.close();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '600px';
    this.dialog.open(EducationdialogComponent, dialogConfig);
  }

  experienceClick() {
    this.dialogRef.close();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '600px';
    this.dialog.open(ExperienceComponent, dialogConfig);
  }

  interestClick() {
    this.dialogRef.close();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '600px';
    this.dialog.open(InterestDialogComponent, dialogConfig);
  }

  skillClick() {
    this.dialogRef.close();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '600px';
    this.dialog.open(SkillComponent, dialogConfig);
  }
  projectClick() {
    this.dialogRef.close();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '800px';
    this.dialog.open(ProjectdialogComponent, dialogConfig);
  }

  certificateClick() {
    this.dialogRef.close();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '700px';
    this.dialog.open(CertificatedialogComponent, dialogConfig);
  }
  locationClick() {
    this.dialogRef.close();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '700px';
    this.dialog.open(LocationdialogComponent, dialogConfig);
  }
}
