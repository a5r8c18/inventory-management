import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { OverlayModule } from '@angular/cdk/overlay';
import { OrderService } from '../order.service';
import { InventoryService } from '../inventory.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MenusComponent } from '../menus/menus.component';
import { MatCard } from '@angular/material/card';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
selector: 'app-order',
standalone: true,
imports: [
CommonModule,
FormsModule,
MatButtonModule,
MatDialogModule,
MatFormFieldModule,
MatInputModule,
MatSelectModule,
MatIconModule,
OverlayModule,
NgxDatatableModule,
MenusComponent,
MatCard,
],
templateUrl: './order.component.html',
styleUrls: ['./order.component.scss'],
animations: [
	trigger('transitionMessages', [
	state('void', style({ opacity: 0 })),
	transition(':enter, :leave', [
	animate(300)
	])
	])
	]
})
export class OrderComponent implements OnInit {
orders: any[] = [];
products: any[] = [];
customers: any[] = [];
dialogRef!: MatDialogRef<OrderComponent>;

@ViewChild('orderDialog') orderDialog!: TemplateRef<any>;

constructor(
private orderService: OrderService,
private inventoryService: InventoryService,
private dialog: MatDialog
) {}

ngOnInit(): void {
this.loadOrders();
this.loadProducts();
this.loadCustomers();
}

loadOrders(): void {
	this.orderService.getOrders().subscribe((orders: any) => {
		this.orders = orders;
	});
}

loadProducts(): void {
this.inventoryService.getProductList().subscribe((products: any) => {
this.products = products;
});
}

loadCustomers(): void {
this.inventoryService.getCustomerList().subscribe((customers: any) => {
this.customers = customers;
});
}

addOrder(order: any): void {
	this.orderService.addOrder(order).subscribe(() => {
		this.loadOrders();
	});
}

updateOrder(order: any): void {
	this.orderService.updateOrder(order.id, order).subscribe(() => {
		this.loadOrders();
	});
}

deleteOrder(orderId: number): void {
	this.orderService.deleteOrder(orderId).subscribe(() => {
		this.loadOrders();
	});
}

openOrderDialog(): void {
this.dialog.open(this.orderDialog);
}

viewOrder(id: number): void {
this.orderService.getOrderById(id).subscribe((order: any) => {
// Mostrar detalles del pedido en un modal
});
}
}