import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotaHeaderComponent } from './quota-header.component';

describe('QuotaHeaderComponent', () => {
  let component: QuotaHeaderComponent;
  let fixture: ComponentFixture<QuotaHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuotaHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotaHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
