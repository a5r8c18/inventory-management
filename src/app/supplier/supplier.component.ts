import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SupplierService } from '../supplier.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MenusComponent } from '../menus/menus.component';
import { SupplierModalComponent } from '../supplier-modal/supplier-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
selector: 'app-supplier',
templateUrl: './supplier.component.html',
styleUrls: ['./supplier.component.scss'],
standalone: true,
imports: [
CommonModule,
MatButtonModule,
MatCardModule,
MatDialogModule,
MatIconModule,
MenusComponent,
MatFormFieldModule,
MatInputModule,
ReactiveFormsModule,
NgxDatatableModule
],
})
export class SupplierComponent implements OnInit {
suppliers: any[] = [];
columns: any[] = [];
dataSource: any[] = [];
supplierForm!: FormGroup; // Definir correctamente el formulario

@ViewChild('supplierDialog') supplierDialog!: TemplateRef<any>;
@ViewChild('actionTemplate') actionTemplate!: TemplateRef<any>;

constructor(private supplierService: SupplierService, public dialog: MatDialog, private fb: FormBuilder) {}

ngOnInit(): void {
this.loadSuppliers();
this.initForm();
this.columns = [
{ prop: 'id', name: 'ID' },
{ prop: 'name', name: 'Nombre del proveedor' },
{ prop: 'address', name: 'Dirección' },
{ prop: 'mobile', name: 'Teléfono' },
{ name: 'Action', cellTemplate: this.actionTemplate }
];
}

loadSuppliers(): void {
this.supplierService.getSuppliers().subscribe((suppliers: any) => {
this.suppliers = suppliers;
this.dataSource = suppliers; // Actualizar dataSource con los datos de suppliers
});
}

initForm(): void {
this.supplierForm = this.fb.group({
id: [''],
name: ['', Validators.required],
address: ['', Validators.required],
mobile: ['', Validators.required]
});
}

openSupplierDialog(): void {
this.dialog.open(this.supplierDialog);
}

saveSupplier(): void {
if (this.supplierForm.valid) {
const supplier = this.supplierForm.value;
if (supplier.id) {
this.supplierService.updateSupplier(supplier.id, supplier).subscribe(() => {
this.loadSuppliers();
});
} else {
this.supplierService.addSupplier(supplier).subscribe(() => {
this.loadSuppliers();
});
}
this.dialog.closeAll();
}
}

deleteSupplier(id: number): void {
    this.supplierService.deleteSupplier(id).subscribe(() => {
    this.loadSuppliers();
    });
    }
    
    updateSupplier(supplier: any): void {
    this.supplierForm.patchValue(supplier);
    this.openSupplierDialog();
    }
    
    openAddSupplierModal(): void {
    this.supplierForm.reset();
    this.openSupplierDialog();
    }
}
