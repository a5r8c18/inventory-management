import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BrandService } from '../brand.service';
import { BrandModalComponent } from '../brand-modal/brand-modal.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu'; // Importa MatMenuModule
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MenusComponent } from '../menus/menus.component';
import { FormGroup } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
selector: 'app-brand',
templateUrl: './brand.component.html',
styleUrls: ['./brand.component.scss'],

standalone: true,
imports: [
CommonModule,
MatButtonModule,
MatCardModule,
MatDialogModule,
MatIconModule,
MatMenuModule, // Añade MatMenuModule a los imports
NgxDatatableModule,
MenusComponent,
],
animations: [
	trigger('transitionMessages', [
	state('void', style({ opacity: 0 })),
	transition(':enter, :leave', [
	animate(300)
	])
	])
	]
})
export class BrandComponent {
brands = []; // Replace with actual data source
columns = [
{ prop: 'id', name: 'ID' },
{ prop: 'bname', name: 'Nombre' },
{ prop: 'categoryid', name: 'ID de Categoría' },
{ prop: 'status', name: 'Estado' },
{ prop: 'action', name: 'Acciones' }
];
rows: any[] = [];
BrandForm!: FormGroup;

constructor(private dialog: MatDialog, private brandService: BrandService) {}

ngOnInit(): void {
this.loadBrands();
}

loadBrands(): void {
	this.brandService.getBrandList().subscribe((brands: any) => {
	this.brands = brands;
	console.log('Brands:', this.brands); // Añade este log para verificar los datos
	});
	}

openAddBrandModal(): void {
const dialogRef = this.dialog.open(BrandModalComponent, {
width: '400px',
data: { action: 'add' }
});

dialogRef.afterClosed().subscribe(result => {
if (result) {
this.loadBrands();
}
});
}

openEditBrandModal(brand: any): void {
const dialogRef = this.dialog.open(BrandModalComponent, {
width: '400px',
data: { action: 'edit', brand }
});

dialogRef.afterClosed().subscribe(result => {
if (result) {
this.loadBrands();
}
});
}

deleteBrand(id: string): void {
if (confirm('Are you sure you want to delete this brand?')) {
this.brandService.deleteBrand(Number(id)).subscribe(() => {
this.loadBrands();
});
}
}

updateBrand(brand: any): void {
this.brandService.updateBrand(brand).subscribe(() => {
this.loadBrands();
});
}
}