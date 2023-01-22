import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-produtos-dialog',
  templateUrl: './produtos-dialog.component.html',
  styleUrls: ['./produtos-dialog.component.css']
})
export class ProdutosDialogComponent {
  
  constructor(
    public dialogRef: MatDialogRef<ProdutosDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  
  onCancel(): void {
    this.dialogRef.close();
  }

}


