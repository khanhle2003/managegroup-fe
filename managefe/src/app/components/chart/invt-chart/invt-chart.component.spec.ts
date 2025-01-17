import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvtChartComponent } from './invt-chart.component';

describe('InvtChartComponent', () => {
  let component: InvtChartComponent;
  let fixture: ComponentFixture<InvtChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvtChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InvtChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
