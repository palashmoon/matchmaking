import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from 'src/app/add-module/service/shared.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  employeesData: any;
  constructor(private shared: SharedService) { }

  ngOnInit() {
    this.shared.subject1.subscribe(data => this.employeesData = data);
    console.log('data comes %o', this.employeesData);
  }

}
