import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownDataSortComponent } from './dropdown-data-sort.component';

describe('DropdownDataSortComponent', () => {
  let component: DropdownDataSortComponent;
  let fixture: ComponentFixture<DropdownDataSortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownDataSortComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DropdownDataSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
