import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { SupplierService } from '../supplier.service';

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
constructor(
public dialogRef: MatDialogRef<SupplierModalComponent>,
private supplierService: SupplierService
) {}

addSupplier(supplierData: any): void {
    if (supplierData.name && supplierData.mobile && supplierData.address) {
    const supplier = {
    name: supplierData.name,
    mobile: supplierData.mobile,
    address: supplierData.address
    };
    console.log('Supplier data:', supplier); // Verifica los datos aquí
    this.supplierService.addSupplier(supplier).subscribe({
    next: () => {
    this.dialogRef.close(true);
    },
    error: (error) => {
    console.error('Error adding supplier:', error);
    }
    });
    } else {
    console.error('Supplier data is invalid:', supplierData);
    }
    }
}