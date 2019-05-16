import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCertificateDialogComponent } from './edit-certificate-dialog.component';

describe('EditCertificateDialogComponent', () => {
  let component: EditCertificateDialogComponent;
  let fixture: ComponentFixture<EditCertificateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCertificateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCertificateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
