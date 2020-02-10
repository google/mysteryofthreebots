import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncorrectSolutionDialogComponent } from './incorrect-solution-dialog.component';

describe('IncorrectSolutionDialogComponent', () => {
  let component: IncorrectSolutionDialogComponent;
  let fixture: ComponentFixture<IncorrectSolutionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncorrectSolutionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncorrectSolutionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
