import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { InventoryService } from '../inventory.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

@Component({
selector: 'app-purchase-modal',
standalone: true,
imports: [
MatButtonModule,
MatCardModule,
NgxDatatableModule,
MatDialogModule,
MatIconModule,
MatFormFieldModule,
MatInputModule,
MatSelectModule,
FormsModule
],
templateUrl: './purchase-modal.component.html',
styleUrls: ['./purchase-modal.component.scss']
})
export class PurchaseModalComponent {
constructor(
private inventoryService: InventoryService,
public dialogRef: MatDialogRef<PurchaseModalComponent>
) {}

addPurchase(purchaseData: any): void {
this.inventoryService.addPurchase(purchaseData).subscribe(response => {
// Handle response
this.dialogRef.close(true);
});
}
}