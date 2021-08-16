import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportExportTextComponent } from './import-export-text.component';

describe('ImportExportTextComponent', () => {
  let component: ImportExportTextComponent;
  let fixture: ComponentFixture<ImportExportTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportExportTextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportExportTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
