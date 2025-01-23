import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InventoryService } from '../inventory.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
selector: 'app-purchase-modal',
standalone: true,
imports: [
CommonModule,
MatButtonModule,
MatCardModule,
NgxDatatableModule,
MatDialogModule,
MatIconModule,
MatFormFieldModule,
MatInputModule,
MatSelectModule,
FormsModule,
ReactiveFormsModule
],
templateUrl: './purchase-modal.component.html',
styleUrls: ['./purchase-modal.component.scss']
})
export class PurchaseModalComponent implements OnInit {
products: any[] = [];
suppliers: any[] = [];
purchaseForm!: FormGroup;

constructor(
private inventoryService: InventoryService,
public dialogRef: MatDialogRef<PurchaseModalComponent>,
@Inject(MAT_DIALOG_DATA) public data: any,
private fb: FormBuilder
) {}

ngOnInit(): void {
this.loadProducts();
this.loadSuppliers();
this.initForm();
}

loadProducts(): void {
    this.inventoryService.getProductList().subscribe((products: any) => {
    this.products = products;
    });
    }

    loadSuppliers(): void {
        this.inventoryService.getSupplierList().subscribe((suppliers: any) => {
        this.suppliers = suppliers;
        });
        }

initForm(): void {
this.purchaseForm = this.fb.group({
product_id: ['', Validators.required],
quantity: ['', [Validators.required, Validators.pattern('[+-]?([0-9]*[.])?[0-9]+')]],
totalAmount: ['', Validators.required],
supplier_id: ['', Validators.required]
});
}

addPurchase(): void {
    if (this.purchaseForm.valid) {
        const purchase = this.purchaseForm.value;
        console.log('Purchase data:', purchase); // Verifica los datos antes de enviarlos
        this.inventoryService.addPurchase(purchase).subscribe({
            next: response => {
                this.dialogRef.close(true);
            },
            error: error => {
                console.error('Error adding purchase:', error);
            }
        });
    }
}
}