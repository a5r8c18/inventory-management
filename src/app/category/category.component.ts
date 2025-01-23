import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../category.service';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { OverlayModule } from '@angular/cdk/overlay';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatCardModule } from '@angular/material/card';
import { MenusComponent } from '../menus/menus.component';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
selector: 'app-category',
standalone: true,
imports: [
CommonModule,
NgxDatatableModule,
MatButtonModule,
MatDialogModule,
MatFormFieldModule,
MatInputModule,
MatSelectModule,
MatIconModule,
FormsModule,
OverlayModule,
MatCardModule,
MenusComponent,
],
templateUrl: './category.component.html',
styleUrls: ['./category.component.scss'],
animations: [
trigger('transitionMessages', [
state('void', style({ opacity: 0 })),
transition(':enter, :leave', [
animate(300)
])
])
]
})
export class CategoryComponent implements OnInit {
categories: any[] = [];

rows: any[] = [];

@ViewChild('categoryDialog') categoryDialog!: TemplateRef<any>;
@ViewChild('actionTemplate') actionTemplate!: TemplateRef<any>;
constructor(private categoryService: CategoryService, private dialog: MatDialog) {}

columns: any[] = [
	{ prop: 'id', name: 'ID' },
	{ prop: 'name', name: 'Nombre' },
	{ prop: 'status', name: 'Estado' },
	{ name: 'Acciones', cellTemplate: this.actionTemplate }
	];

ngOnInit(): void {
this.loadCategories();
}

loadCategories(): void {
this.categoryService.getCategoryList().subscribe((categories: any) => {
this.categories = categories;
this.rows = categories; // Actualizar filas con los datos de categories
console.log('Categories:', this.categories); // Añade este log para verificar los datos
});
}

addCategory(category: any): void {
	if (!category.name) {
	console.error('El campo "name" es requerido');
	return;
	}
	// Proporcionar un valor predeterminado para status si no se proporciona
	if (!category.status) {
	category.status = 'active';
	}
	this.categoryService.addCategory(category).subscribe((newCategory: any) => {
	this.categories.push(newCategory);
	this.rows = [...this.categories]; // Actualizar filas con los datos de categories
	this.dialog.closeAll(); // Cerrar el diálogo después de agregar la categoría
	});
	}

updateCategory(category: any): void {
this.categoryService.updateCategory(category).subscribe(() => {
this.loadCategories(); // Recargar la lista de categorías
});
}

deleteCategory(categoryId: number): void {
this.categoryService.deleteCategory(categoryId).subscribe(() => {
this.loadCategories(); // Recargar la lista de categorías
});
}

openCategoryDialog(): void {
this.dialog.open(this.categoryDialog);
}

viewCategory(id:number): void {
this.categoryService.getCategoryById(id).subscribe((category:any)=> {
	// Mostrar detalles de la categoria en un modal
	})
}
}