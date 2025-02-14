import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserDvComponent } from './edit-user-dv.component';

describe('EditUserDvComponent', () => {
  let component: EditUserDvComponent;
  let fixture: ComponentFixture<EditUserDvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditUserDvComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditUserDvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
