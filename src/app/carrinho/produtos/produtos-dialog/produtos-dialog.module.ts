import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProdutosDialogComponent } from './produtos-dialog.component';
import { MaterialModule } from 'src/app/material/material.module';
  
@NgModule({
  declarations: [ProdutosDialogComponent],
  entryComponents: [ProdutosDialogComponent],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [ProdutosDialogComponent]
})
export class ProdutosDialogModule {}