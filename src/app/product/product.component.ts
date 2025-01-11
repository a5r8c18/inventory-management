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
import { MatCard } from '@angular/material/card';

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
MatCard,
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
console.log(this.brands); // Verifica que los datos se están cargando correctamente
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
category: ['', Validators.required],
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
if (product.id) {
this.productService.updateProduct(product.id, product).subscribe(() => {
this.loadProducts();
});
} else {
this.productService.addProduct(product).subscribe(() => {
this.loadProducts();
});
}
this.dialog.closeAll();
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
}