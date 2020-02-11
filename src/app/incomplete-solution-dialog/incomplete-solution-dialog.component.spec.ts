import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncompleteSolutionDialogComponent } from './incomplete-solution-dialog.component';

describe('IncompleteSolutionDialogComponent', () => {
  let component: IncompleteSolutionDialogComponent;
  let fixture: ComponentFixture<IncompleteSolutionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncompleteSolutionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncompleteSolutionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
