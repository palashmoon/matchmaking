import { FormArray } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  @ViewChild('container') container: ElementRef;

  name: string;
  temp: FormArray;
  email: string;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
  private dialogRef: MatDialogRef<PortfolioComponent>,
  private dialog: MatDialog) { }


  ngOnInit() {
  }
  onReciving(employee: any) {
      console.log(employee);
      this.name = employee.name;
      this.email = employee.email;
      console.log(this.name);
  }
  public downloadPDF() {
    var doc = new jsPDF("l", "mm", "a6");
    let specialElementHandlers = {
      '#editor':function(element, renderer)  {
        return true;
      }
    };

    let container= this.container.nativeElement;
    doc.fromHTML(container.innerHTML, 5, 0, {
     'width': 150,
     'elementHandlers': specialElementHandlers
    });
    doc.save('visiting-card.pdf');
    // return xepOnline.Formatter.format('container2', {render: 'download'});
  }
}
