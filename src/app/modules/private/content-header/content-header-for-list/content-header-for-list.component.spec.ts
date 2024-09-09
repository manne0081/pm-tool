import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentHeaderForListComponent } from './content-header-for-list.component';

describe('ContentHeaderForListComponent', () => {
  let component: ContentHeaderForListComponent;
  let fixture: ComponentFixture<ContentHeaderForListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentHeaderForListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContentHeaderForListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
