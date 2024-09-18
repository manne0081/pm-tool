import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownBaseComponent } from './dropdown-base.component';

describe('DropdownBaseComponent', () => {
  let component: DropdownBaseComponent;
  let fixture: ComponentFixture<DropdownBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownBaseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DropdownBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
