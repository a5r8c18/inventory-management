import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BrandService } from '../brand.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { InventoryService } from '../inventory.service';
import { MatSelectModule } from '@angular/material/select';

@Component({
selector: 'app-brand-modal',
templateUrl: './brand-modal.component.html',
styleUrls: ['./brand-modal.component.scss'],
standalone: true,
imports: [
CommonModule,
MatFormFieldModule,
MatDialogModule,
ReactiveFormsModule,
MatInputModule,
MatButtonModule,
MatSelectModule
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
export class BrandModalComponent implements OnInit {
brandForm: FormGroup;
action: string = 'add'; // Inicializar la propiedad
categories: any[] = [];

constructor(
private fb: FormBuilder,
private brandService: BrandService,
private inventoryService: InventoryService,
public dialogRef: MatDialogRef<BrandModalComponent>,
@Inject(MAT_DIALOG_DATA) public data: any
) {
this.action = data.action; // Asignar el valor en el constructor
this.brandForm = this.fb.group({
id: [data.brand ? data.brand.id : '', Validators.required],
bname: [data.brand ? data.brand.name : '', Validators.required],
categoryid: [data.brand ? data.brand.categoryid : '', Validators.required],
status: [data.brand ? data.brand.status : '', Validators.required]
});
}

ngOnInit(): void {
this.loadCategories();
}

loadCategories(): void {
this.inventoryService.getCategoryList().subscribe((categories: any) => {
this.categories = categories;
});
}

onSubmit(): void {
if (this.brandForm.valid) {
if (this.action === 'add') {
this.brandService.addBrand(this.brandForm.value).subscribe(() => {
this.dialogRef.close(true);
});
} else if (this.action === 'edit') {
this.brandService.updateBrand(this.brandForm.value).subscribe(() => {
this.dialogRef.close(true);
});
}
}
}
}