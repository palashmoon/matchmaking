import { async, TestBed } from '@angular/core/testing';
import { EditSkillDialogComponent } from './edit-skill-dialog.component';
describe('EditSkillDialogComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [EditSkillDialogComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(EditSkillDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=edit-skill-dialog.component.spec.js.map