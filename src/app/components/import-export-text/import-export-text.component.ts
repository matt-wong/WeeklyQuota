import { Input } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { quotaTopic } from '../week-table/week-table.model';
import {Clipboard} from '@angular/cdk/clipboard';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-import-export-text',
  templateUrl: './import-export-text.component.html',
  styleUrls: ['./import-export-text.component.scss']
})
export class ImportExportTextComponent implements OnInit {

  @Input() quotaData: quotaTopic[] = [];
  @Output() importNewDataEvent: EventEmitter<quotaTopic[]> = new EventEmitter();

  public jsonQuotaText: string = ''

  constructor(private clipboard: Clipboard, private snackBarService: MatSnackBar) { }

  ngOnInit(): void {
  }

  onExport(){
    this.jsonQuotaText = JSON.stringify(this.quotaData);
    this.clipboard.copy(this.jsonQuotaText);
    this.snackBarService.open('Data Copied to clipboard', 'Ok', { duration: 4000 });
  }

  onImport(){
    this.importNewDataEvent.emit(JSON.parse(this.jsonQuotaText));
  }

}
