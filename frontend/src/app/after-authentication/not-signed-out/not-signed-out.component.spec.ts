import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotSignedOutComponent } from './not-signed-out.component';

describe('NotSignedOutComponent', () => {
  let component: NotSignedOutComponent;
  let fixture: ComponentFixture<NotSignedOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotSignedOutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotSignedOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
