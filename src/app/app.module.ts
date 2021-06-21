import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeekTableComponent } from './week-table/week-table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import { QuotaFractionPipe } from './quota-fraction.pipe';
import {MatSelectModule} from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import { MatProgressBarModule} from '@angular/material/progress-bar';
import { QuotaPercentPipe } from './quota-percent.pipe'
import { SaveAndLoadService } from './services/save-and-load.service';
import { IpcService } from './services/ipc.service';


@NgModule({
  declarations: [
    AppComponent,
    WeekTableComponent,
    QuotaFractionPipe,
    QuotaPercentPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    MatSelectModule,
    MatProgressBarModule,
    MatInputModule,
    MatSnackBarModule
  ],
  providers: [QuotaPercentPipe, SaveAndLoadService, IpcService],
  bootstrap: [AppComponent]
})
export class AppModule { }
