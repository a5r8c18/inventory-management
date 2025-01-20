import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MenusComponent } from '../menus/menus.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { BrandService } from '../brand.service';
import { BrandModalComponent } from '../brand-modal/brand-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

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
MatMenuModule,
NgxDatatableModule,
MenusComponent,
ReactiveFormsModule,
MatFormFieldModule,
MatInputModule,
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
export class BrandComponent implements OnInit {

brands: any[] = [];
columns: any[] = [];
rows: any[] = [];
brandForm!: FormGroup;

@ViewChild('actionTemplate') actionTemplate!: TemplateRef<any>;

constructor(public dialog: MatDialog, private brandService: BrandService, private fb: FormBuilder) {}

ngOnInit(): void {
this.loadBrands();
this.initForm();
this.initColumns();
}

loadBrands(): void {
this.brandService.getBrandList().subscribe((brands: any) => {
this.brands = brands;
console.log('Brands:', this.brands);
});
}

initForm(): void {
this.brandForm = this.fb.group({
id: [''],
bname: ['', Validators.required],
categoryid: ['', Validators.required],
status: ['', Validators.required]
});
}

initColumns(): void {
this.columns = [
{ prop: 'id', name: 'ID' },
{ prop: 'bname', name: 'Nombre' },
{ prop: 'categoryid', name: 'ID de Categoría' },
{ prop: 'status', name: 'Estado' },
{ name: 'Acciones', cellTemplate: this.actionTemplate }
];
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

saveBrand(): void {
if (this.brandForm.valid) {
const brandData = this.brandForm.value;
this.brandService.saveBrand(brandData).subscribe(() => {
this.loadBrands();
this.dialog.closeAll();
});
}
}
}