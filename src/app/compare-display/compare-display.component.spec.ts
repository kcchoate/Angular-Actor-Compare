import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareDisplayComponent } from './compare-display.component';

describe('CompareDisplayComponent', () => {
  let component: CompareDisplayComponent;
  let fixture: ComponentFixture<CompareDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompareDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompareDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
