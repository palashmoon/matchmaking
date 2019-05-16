import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsdialogComponent } from './detailsdialog.component';

describe('DetailsdialogComponent', () => {
  let component: DetailsdialogComponent;
  let fixture: ComponentFixture<DetailsdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
