import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaSelectorComponent as MediaSelectorComponent } from './media-selector.component';

describe('MediaSelectorComponent', () => {
  let component: MediaSelectorComponent;
  let fixture: ComponentFixture<MediaSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediaSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
