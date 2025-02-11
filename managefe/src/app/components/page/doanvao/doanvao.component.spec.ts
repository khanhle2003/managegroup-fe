import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoanvaoComponent } from './doanvao.component';

describe('DoanvaoComponent', () => {
  let component: DoanvaoComponent;
  let fixture: ComponentFixture<DoanvaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoanvaoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DoanvaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
