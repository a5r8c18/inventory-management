import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InventoryService } from '../inventory.service';
import { PurchaseModalComponent } from '../purchase-modal/purchase-modal.component';
import { MenusComponent } from '../menus/menus.component';
import { MatCardModule } from '@angular/material/card';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PurchaseService } from '../purchase.service';

@Component({
selector: 'app-purchase',
standalone: true,
imports: [
CommonModule,
MatButtonModule,
MatDialogModule,
MatIconModule,
MatFormFieldModule,
MatInputModule,
MatSelectModule,
FormsModule,
ReactiveFormsModule,
MenusComponent,
MatCardModule,
NgxDatatableModule
],
templateUrl: './purchase.component.html',
styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent implements OnInit {
purchases: any[] = [];
products: any[] = [];
suppliers: any[] = [];
purchaseForm!: FormGroup;

@ViewChild('purchaseDialog') purchaseDialog!: TemplateRef<any>;

constructor(
private purchaseService: PurchaseService,
public dialog: MatDialog,
private fb: FormBuilder,
private inventoryService: InventoryService
) {}

ngOnInit(): void {
    this.loadPurchases();
    this.loadProducts();
    this.loadSuppliers();
    this.initForm();
    }



    loadPurchases(): void {
        this.purchaseService.getPurchases().subscribe({
          next: data => {
            this.purchases = data.map(purchase => ({
              ...purchase,
              purchaseDate: this.convertToLocalDate(purchase.purchaseDate)
            }));
            console.log('Purchases loaded:', this.purchases);
          },
          error: error => {
            console.error('Error loading purchases:', error);
          }
        });
      }
    
      convertToLocalDate(isoDate: string): string {
        const localDate = new Date(isoDate);
        return localDate.toLocaleString(); // Convierte a la zona horaria local y muestra en formato legible
      }

loadProducts(): void {
this.inventoryService.getProductList().subscribe(data => {
this.products = data;
console.log('Products loaded:', this.products); // Verifica que los productos se carguen
});
}

loadSuppliers(): void {
this.inventoryService.getSupplierList().subscribe(data => {
this.suppliers = data;
console.log('Suppliers loaded:', this.suppliers); // Verifica que los proveedores se carguen
});
}



    
initForm(): void {
this.purchaseForm = this.fb.group({
id: [''],
product: ['', Validators.required],
quantity: ['', [Validators.required, Validators.pattern('[+-]?([0-9]*[.])?[0-9]+')]],
totalAmount: ['', Validators.required],
supplier: ['', Validators.required]
});
}

openPurchaseDialog(): void {
this.dialog.open(this.purchaseDialog);
}

savePurchase(): void {
    if (this.purchaseForm.valid) {
        const purchase = this.purchaseForm.value;
        if (purchase.id) {
            this.purchaseService.updatePurchase(purchase.id, purchase).subscribe(() => {
                this.loadPurchases();
            });
        } else {
            this.purchaseService.addPurchase(purchase).subscribe(() => {
                this.loadPurchases();
            });
        }
        this.dialog.closeAll();
    }
}

deletePurchase(id: number): void {
this.purchaseService.deletePurchase(id).subscribe(() => {
this.loadPurchases();
});
}

updatePurchase(purchase: any): void {
this.purchaseForm.patchValue(purchase);
this.openPurchaseDialog();
}

openModal(): void {
const dialogRef = this.dialog.open(PurchaseModalComponent, {
width: '400px',
data: {
products: this.products,
suppliers: this.suppliers
}
});

dialogRef.afterClosed().subscribe(result => {
if (result) {
this.loadPurchases();
}
});
}
viewPurchase(id: number): void {
  this.purchaseService.getPurchaseById(id).subscribe((purchase: any) => {
  // Mostrar detalles de la compra en un modal
  });
  }
}