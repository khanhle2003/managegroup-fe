import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetail2Component } from './user-detail2.component';

describe('UserDetail2Component', () => {
  let component: UserDetail2Component;
  let fixture: ComponentFixture<UserDetail2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDetail2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserDetail2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
