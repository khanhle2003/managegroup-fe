import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseyearComponent } from './chooseyear.component';

describe('ChooseyearComponent', () => {
  let component: ChooseyearComponent;
  let fixture: ComponentFixture<ChooseyearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChooseyearComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChooseyearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
