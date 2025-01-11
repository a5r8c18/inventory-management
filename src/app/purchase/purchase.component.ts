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
this.initForm();
}

loadPurchases(): void {
this.purchaseService.getPurchases().subscribe(purchases => {
this.purchases = purchases;
});
}

initForm(): void {
this.purchaseForm = this.fb.group({
id: [''],
product_id: ['', Validators.required],
quantity: ['', [Validators.required, Validators.pattern('[+-]?([0-9]*[.])?[0-9]+')]],
supplier_id: ['', Validators.required]
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
width: '400px'
});

dialogRef.afterClosed().subscribe(result => {
if (result) {
this.loadPurchases();
}
});
}
}