var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { LocationService } from './../service/location.service';
import { PastLocation } from './../location-dialog/domain/pastlocation';
import { CurrentLocation } from './../location-dialog/domain/currentlocation';
import { LocationChicklets } from './../location-dialog/domain/chicklets';
import { LocationSection } from './../location-dialog/domain/section';
import { Component, Inject } from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TokenStorageService } from 'src/app/login/service/token-storage.service';
import { debounceTime, tap, switchMap, finalize, startWith, map } from 'rxjs/operators';
var LocationdialogComponent = /** @class */ (function () {
    function LocationdialogComponent(data, dialogRef, locationService, fb, token) {
        this.data = data;
        this.dialogRef = dialogRef;
        this.locationService = locationService;
        this.fb = fb;
        this.token = token;
        this.filteredCurrentCityName = [];
        this.filteredPastCityName = [];
        this.isLoading = false;
        this.isLoading1 = false;
        this.options = [
            { name: 'andhra pradesh' },
            { name: 'arunachal pradesh' },
            { name: 'assam' },
            { name: 'bihar' },
            { name: 'chhattisgarh' },
            { name: 'goa' },
            { name: 'gujarat' },
            { name: 'haryana' },
            { name: 'himachal pradesh' },
            { name: 'jammu and kashmir' },
            { name: 'jharkhand' },
            { name: 'karnataka' },
            { name: 'kerala' },
            { name: 'madhya pradesh' },
            { name: 'maharashtra' },
            { name: 'manipur' },
            { name: 'meghalaya' },
            { name: 'mizoram' },
            { name: 'nagaland' },
            { name: 'odisha' },
            { name: 'punjab' },
            { name: 'rajasthan' },
            { name: 'sikkim' },
            { name: 'tamil nadu' },
            { name: 'telangana' },
            { name: 'tripura' },
            { name: 'uttar pradesh' },
            { name: 'uttarakhand' },
            { name: 'west bengal' }
        ];
        this.pastoptions = [
            { name: 'andhra pradesh' },
            { name: 'arunachal pradesh' },
            { name: 'assam' },
            { name: 'bihar' },
            { name: 'chhattisgarh' },
            { name: 'goa' },
            { name: 'gujarat' },
            { name: 'haryana' },
            { name: 'himachal pradesh' },
            { name: 'jammu and kashmir' },
            { name: 'jharkhand' },
            { name: 'karnataka' },
            { name: 'kerala' },
            { name: 'madhya pradesh' },
            { name: 'maharashtra' },
            { name: 'manipur' },
            { name: 'meghalaya' },
            { name: 'mizoram' },
            { name: 'nagaland' },
            { name: 'odisha' },
            { name: 'punjab' },
            { name: 'rajasthan' },
            { name: 'sikkim' },
            { name: 'tamil nadu' },
            { name: 'telangana' },
            { name: 'tripura' },
            { name: 'uttar pradesh' },
            { name: 'uttarakhand' },
            { name: 'west bengal' }
        ];
    }
    LocationdialogComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.locationForm = this.fb.group({
            currentId: new FormControl(''),
            currentCityName: new FormControl(''),
            currentStateName: new FormControl(''),
            currentPincode: new FormControl(''),
            pastLocation: this.fb.array([this.initItemRow()])
        });
        this.locationForm.get('currentCityName').valueChanges.pipe(debounceTime(300), tap(function () { return _this.isLoading = true; }), switchMap(function (value) {
            return _this.locationService.searchcurrentcities({ name: value }, 1)
                .pipe(finalize(function () { return _this.isLoading = false; }));
        }))
            .subscribe(function (response) { return _this.filteredCurrentCityName = response.locations; });
        this.temp = this.locationForm.get('pastLocation');
        this.temp.at(0).get('pastCityName').valueChanges.pipe(debounceTime(300), tap(function () { return _this.isLoading1 = true; }), switchMap(function (value) {
            return _this.locationService.searchpastcities({ name: value }, 1)
                .pipe(finalize(function () { return _this.isLoading1 = false; }));
        }))
            .subscribe(function (response) { return _this.filteredPastCityName = response.locations; });
        this.filteredOptions = this.locationForm.get('currentStateName').valueChanges
            .pipe(startWith(''), map(function (value) { return typeof value === 'string' ? value : value.name; }), map(function (name) { return name ? _this._filter(name) : _this.options.slice(); }));
        this.temp2 = this.locationForm.get('pastLocation');
        this.filteredPastOptions = this.temp2.at(0).get('pastStateName').valueChanges
            .pipe(startWith(''), map(function (value) { return typeof value === 'string' ? value : value.name; }), map(function (name) { return name ? _this._filter1(name) : _this.options.slice(); }));
    };
    LocationdialogComponent.prototype.displayFn2 = function (state) {
        return state ? state.name : undefined;
    };
    LocationdialogComponent.prototype._filter = function (name) {
        var filterValue = name.toLowerCase();
        return this.options.filter(function (option) { return option.name.toLowerCase().indexOf(filterValue) === 0; });
    };
    LocationdialogComponent.prototype.displayFn3 = function (state) {
        return state ? state.name : undefined;
    };
    LocationdialogComponent.prototype._filter1 = function (name) {
        var filterValue = name.toLowerCase();
        return this.pastoptions.filter(function (option) { return option.name.toLowerCase().indexOf(filterValue) === 0; });
    };
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
    LocationdialogComponent.prototype.displayFn = function (currentcity) {
        if (currentcity) {
            return currentcity.name;
        }
    };
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
    LocationdialogComponent.prototype.displayFn1 = function (pastcity) {
        if (pastcity) {
            return pastcity.name;
        }
    };
    LocationdialogComponent.prototype.initItemRow = function () {
        return this.fb.group({
            pastId: new FormControl(''),
            pastCityName: new FormControl(''),
            pastStateName: new FormControl(''),
            pastPincode: new FormControl('')
        });
    };
    LocationdialogComponent.prototype.addRow = function () {
        var control = this.locationForm.controls['pastLocation'];
        control.push(this.initItemRow());
    };
    LocationdialogComponent.prototype.deleteRow = function (index) {
        var control = this.locationForm.controls['pastLocation'];
        if (control != null) {
            this.totalRow = control.value.length;
        }
        if (this.totalRow > 1) {
            control.removeAt(index);
        }
        else {
            alert('Add one more details.');
            return false;
        }
    };
    LocationdialogComponent.prototype.onSave = function () {
        var _this = this;
        this.currentId = this.locationForm.get('currentId').value;
        this.currentCityName = this.locationForm.get('currentCityName').value.name;
        this.currentStateName = this.locationForm.get('currentStateName').value.name;
        this.currentPincode = this.locationForm.get('currentPincode').value;
        var arr = this.locationForm.get('pastLocation');
        var values = arr.value;
        var currentlocation = new CurrentLocation(this.currentId, this.currentCityName, this.currentStateName, this.currentPincode);
        var chicklets = new Array();
        var pastLocations = new Array();
        for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
            var row = values_1[_i];
            var pastlocation = new PastLocation(row.pastId, row.pastCityName.name, row.pastStateName.name, row.pastPincode);
            console.log(pastlocation);
            pastLocations.push(pastlocation);
            console.log(chicklets);
        }
        var chicklet = new LocationChicklets(currentlocation, pastLocations);
        console.log(chicklet);
        chicklets.push(chicklet);
        var section = new LocationSection('sectionId', this.token.getEmail(), 'add', chicklets);
        this.locationService.addLocationDetails(section).subscribe(function (data) {
            _this.output = data;
            console.log(_this.output);
            _this.dialogRef.close();
        }, function (error) {
            _this.errorMessage = error;
        });
    };
    LocationdialogComponent.prototype.onClose = function () {
        this.dialogRef.close();
    };
    LocationdialogComponent = __decorate([
        Component({
            selector: 'app-locationdialog',
            templateUrl: './locationdialog.component.html',
            styleUrls: ['./locationdialog.component.css']
        }),
        __param(0, Inject(MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [Object, MatDialogRef,
            LocationService, FormBuilder,
            TokenStorageService])
    ], LocationdialogComponent);
    return LocationdialogComponent;
}());
export { LocationdialogComponent };
//# sourceMappingURL=locationdialog.component.js.map