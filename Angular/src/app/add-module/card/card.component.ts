import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DetailsdialogComponent } from '../details-dialog/detailsdialog.component';
// import { FormGroup, FormArray, FormControl, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '300px';
    this.dialog.open(DetailsdialogComponent, dialogConfig);
  }

}
