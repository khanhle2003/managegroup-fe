import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Trip2Component } from './trip2.component';

describe('Trip2Component', () => {
  let component: Trip2Component;
  let fixture: ComponentFixture<Trip2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Trip2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Trip2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
