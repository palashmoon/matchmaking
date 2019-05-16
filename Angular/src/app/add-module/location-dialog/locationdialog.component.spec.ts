import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationdialogComponent } from './locationdialog.component';

describe('LocationdialogComponent', () => {
  let component: LocationdialogComponent;
  let fixture: ComponentFixture<LocationdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
