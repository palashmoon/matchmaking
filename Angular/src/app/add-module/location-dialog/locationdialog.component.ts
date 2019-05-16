import { LocationService } from './../service/location.service';
import { PastLocation } from './../location-dialog/domain/pastlocation';
import { CurrentLocation } from './../location-dialog/domain/currentlocation';
import { LocationChicklets } from './../location-dialog/domain/chicklets';
import { LocationSection } from './../location-dialog/domain/section';

import { Component, OnInit , Inject } from '@angular/core';
import { FormGroup, FormArray, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Output } from '../outputclass/output';
import { TokenStorageService } from 'src/app/login/service/token-storage.service';
import { Currentcities } from './domain/currentcities';
import { Pastcities } from './domain/pastcities';
import { debounceTime, tap, switchMap, finalize, startWith, map } from 'rxjs/operators';
import { state } from '@angular/animations';
import { Observable } from 'rxjs';
import { States } from './domain/states';
import { Paststates } from './domain/paststates';
import { RefreshService } from '../service/refresh.service';
import { Md5 } from 'ts-md5';

@Component({
  selector: 'app-locationdialog',
  templateUrl: './locationdialog.component.html',
  styleUrls: ['./locationdialog.component.css']
})
export class LocationdialogComponent implements OnInit {
    locationForm: FormGroup;
    filteredCurrentCityName: Currentcities[] = [];
    filteredPastCityName: Pastcities[] = [];
    isLoading = false;
    isLoading1 = false;
    output: Output;
    currentId: string;
    currentCityName: string;
    currentStateName: string;
    currentPincode: string;
    pastId: string;
    pastCityName: string;
    pastStateName: string;
    pastPincode: string;
    // currentlocation: string;
    // pastlocation: string;
    errorMessage: string;
    totalRow: number;
    temp: FormArray;
    temp2: FormArray;
    options: States[] = [
      {name: 'andhra pradesh' },
      {name: 'arunachal pradesh' },
      {name: 'assam' },
      {name: 'bihar' },
      {name: 'chhattisgarh' },
      {name: 'goa' },
      {name: 'gujarat' },
      {name: 'haryana' },
      {name: 'himachal pradesh' },
      {name: 'jammu and kashmir' },
      {name: 'jharkhand' },
      {name: 'karnataka' },
      {name: 'kerala' },
      {name: 'madhya pradesh' },
      {name: 'maharashtra' },
      {name: 'manipur' },
      {name: 'meghalaya' },
      {name: 'mizoram' },
      {name: 'nagaland' },
      {name: 'odisha' },
      {name: 'punjab' },
      {name: 'rajasthan' },
      {name: 'sikkim' },
      {name: 'tamil nadu' },
      {name: 'telangana' },
      {name: 'tripura' },
      {name: 'uttar pradesh' },
      {name: 'uttarakhand' },
      {name: 'west bengal' }
    ];
    pastoptions: Paststates[] = [
      {name: 'andhra pradesh' },
      {name: 'arunachal pradesh' },
      {name: 'assam' },
      {name: 'bihar' },
      {name: 'chhattisgarh' },
      {name: 'goa' },
      {name: 'gujarat' },
      {name: 'haryana' },
      {name: 'himachal pradesh' },
      {name: 'jammu and kashmir' },
      {name: 'jharkhand' },
      {name: 'karnataka' },
      {name: 'kerala' },
      {name: 'madhya pradesh' },
      {name: 'maharashtra' },
      {name: 'manipur' },
      {name: 'meghalaya' },
      {name: 'mizoram' },
      {name: 'nagaland' },
      {name: 'odisha' },
      {name: 'punjab' },
      {name: 'rajasthan' },
      {name: 'sikkim' },
      {name: 'tamil nadu' },
      {name: 'telangana' },
      {name: 'tripura' },
      {name: 'uttar pradesh' },
      {name: 'uttarakhand' },
      {name: 'west bengal' }
    ];
    filteredPastOptions: Observable<Paststates[]>;
    filteredOptions: Observable<States[]>;
    constructor(@Inject(MAT_DIALOG_DATA) protected data: any,
      protected dialogRef: MatDialogRef<LocationdialogComponent>,
      protected locationService: LocationService, protected fb: FormBuilder,
      protected token: TokenStorageService,
      protected refreshService: RefreshService) {
    }

    ngOnInit() {
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

    displayFn2(state?: States): string | undefined {
      return state ? state.name : undefined;
    }

    protected _filter(name: string): States[] {
      const filterValue = name.toLowerCase();

      return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
    }

    displayFn3(state?: Paststates): string | undefined {
      return state ? state.name : undefined;
    }

    protected _filter1(name: string): States[] {
      const filterValue = name.toLowerCase();

      return this.pastoptions.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
    }

  //   onKeyUp(index: number) {
  //     this.locationForm.get('currentCityName').valueChanges.pipe(
  //       debounceTime(300),
  //       tap(() => this.isLoading = true),
  //       switchMap(value =>
  //         this.locationService.searchcurrentcities({name: value}, 1)
  //       .pipe(
  //         finalize(() => this.isLoading = false),
  //         )
  //       )
  //     )
  //     .subscribe(response => this.filteredCurrentCityName = response.locations);
  //  }

  displayFn(currentcity: Currentcities) {
    if (currentcity) {
      return currentcity.name; }
  }

//   onKeyUp1(index: number) {
//     this.temp = this.locationForm.get('pastLocation') as FormArray;
//     this.temp.at(index).get('pastCityName').valueChanges.pipe(
//       debounceTime(300),
//       tap(() => this.isLoading1 = true),
//       switchMap(value =>
//         this.locationService.searchpastcities({name: value}, 1)
//       .pipe(
//         finalize(() => this.isLoading1 = false),
//         )
//       )
//     )
//     .subscribe(response => this.filteredPastCityName = response.locations);
//  }
displayFn1(pastcity: Pastcities) {
  if (pastcity) {
    return pastcity.name; }
}
    initItemRow() {
      return this.fb.group({
        pastId: new FormControl(''),
        pastCityName: new FormControl(''),
        pastStateName: new FormControl(''),
        pastPincode: new FormControl('')
      });
    }
    addRow() {
      const control = <FormArray>this.locationForm.controls['pastLocation'];
      control.push(this.initItemRow());
    }
    deleteRow(index: number) {
      const control = <FormArray>this.locationForm.controls['pastLocation'];
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

    this.currentPincode = this.locationForm.get('currentPincode').value as string;
    if (this.locationForm.get('currentCityName').value.name === undefined) {
      this.currentCityName = this.locationForm.get('currentCityName').value as string;
    } else {
      this.currentCityName = this.locationForm.get('currentCityName').value.name as string;
    }

    if (this.locationForm.get('currentCityName').value.id === undefined) {
      this.currentId = Md5.hashStr(this.token.getEmail() + this.locationForm.get('currentId').value as string, false).toString();
    } else {
      this.currentId = this.locationForm.get('currentCityName').value.id as string;
    }

    if (this.locationForm.get('currentStateName').value.name === undefined) {
      this.currentStateName = this.locationForm.get('currentStateName').value as string;
    } else {
      this.currentStateName = this.locationForm.get('currentStateName').value.name as string;
    }
      const arr = this.locationForm.get('pastLocation') as FormArray;
      const values = arr.value;
      const currentlocation = new CurrentLocation(this.currentId, this.currentCityName, this.currentStateName, this.currentPincode);
      const chicklets = new Array<LocationChicklets>();
      const pastLocations = new Array<PastLocation>();
      for (const row of values) {
        let pastlocation;
        if (row.pastCityName.name === undefined && row.pastStateName.name === undefined) {
          pastlocation = new PastLocation(
            Md5.hashStr(this.token.getEmail() + row.pastCityName).toString() ,
            row.pastCityName, row.pastStateName , row.pastPincode);
        } else if (row.pastCityName.name === undefined && row.pastStateName.name !== undefined) {
          pastlocation = new PastLocation(
            Md5.hashStr(this.token.getEmail() + row.pastCityName).toString() ,
            row.pastCityName, row.pastStateName.name , row.pastPincode);
        } else if (row.pastCityName.name !== undefined && row.pastStateName.name === undefined) {
          pastlocation = new PastLocation(
            row.pastCityName.id , row.pastCityName.name, row.pastStateName , row.pastPincode);
        } else {
          pastlocation = new PastLocation(
            row.pastCityName.id , row.pastCityName.name, row.pastStateName.name , row.pastPincode);
        }
          console.log(pastlocation);
        pastLocations.push(pastlocation);
        console.log(chicklets);
      }
      const chicklet = new LocationChicklets( currentlocation , pastLocations);
        console.log(chicklet);
        chicklets.push(chicklet);

      const section = new LocationSection('Location', this.token.getEmail(), 'add', chicklets);
      this.locationService.addLocationDetails(section).subscribe(
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
