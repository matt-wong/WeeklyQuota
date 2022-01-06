import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { QuotaPercentPipe } from '../pipes/quota-percent.pipe';
import { StatusFromItemPipe } from '../pipes/status-from-item.pipe';
import { IpcService } from '../services/ipc.service';

import { WeekTableComponent } from './week-table.component';

describe('WeekTableComponent', () => {
  let component: WeekTableComponent;
  let fixture: ComponentFixture<WeekTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatSnackBarModule, HttpClientModule],
      declarations: [ WeekTableComponent ],
      providers: [IpcService, QuotaPercentPipe, StatusFromItemPipe]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeekTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //TODO: Matt! Make some tests, idiot!
});
