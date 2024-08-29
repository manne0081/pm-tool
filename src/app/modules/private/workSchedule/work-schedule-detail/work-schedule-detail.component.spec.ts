import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkScheduleDetailComponent } from './work-schedule-detail.component';

describe('WorkScheduleDetailComponent', () => {
  let component: WorkScheduleDetailComponent;
  let fixture: ComponentFixture<WorkScheduleDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkScheduleDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkScheduleDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
