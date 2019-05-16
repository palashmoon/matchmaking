import { Component, OnInit, Input, Inject } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { MatDialogConfig, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { ProfileComponent } from '../profile/profile.component';
import { SharedService } from 'src/app/add-module/service/shared.service';


@Component({
  selector: 'app-display-cards',
  templateUrl: './display-cards.component.html',
  styleUrls: ['./display-cards.component.css']
})
export class DisplayCardsComponent implements OnInit {

  @Input() employeeName:any;
  @Input() email:any;
  @Input() skills:any;
  @Input() location:any;
  @Input() employees: any;

  constructor(
  private dialog: MatDialog,
  private shared: SharedService
  ) { }

  ngOnInit() {
  }
  viewProfile() {
    this.shared.subject1.next(this.employees);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '95%';
    this.dialog.open(ProfileComponent, dialogConfig);
  }
}
