import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionCountryComponent } from './section-country.component';

describe('SectionCountryComponent', () => {
  let component: SectionCountryComponent;
  let fixture: ComponentFixture<SectionCountryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionCountryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SectionCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
