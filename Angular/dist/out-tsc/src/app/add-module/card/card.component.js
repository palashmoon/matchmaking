var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DetailsdialogComponent } from '../details-dialog/detailsdialog.component';
// import { FormGroup, FormArray, FormControl, FormBuilder, Validators } from '@angular/forms';
var CardComponent = /** @class */ (function () {
    function CardComponent(dialog) {
        this.dialog = dialog;
    }
    CardComponent.prototype.ngOnInit = function () {
    };
    CardComponent.prototype.openDialog = function () {
        var dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '30%';
        this.dialog.open(DetailsdialogComponent, dialogConfig);
    };
    CardComponent = __decorate([
        Component({
            selector: 'app-card',
            templateUrl: './card.component.html',
            styleUrls: ['./card.component.css']
        }),
        __metadata("design:paramtypes", [MatDialog])
    ], CardComponent);
    return CardComponent;
}());
export { CardComponent };
//# sourceMappingURL=card.component.js.map