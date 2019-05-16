import { LocationService } from './../service/location.service';
import { PastLocation } from './../location-dialog/domain/pastlocation';
import { CurrentLocation } from './../location-dialog/domain/currentlocation';
import { LocationChicklets } from './../location-dialog/domain/chicklets';
import { LocationSection } from './../location-dialog/domain/section';
import { States } from '../location-dialog/domain/states';
import { Component, OnInit , Inject } from '@angular/core';
import { FormGroup, FormArray, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Output } from '../outputclass/output';
import { TokenStorageService } from 'src/app/login/service/token-storage.service';
import { debounceTime, tap, switchMap, finalize, startWith, map } from 'rxjs/operators';
import { state } from '@angular/animations';
import { Observable } from 'rxjs';
import { RefreshService } from '../service/refresh.service';
import { LocationStrategy } from '@angular/common';
import { LocationdialogComponent } from '../location-dialog/locationdialog.component';
import { DownstreamBackendService } from '../../user-profile/downstream-backend.service';
import { SharedService } from '../service/shared.service';


@Component({
  selector: 'app-edit-location-dialog',
  templateUrl: './edit-location-dialog.component.html',
  styleUrls: ['./edit-location-dialog.component.css']
})
export class EditLocationDialogComponent extends LocationdialogComponent implements OnInit {
  public employeeData: any;
  constructor(@Inject(MAT_DIALOG_DATA) protected data: any,
      protected dialogRef: MatDialogRef<LocationdialogComponent>,
      protected locationService: LocationService, protected fb: FormBuilder,
      protected token: TokenStorageService,
      protected refreshService: RefreshService,
      private shared: SharedService,
      private downstreamBackendService: DownstreamBackendService) {
      super(data, dialogRef, locationService, fb, token, refreshService);
    }

    ngOnInit() {
      this.shared.subject.subscribe(data => this.employeeData = data);
      this.locationForm = this.fb.group({
        currentId: new FormControl(''),
        currentCityName: new FormControl(''),
        currentStateName: new FormControl(''),
        currentPincode: new FormControl(''),
        pastLocation: this.fb.array([this.initItemRow()])
      });
      this.dialogRef.afterClosed().subscribe(result => {
        this.refreshService.refreshProfile();
      });

      this.locationForm.get('currentCityName').valueChanges.pipe(
        debounceTime(300),
        tap(() => this.isLoading = true),
        switchMap(value =>
          this.locationService.searchcurrentcities({name: value}, 1)
        .pipe(
          finalize(() => this.isLoading = false),
          )
        )
      )
      .subscribe(response => this.filteredCurrentCityName = response.locations);

    this.temp = this.locationForm.get('pastLocation') as FormArray;
    this.temp.at(0).get('pastCityName').valueChanges.pipe(
      debounceTime(300),
      tap(() => this.isLoading1 = true),
      switchMap(value =>
        this.locationService.searchpastcities({name: value}, 1)
      .pipe(
        finalize(() => this.isLoading1 = false),
        )
      )
    )
    .subscribe(response => this.filteredPastCityName = response.locations);

      this.filteredOptions = this.locationForm.get('currentStateName').valueChanges
      .pipe(
        startWith<string | States>(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.options.slice())
      );

     this.temp2 = this.locationForm.get('pastLocation') as FormArray;
      this.filteredPastOptions = this.temp2.at(0).get('pastStateName').valueChanges
      .pipe(
        startWith<string | States>(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter1(name) : this.options.slice())
      );
    }

    protected _filter(name: string): States[] {
      const filterValue = name.toLowerCase();

      return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
    }

    initItemRow() {
      return this.fb.group({
        pastId: new FormControl(''),
        pastCityName: new FormControl(''),
        pastStateName: new FormControl(''),
        pastPincode: new FormControl('')
      });
    }

    onSave() {
      this.currentId = this.employeeData.currentLocationId;
      this.currentCityName = this.locationForm.get('currentCityName').value.name as string;
      this.currentStateName = this.locationForm.get('currentStateName').value.name as string;
      this.currentPincode = this.locationForm.get('currentPincode').value as string;
        const currentlocation = new CurrentLocation(this.currentId, this.currentCityName, this.currentStateName, this.currentPincode);
        const chicklets = new Array<LocationChicklets>();
        const pastLocations = new Array<PastLocation>();
        const chicklet = new LocationChicklets( currentlocation , pastLocations);
          console.log(chicklet);
          chicklets.push(chicklet);
        const locationSection = new LocationSection('Location', this.token.getEmail(), 'update', chicklets);
        this.downstreamBackendService.updateLocationDetails(locationSection)
          .subscribe(
            (data) => {
              console.log(data);
              this.dialogRef.close();
            },
            error => {
              this.errorMessage = error;
            }
          );

  }
}

