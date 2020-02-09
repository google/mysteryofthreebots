import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolveDialogComponent } from './solve-dialog.component';

describe('SolveDialogComponent', () => {
  let component: SolveDialogComponent;
  let fixture: ComponentFixture<SolveDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolveDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolveDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
