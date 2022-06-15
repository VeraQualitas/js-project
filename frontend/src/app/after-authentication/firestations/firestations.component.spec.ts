import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirestationsComponent } from './firestations.component';

describe('FirestationsComponent', () => {
  let component: FirestationsComponent;
  let fixture: ComponentFixture<FirestationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirestationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirestationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
