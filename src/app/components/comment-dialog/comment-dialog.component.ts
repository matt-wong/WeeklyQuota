import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { quotaTopic } from '../week-table/week-table.model';



@Component({
  selector: 'app-comment-dialog',
  templateUrl: './comment-dialog.component.html',
  styleUrls: ['./comment-dialog.component.scss']
})
export class CommentDialogComponent {

  public comment: string;

  constructor(
    public dialogRef: MatDialogRef<CommentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: quotaTopic
  ) {
    this.comment = data.weekComment ?? '';
  }

  // onNoClick(): void {
  //   this.dialogRef.close();
  // }

}
