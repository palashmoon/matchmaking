import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { DetailsdialogComponent } from './details-dialog/detailsdialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EducationdialogComponent } from './education-dialog/educationdialog.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ExperienceComponent } from './experience-dialog/experience.component';
import { SkillComponent } from './skill-dialog/skill.component';
import { CertificatedialogComponent } from './certificate-dialog/certificatedialog.component';
import { LocationdialogComponent } from './location-dialog/locationdialog.component';
import { ProjectdialogComponent } from './project-dialog/projectdialog.component';
import { InterestDialogComponent } from './interest-dialog/interest-dialog.component';
import { MatAutocompleteModule, MatProgressSpinnerModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { EducationService } from './service/education.service';
import { EditSkillDialogComponent } from './edit-skill-dialog/edit-skill-dialog.component';
import { EditEducationDialogComponent } from './edit-education-dialog/edit-education-dialog.component';
import { EditExperienceDialogComponent } from './edit-experience-dialog/edit-experience-dialog.component';
import { EditLocationDialogComponent } from './edit-location-dialog/edit-location-dialog.component';
import { EditProjectDialogComponent } from './edit-project-dialog/edit-project-dialog.component';
import { EditCertificateDialogComponent } from './edit-certificate-dialog/edit-certificate-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    BrowserModule,
    HttpClientModule,
    MatProgressSpinnerModule
  ],

  declarations: [CardComponent,
                  DetailsdialogComponent,
                  EducationdialogComponent,
                  SkillComponent,
                  CertificatedialogComponent,
                  LocationdialogComponent,
                  ExperienceComponent,
                  ProjectdialogComponent,
                  InterestDialogComponent,
                  EditSkillDialogComponent,
                  EditEducationDialogComponent,
                  EditExperienceDialogComponent,
                  EditLocationDialogComponent,
                  EditProjectDialogComponent,
                  EditCertificateDialogComponent],

  entryComponents: [DetailsdialogComponent,
                    EducationdialogComponent,
                    SkillComponent,
                    CertificatedialogComponent,
                    ExperienceComponent,
                    LocationdialogComponent,
                    ProjectdialogComponent,
                    InterestDialogComponent,
                    EditSkillDialogComponent,
                  EditEducationDialogComponent,
                EditExperienceDialogComponent,
              EditLocationDialogComponent,
              EditProjectDialogComponent,
            EditCertificateDialogComponent],
  providers: [EducationService],
  exports: [CardComponent, CertificatedialogComponent]
})
export class CardsModule { }
