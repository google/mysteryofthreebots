import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewPaneComponent } from './interview-pane.component';

describe('InterviewPaneComponent', () => {
  let component: InterviewPaneComponent;
  let fixture: ComponentFixture<InterviewPaneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterviewPaneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewPaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
