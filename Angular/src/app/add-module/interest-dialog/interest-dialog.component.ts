import { InterestService } from './../service/interest.service';
import { Component, OnInit, Inject, Renderer2 } from '@angular/core';

// import { InterestsService } from 'src/app/cards/service/interests.service';
import { Output } from './domain/output';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormArray, FormControl, FormBuilder, Validators } from '@angular/forms';
import { InterestsSection } from './domain/section';
import { Chicklets } from './domain/chicklets';
import { TokenStorageService } from 'src/app/login/service/token-storage.service';
import { RefreshService } from '../service/refresh.service';


@Component({
  selector: 'app-interest-dialog',
  templateUrl: './interest-dialog.component.html',
  styleUrls: ['./interest-dialog.component.css']
})
export class InterestDialogComponent implements OnInit {

  interestsForm: FormGroup;
  interest: string;
  errorMessage: string;
  totalRow: number;
  output: Output;
  // constructor(@Inject(MAT_DIALOG_DATA) private data: any,
  //   private dialogRef: MatDialogRef<InterestsDialogComponent>,
  //   private interestsService: InterestsService, private fb: FormBuilder) {
  // }

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<InterestDialogComponent>,
    private fb: FormBuilder,
    private token: TokenStorageService,
    private interestService: InterestService,
    private refreshService: RefreshService) {

  }

  ngOnInit() {
    this.interestsForm = this.fb.group({
      interests: this.fb.array([this.initItemRow()])
    });
    this.dialogRef.afterClosed().subscribe(result => {
      this.refreshService.refreshProfile();
    });
  }

  initItemRow() {
    return this.fb.group({
      interest: new FormControl('', Validators.required)
    });
  }
  addRow() {
    const control = <FormArray>this.interestsForm.controls['interests'];
    control.push(this.initItemRow());
  }

  deleteRow(index: number) {
    const control = <FormArray>this.interestsForm.controls['interests'];
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
    const arr = this.interestsForm.get('interests') as FormArray;
    const chicklets = new Array<Chicklets>();
    for (let i = 0; i < arr.length; i++) {
      const row = arr.at(i);
      const chicklet = new Chicklets(row.value.interest);
      chicklets.push(chicklet);
    }


    const section = new InterestsSection('Interests', this.token.getEmail(), 'add', chicklets);


    this.interestService.addInterestsDetails(section).subscribe(
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
