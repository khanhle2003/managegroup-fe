import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoanVaoComponent } from './doan-vao.component';

describe('DoanVaoComponent', () => {
  let component: DoanVaoComponent;
  let fixture: ComponentFixture<DoanVaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoanVaoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DoanVaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
