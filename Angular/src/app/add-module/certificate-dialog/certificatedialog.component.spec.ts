import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificatedialogComponent } from './certificatedialog.component';

describe('CertificatedialogComponent', () => {
  let component: CertificatedialogComponent;
  let fixture: ComponentFixture<CertificatedialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CertificatedialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificatedialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
