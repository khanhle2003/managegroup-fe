import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportExcel2Component } from './import-excel2.component';

describe('ImportExcel2Component', () => {
  let component: ImportExcel2Component;
  let fixture: ComponentFixture<ImportExcel2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImportExcel2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImportExcel2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
