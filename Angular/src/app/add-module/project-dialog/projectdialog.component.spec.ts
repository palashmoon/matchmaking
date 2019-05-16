import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectdialogComponent } from './projectdialog.component';

describe('ProjectdialogComponent', () => {
  let component: ProjectdialogComponent;
  let fixture: ComponentFixture<ProjectdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
