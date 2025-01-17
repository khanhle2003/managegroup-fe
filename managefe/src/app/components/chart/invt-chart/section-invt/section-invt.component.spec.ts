import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionInvtComponent } from './section-invt.component';

describe('SectionInvtComponent', () => {
  let component: SectionInvtComponent;
  let fixture: ComponentFixture<SectionInvtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionInvtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SectionInvtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
