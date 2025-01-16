import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoanRaComponent } from './doan-ra.component';

describe('DoanRaComponent', () => {
  let component: DoanRaComponent;
  let fixture: ComponentFixture<DoanRaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoanRaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DoanRaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
