import { BasicInfoComponent } from './../info/basic-info/basic-info.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeDashboardDummyComponent } from './employee-dashboard-smart/employee-dashboard-dummy/employee-dashboard-dummy.component';
import { EmployeeDashboardSmartComponent } from './employee-dashboard-smart/employee-dashboard-smart.component';
import { BrowserModule } from '@angular/platform-browser';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, MatButtonModule} from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardsModule } from '../add-module/cards.module';
import { MaterialModule } from '../login/login-module/material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InfoModule } from './../info/info.module';
import { PortfolioComponent } from './employee-dashboard-smart/portfolio/portfolio.component';
import { ResumeComponent } from './employee-dashboard-smart/resume/resume.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    LayoutModule,
    CardsModule,
    MaterialModule,
    NgbModule,
    MatProgressBarModule,
    InfoModule
  ],
  declarations: [
    EmployeeDashboardDummyComponent,
    EmployeeDashboardSmartComponent,
    PortfolioComponent , ResumeComponent
  ],
  entryComponents: [BasicInfoComponent , PortfolioComponent , ResumeComponent],
  providers: []
})
export class UserProfileModule { }
