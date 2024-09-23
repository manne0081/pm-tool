import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogQuicklinkChangeComponent } from './dialog-quicklink-change.component';

describe('DialogQuicklinkChangeComponent', () => {
  let component: DialogQuicklinkChangeComponent;
  let fixture: ComponentFixture<DialogQuicklinkChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogQuicklinkChangeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogQuicklinkChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
