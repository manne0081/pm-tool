import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentHeaderForDetailComponent } from './content-header-for-detail.component';

describe('ContentHeaderForDetailComponent', () => {
  let component: ContentHeaderForDetailComponent;
  let fixture: ComponentFixture<ContentHeaderForDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentHeaderForDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContentHeaderForDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
