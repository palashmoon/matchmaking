var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
var CardsModule = /** @class */ (function () {
    function CardsModule() {
    }
    CardsModule = __decorate([
        NgModule({
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
                EditSkillDialogComponent
            ],
            entryComponents: [DetailsdialogComponent,
                EducationdialogComponent,
                SkillComponent,
                CertificatedialogComponent,
                ExperienceComponent,
                LocationdialogComponent,
                ProjectdialogComponent,
                InterestDialogComponent,
                EditSkillDialogComponent],
            providers: [EducationService],
            exports: [CardComponent]
        })
    ], CardsModule);
    return CardsModule;
}());
export { CardsModule };
//# sourceMappingURL=cards.module.js.map