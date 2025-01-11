import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
selector: 'app-supplier-modal',
templateUrl: './supplier-modal.component.html',
styleUrls: ['./supplier-modal.component.scss'],
standalone: true,
imports: [
CommonModule,
FormsModule,
MatFormFieldModule,
MatInputModule,
MatButtonModule,
MatSelectModule,
MatDialogContent,
MatDialogActions
]
})
export class SupplierModalComponent {
constructor(public dialogRef: MatDialogRef<SupplierModalComponent>) {}

addSupplier(supplierData: any): void {
// Handle add supplier logic
this.dialogRef.close(true);
}
}