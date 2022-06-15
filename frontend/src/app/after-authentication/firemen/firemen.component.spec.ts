import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiremenComponent } from './firemen.component';

describe('FiremenComponent', () => {
  let component: FiremenComponent;
  let fixture: ComponentFixture<FiremenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiremenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiremenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
