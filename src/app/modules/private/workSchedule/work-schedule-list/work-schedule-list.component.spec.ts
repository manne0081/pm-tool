import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkScheduleListComponent } from './work-schedule-list.component';

describe('WorkScheduleListComponent', () => {
  let component: WorkScheduleListComponent;
  let fixture: ComponentFixture<WorkScheduleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkScheduleListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkScheduleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
