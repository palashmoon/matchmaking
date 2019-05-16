import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { MaterialModule } from 'src/app/login/login-module/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { SpeechModule } from '../lib';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DisplayCardsComponent } from './display-cards/display-cards.component';
import { MatCardModule, MatDialogContent, MatDialogModule } from '@angular/material';
import { NgbCollapse, NgbCollapseModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProfileComponent } from './profile/profile.component';
@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    BrowserModule,
    SpeechModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    NgbModule,
    MatDialogModule
  ],
  providers: [
    { provide: 'SPEECH_LANG', useValue: 'en-US' }
  ],
  declarations: [SearchComponent,DisplayCardsComponent, ProfileComponent],
  entryComponents:[DisplayCardsComponent,ProfileComponent]
})
export class SearchModule { }
