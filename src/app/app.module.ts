import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeekTableComponent } from './components/week-table/week-table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import { MatProgressBarModule} from '@angular/material/progress-bar';
import { SaveAndLoadService } from './services/save-and-load.service';
import { IpcService } from './services/ipc.service';
import { ValueSelectorComponent } from './components/value-selector/value-selector.component';
import { ImportExportTextComponent } from './components/import-export-text/import-export-text.component';
import { QuotaPercentPipe } from './pipes/quota-percent.pipe';
import { QuotaPlanPercentPipe } from './pipes/quota-plan-percent.pipe';
import { QuotaFractionPipe } from './pipes/quota-fraction.pipe';
import { StatusFromItemPipe } from './pipes/status-from-item.pipe';
import {MatTooltipModule} from '@angular/material/tooltip';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { WeatherDisplayComponent } from './components/weather-display/weather-display.component';

@NgModule({
  declarations: [
    AppComponent,
    WeekTableComponent,
    QuotaFractionPipe,
    QuotaPercentPipe,
    ValueSelectorComponent,
    QuotaPlanPercentPipe,
    ImportExportTextComponent,
    StatusFromItemPipe,
    WeatherDisplayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    MatSelectModule,
    MatProgressBarModule,
    MatInputModule,
    MatSnackBarModule,
    MatTooltipModule,
    HttpClientModule
  ],
  providers: [QuotaPercentPipe, SaveAndLoadService, IpcService, StatusFromItemPipe, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
