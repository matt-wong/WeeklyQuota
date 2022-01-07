import { Input } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { quotaTopic } from '../week-table/week-table.model';

@Component({
  selector: 'app-import-export-text',
  templateUrl: './import-export-text.component.html',
  styleUrls: ['./import-export-text.component.scss']
})
export class ImportExportTextComponent implements OnInit {

  @Input() quotaData: quotaTopic[] = [];
  @Output() importNewDataEvent: EventEmitter<quotaTopic[]> = new EventEmitter();

  public jsonQuotaText: string = ''

  constructor() { }

  ngOnInit(): void {
  }

  onExport(){
    this.jsonQuotaText = JSON.stringify(this.quotaData);
  }

  onImport(){
    this.importNewDataEvent.emit(JSON.parse(this.jsonQuotaText));
  }

}
