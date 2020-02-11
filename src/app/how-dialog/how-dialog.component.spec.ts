import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HowDialogComponent } from './how-dialog.component';

describe('HowDialogComponent', () => {
  let component: HowDialogComponent;
  let fixture: ComponentFixture<HowDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HowDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HowDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
