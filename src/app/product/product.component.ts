import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../product.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { InventoryService } from '../inventory.service';
import { MenusComponent } from '../menus/menus.component';
import { MatCardModule } from '@angular/material/card';

@Component({
selector: 'app-product',
standalone: true,
imports: [
CommonModule,
MatButtonModule,
MatDialogModule,
MatFormFieldModule,
MatInputModule,
MatSelectModule,
MatIconModule,
FormsModule,
ReactiveFormsModule,
NgxDatatableModule,
MenusComponent,
MatCardModule,
],
templateUrl: './product.component.html',
styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
products: any[] = [];
categories: any[] = [];
brands: any[] = [];
suppliers: any[] = [];
productForm!: FormGroup;

@ViewChild('productDialog') productDialog!: TemplateRef<any>;

constructor(
private productService: ProductService,
private fb: FormBuilder,
private inventoryService: InventoryService,
public dialog: MatDialog
) {}

ngOnInit(): void {
this.loadProducts();
this.loadCategories();
this.loadBrands();
this.loadSuppliers();
this.initForm();
}

loadProducts(): void {
this.productService.getProducts().subscribe((products: any) => {
this.products = products;
});
}

loadCategories(): void {
this.inventoryService.getCategoryList().subscribe((categories: any) => {
this.categories = categories;
});
}

loadBrands(): void {
this.inventoryService.getBrandList().subscribe((brands: any) => {
this.brands = brands;
});
}

loadSuppliers(): void {
this.inventoryService.getSupplierList().subscribe((suppliers: any) => {
this.suppliers = suppliers;
});
}

initForm(): void {
this.productForm = this.fb.group({
id: [''],
category: [null, Validators.required],
brand: ['', Validators.required],
name: ['', Validators.required],
model: ['', Validators.required],
description: ['', Validators.required],
quantity: ['', [Validators.required, Validators.pattern('[+-]?([0-9]*[.])?[0-9]+')]],
unit: ['', Validators.required],
base_price: ['', [Validators.required, Validators.pattern('[+-]?([0-9]*[.])?[0-9]+')]],
tax: ['', [Validators.required, Validators.pattern('[+-]?([0-9]*[.])?[0-9]+')]],
supplier: ['', Validators.required]
});
}

openProductDialog(): void {
this.dialog.open(this.productDialog);
}

saveProduct(): void {
if (this.productForm.valid) {
const product = this.productForm.value;
product.category = product.category.id; // Asegúrate de enviar solo el ID de la categoría
product.brand = product.brand.id; // Asegúrate de enviar solo el ID de la marca
product.supplier = product.supplier.id; // Asegúrate de enviar solo el ID del proveedor

// Manejo de valores nulos o vacíos
product.quantity = product.quantity || 0; // Asigna 0 si quantity está vacío
product.base_price = product.base_price || 0; // Asigna 0 si base_price está vacío
product.tax = product.tax || 0; // Asigna 0 si tax está vacío

// Eliminar el campo id si está vacío
if (!product.id) {
delete product.id;
}

// Depuración y logging
console.log('Product data:', product);

this.productService.addProduct(product).subscribe(() => {
this.loadProducts(); // Recargar la lista de productos
this.dialog.closeAll(); // Cerrar el diálogo
});
}
}

deleteProduct(productId: number): void {
this.productService.deleteProduct(productId).subscribe(() => {
this.loadProducts();
});
}

updateProduct(product: any): void {
this.productForm.patchValue(product);
this.openProductDialog();
}

viewProduct(id: number): void {
 this.productService.getProduct(id).subscribe ((product:any)=> {
    // Mostrar detalles del producto en un modal
    });
    }
}