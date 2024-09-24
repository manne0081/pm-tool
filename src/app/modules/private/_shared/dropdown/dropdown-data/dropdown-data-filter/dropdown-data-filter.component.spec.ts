import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownDataFilterComponent } from './dropdown-data-filter.component';

describe('DropdownDataFilterComponent', () => {
  let component: DropdownDataFilterComponent;
  let fixture: ComponentFixture<DropdownDataFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownDataFilterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DropdownDataFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
